# Generated by Django 5.1.2 on 2024-11-04 10:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "village_chatbot",
            "0004_persona_age_persona_gender_persona_interests_and_more",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="persona",
            name="gender",
            field=models.CharField(default="Female", max_length=255),
        ),
    ]
