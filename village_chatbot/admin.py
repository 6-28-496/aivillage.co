from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from .models import Company, Conversation, Persona, Profile


class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False

class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline,)

class PersonaAdmin(admin.ModelAdmin):
    list_display = ('name', 'company')

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)

admin.site.register(Company)
admin.site.register(Conversation)
admin.site.register(Persona, PersonaAdmin)
