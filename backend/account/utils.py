import random
from django.core.mail import send_mail
from django.conf import settings
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template


def generate_otp():
    return str(random.randint(100000, 999999))


def send_otp_email(email, name, otp):
    subject = 'Verify Your Email'
    html_message = render_to_string('verification_email.html', {
                                    'name': name, 'otp': otp})
    from_email = settings.EMAIL_HOST_USER
    to_email = [email]

    email = EmailMessage(subject, strip_tags(
        html_message), from_email, to_email)
    email.content_subtype = "html"
    email.send()


def send_password_reset_email(email, token):
    html_template = get_template('password_reset_email.html')
    html_content = html_template.render({
        'token': token,
        'protocol': settings.PROTOCOL,
        'domain': settings.DOMAIN
    })
    subject = 'Reset your password',

    from_email = settings.EMAIL_HOST_USER
    to_email = [email]
    email = EmailMultiAlternatives(subject, html_content, from_email, to_email)
    email.attach_alternative(html_content, "text/html")
    email.send()
