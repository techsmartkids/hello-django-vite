from django.http import HttpResponse, HttpRequest
from django.shortcuts import render
import traceback


def code(request: HttpRequest) -> HttpResponse:
    try:
        return render(request, 'code/code.html')
    except:
        # Print any exceptions raised by django-vite when rendering the template
        traceback.print_exc()
        raise
