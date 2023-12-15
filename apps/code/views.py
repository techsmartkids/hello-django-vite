from django.http import HttpResponse, HttpRequest
from django.shortcuts import render


def code(request: HttpRequest) -> HttpResponse:
    return render(request, 'code/code.html')
