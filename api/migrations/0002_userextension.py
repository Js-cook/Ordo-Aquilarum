# Generated by Django 3.2.13 on 2022-06-01 20:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserExtension',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100)),
                ('is_teacher', models.BooleanField(default=False)),
                ('correct', models.IntegerField(default=0)),
                ('incorrect', models.IntegerField(default=0)),
                ('points', models.IntegerField(default=0)),
                ('role', models.CharField(max_length=100)),
            ],
        ),
    ]
