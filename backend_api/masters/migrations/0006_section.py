# Generated by Django 4.2 on 2023-05-03 07:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('masters', '0005_remove_employee_emp_group'),
    ]

    operations = [
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
    ]