# Generated by Django 5.1 on 2024-09-15 19:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('storage', '0009_alter_files_created_alter_files_last_download'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='role',
            field=models.CharField(default='USER', max_length=10),
        ),
    ]
