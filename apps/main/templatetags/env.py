from django import template
from django.conf import settings
from django.template.defaultfilters import stringfilter
import os
from typing import Optional

register = template.Library()


@register.filter
@stringfilter
def env(var_name: str) -> Optional[str]:
    """
    Returns the value of the named environment variable.
    
    Returns None if the specified environment variable does not exist.
    
    Example usage:
        {% if 'DJANGO_VAR'|env == '3-compat' %} ... {% endif %}
    """
    return os.environ.get(var_name)
