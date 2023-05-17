from django.db import models
from django.contrib.auth.models import User, Group
from masters import models as master_models

# Create your models here.

class EmpHealthProfileTest(models.Model):
    employee=models.ForeignKey(master_models.Employee, null=True, on_delete=models.SET_NULL, related_name='emp_health_profile_test')
    sample_type=models.CharField(max_length=512, null=True, default='')
    collection_date=models.DateField(auto_created=False, auto_now=False)
    reg_date=models.DateField(auto_created=False, auto_now=False)
    ref_doctor=models.CharField(max_length=128, null=True, default='')
    analyst=models.CharField(max_length=128, null=True, default='')
    location=models.CharField(max_length=128, null=True, default='')
    is_entry_completed=models.BooleanField(default=False)
    created_by= models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    created_at= models.DateTimeField(auto_created=True, auto_now=True)


class EmpHealthTestDetails(models.Model):
    emp_health_profile_test=models.ForeignKey(EmpHealthProfileTest,null=False, on_delete=models.CASCADE, related_name='emp_health_test_details')
    medical_test=models.ForeignKey(master_models.MedicalTest, null=False, on_delete=models.CASCADE, related_name='emp_health_test_details')
    medical_test_result=models.CharField(max_length=256, null=True, default='')
    normal_min_value=models.DecimalField(max_digits=10, decimal_places=2, default=0)
    normal_max_value=models.DecimalField(max_digits=10, decimal_places=2, default=0)
    unit = models.CharField(max_length=10, blank=True, default='')
