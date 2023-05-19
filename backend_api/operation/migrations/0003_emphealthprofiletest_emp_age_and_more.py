# Generated by Django 4.2 on 2023-05-18 11:49

import common.utility.file_path_manager
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('operation', '0002_emphealthtestdetails_medical_test_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='emphealthprofiletest',
            name='emp_age',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='emphealthprofiletest',
            name='emp_remarks',
            field=models.CharField(default=django.utils.timezone.now, max_length=512),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='EmpHealthTestReports',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('report_name', models.CharField(max_length=256, null=True)),
                ('report_url', models.FileField(blank=True, null=True, upload_to=common.utility.file_path_manager.FilePathManager.get_file_path_to_upload_health_test_report)),
                ('emp_health_profile_test', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='emp_health_test_report', to='operation.emphealthprofiletest')),
            ],
        ),
    ]