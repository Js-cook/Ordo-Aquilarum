# Generated by Django 3.2.13 on 2022-06-17 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_userextension_points_insurance'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userextension',
            name='role',
            field=models.CharField(default='None', max_length=100),
        ),
    ]
