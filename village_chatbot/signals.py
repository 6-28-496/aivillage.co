import logging
from django.contrib.auth.signals import user_logged_in, user_login_failed, user_logged_out
from django.dispatch import receiver

login_logger = logging.getLogger('login_logger')

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        # HTTP_X_FORWARDED_FOR can contain a list of IPs if there are multiple proxies
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR', 'Unknown IP')
    return ip

@receiver(user_logged_in)
def log_user_logged_in(sender, request, user, **kwargs):
    ip_address = get_client_ip(request)
    login_logger.info(f"Login successful: User={user.username} IP={ip_address}")

@receiver(user_login_failed)
def log_user_login_failed(sender, credentials, request, **kwargs):
    ip_address = get_client_ip(request) if request else 'Unknown IP'
    username = credentials.get('username', 'Unknown user')
    login_logger.warning(f"Login failed: Username={username} IP={ip_address}")

@receiver(user_logged_out)
def log_user_logged_out(sender, request, user, **kwargs):
    ip_address = get_client_ip(request)
    login_logger.info(f"User logged out: User={user.username} IP={ip_address}")
