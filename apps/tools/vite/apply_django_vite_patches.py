"""
Applies TechSmart-specific patches to the django_vite package.
"""
import django_vite
import os.path
import shutil
import subprocess

DJANGO_VITE_DIRPATH = os.path.abspath(
    os.path.dirname(django_vite.__file__)
)  # type: str


target_filepath = os.path.join(
    DJANGO_VITE_DIRPATH, 'core', 'asset_loader.py')
assert os.path.exists(target_filepath)

target_backup_filepath = os.path.join(
    DJANGO_VITE_DIRPATH, 'core', 'asset_loader.py.ts.orig')
assert not target_backup_filepath.endswith('.py')  # don't advertise as a .py file

patch_filepath = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    'asset_loader.py.diff'
)  # type: str
assert os.path.exists(patch_filepath)


target_outdated = os.path.getmtime(target_filepath) < os.path.getmtime(patch_filepath)
with open(target_filepath, 'r') as f:
    target_has_patch_applied = 'BEGIN' in f.read()

if not target_has_patch_applied or target_outdated:
    # Backup target file, if not already done
    if not os.path.exists(target_backup_filepath):
        assert not target_has_patch_applied
        shutil.copyfile(target_filepath, target_backup_filepath)
    
    # 1. Patch the target file
    # 2. Update target file's mtime so that it will not be detected as outdated
    with open(target_filepath, 'r') as f:
        shutil.copyfile(target_backup_filepath, target_filepath)
        
        print(f'Patching: {os.path.relpath(target_filepath, start=os.path.join(DJANGO_VITE_DIRPATH, ".."))}')
        subprocess.run(
            ['patch', target_filepath, patch_filepath],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=True
        )
