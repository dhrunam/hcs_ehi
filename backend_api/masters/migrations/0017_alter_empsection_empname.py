# Generated by Django 4.2 on 2023-05-17 05:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('masters', '0016_medicaltest_is_deleted'),
    ]

    operations = [
        migrations.AlterField(
            model_name='empsection',
            name='empname',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='emp_session', to='masters.employee'),
        ),
    ]
