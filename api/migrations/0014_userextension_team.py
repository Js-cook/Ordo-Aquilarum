# Generated by Django 3.2.13 on 2022-07-02 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_alter_competition_time_start'),
    ]

    operations = [
        migrations.AddField(
            model_name='userextension',
            name='team',
            field=models.CharField(default='None', max_length=8),
        ),
    ]
