# Generated by Django 4.2 on 2023-05-22 13:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BloodGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='Designation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('hierarchy', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='District',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('emp_id', models.CharField(max_length=20)),
                ('name', models.CharField(max_length=128)),
                ('blood_group', models.CharField(max_length=4)),
                ('residenntial_address', models.CharField(default='', max_length=1028, null=True)),
                ('date_of_birth', models.DateField()),
                ('date_of_joining', models.DateField()),
                ('date_of_superannuation', models.DateField()),
                ('type', models.CharField(default='', max_length=20, null=True)),
                ('designation', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='employee', to='masters.designation')),
            ],
        ),
        migrations.CreateModel(
            name='EmployeeGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='EmployeeType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='MedicalTestProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('is_deleted', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Organisation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('address', models.CharField(max_length=1028)),
                ('hierarchy', models.IntegerField()),
                ('district', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='organisation_district', to='masters.district')),
            ],
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('organisation', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='section_organisation', to='masters.organisation')),
            ],
        ),
        migrations.CreateModel(
            name='MedicalTest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256)),
                ('normal_min_value', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('normal_max_value', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('unit', models.CharField(blank=True, default='', max_length=10)),
                ('is_deleted', models.BooleanField(default=False)),
                ('profile', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='medical_test', to='masters.medicaltestprofile')),
            ],
        ),
        migrations.CreateModel(
            name='EmpSection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('empname', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='emp_session', to='masters.employee')),
            ],
        ),
        migrations.AddField(
            model_name='employee',
            name='organisation',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='employee', to='masters.organisation'),
        ),
        migrations.AddField(
            model_name='designation',
            name='emp_group',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='masters.employeegroup'),
        ),
    ]