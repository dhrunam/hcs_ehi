# Generated by Django 4.2 on 2023-05-08 12:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('masters', '0009_merge_20230504_0630'),
    ]

    operations = [
        migrations.AddField(
            model_name='medicaltest',
            name='is_deleted',
            field=models.BooleanField(default=False),
        ),
    ]
