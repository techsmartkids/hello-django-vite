"""
Subclass the existing 'runserver' command so that the Vite server is
also started at the same time.

There is some unpleasant hackery here because we don't know which command class
to subclass until runtime as it depends on which INSTALLED_APPS we have, so we
have to determine this dynamically. This strategy is lifted directly from:
whitenoise/runserver_nostatic/management/commands/runserver.py
"""
from contextlib import ExitStack
from django.apps import apps
from django.conf import settings
from importlib import import_module
import os
import subprocess
import sys


def _get_next_runserver_command():
    """
    Return the next highest priority "runserver" command class
    """
    for app_name in _get_lower_priority_apps():
        module_path = '%s.management.commands.runserver' % app_name
        try:
            return import_module(module_path).Command
        except (ImportError, AttributeError):
            pass


def _get_lower_priority_apps():
    """
    Yield all app module names below the current app in the INSTALLED_APPS list
    """
    self_app_name = '.'.join(__name__.split('.')[:-3])
    reached_self = False
    for app_config in apps.get_app_configs():
        if app_config.name == self_app_name:
            reached_self = True
        elif reached_self:
            yield app_config.name
    yield 'django.core'


RunserverCommand = _get_next_runserver_command()


class Command(RunserverCommand):  # type: ignore  # too advanced for mypy
    def handle(self, *args, **options) -> None:
        is_inner_runserver_call = (
            # Case 1: Reloader disabled. This is the unique call.
            not options['use_reloader'] or
            # Case 2: Reloader enabled. Look for flag of inner call.
            os.environ.get('RUN_MAIN') == 'true'
        )
        
        with ExitStack() as cleanups:
            if is_inner_runserver_call:
                _run_vite_process(cleanups)
            
            super().handle(*args, **options)


def _run_vite_process(cleanups: ExitStack):
    if settings.DJANGO_VITE_DEV_MODE:
        # Run Vite dev server
        serve_assets_process = subprocess.Popen(
            [settings.BASE_DIR / 'node_modules' / '.bin' / 'vite'],
            cwd=settings.BASE_DIR)
    else:
        # Build production assets using Vite
        subprocess.run(
            [settings.BASE_DIR / 'node_modules' / '.bin' / 'vite', 'build'],
            cwd=settings.BASE_DIR,
            check=True)
        
        # Collect Vite-built assets and other Django assets to static directory
        subprocess.run(
            [sys.executable, 'manage.py', 'collectstatic', '--no-input'],
            cwd=settings.BASE_DIR,
            check=True)
        
        # Serve production assets using a static file server
        serve_assets_process = subprocess.Popen(
            [settings.BASE_DIR / 'node_modules' / '.bin' / 'http-server', '-p', '3000', '--cors'],
            cwd=(settings.BASE_DIR / 'local'))
    
    @cleanups.callback
    def cleanup_vite_process():
        serve_assets_process.terminate()
        serve_assets_process.wait()
