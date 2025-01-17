from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.postgres.fields import ArrayField


class Company(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    # Each company has its own ChatGPT API key
    api_key = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.user.username


class Persona(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    user_generated_persona_prompt = models.TextField(null=True, blank=True)
    location = models.CharField(max_length=255, default="Oslo, Norway")
    age = models.IntegerField(default=35)
    role = models.CharField(max_length=255, default="")
    gender = models.CharField(max_length=255, default="Female")
    interests = ArrayField(models.CharField(max_length=255), size=8)

    def __str__(self):
        return self.name


class Conversation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE)
    question = models.TextField()
    response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    multi_chat_id = models.CharField(
        max_length=36, null=True, blank=True)  # Track multi-chat sessions

    def __str__(self):
        return f"{self.user.username} with {self.persona.name}"


# Signal to automatically create a Profile whenever a User is created
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

# Signal to save the Profile whenever the User is saved


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


# Signal to automatically create the five standard personas
@receiver(post_save, sender=Company)
def create_standard_personas(sender, instance, created, **kwargs):
    # inline import to avoid circular arguments:
    from .utils import create_standard_personas

    create_standard_personas(company=instance)
