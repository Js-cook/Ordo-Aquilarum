# Generated by Django 3.2.13 on 2022-06-28 21:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_auto_20220628_1911'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userextension',
            name='comp_insurance',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='userextension',
            name='comp_multiplier',
            field=models.IntegerField(default=1),
        ),
    ]
