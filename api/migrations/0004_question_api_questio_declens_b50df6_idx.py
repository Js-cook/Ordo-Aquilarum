# Generated by Django 3.2.13 on 2022-06-15 19:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_session'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='question',
            index=models.Index(fields=['declension'], name='api_questio_declens_b50df6_idx'),
        ),
    ]
