from django.db import models
from django.contrib.auth.models import User, Group
from masters import models as master_models
from configuration import models as conf_models
from common.utility import FilePathManager

import datetime



# Create your models here.

class EmpHealthProfileTest(models.Model):
    
    employee=models.ForeignKey(master_models.Employee, null=True, on_delete=models.SET_NULL, related_name='emp_health_profile_test')
    emp_age= models.IntegerField(default=0)
    emp_remarks = models.CharField(max_length=512, null= True, default='')
    medical_test_session = models.ForeignKey(conf_models.MedicalTestSession, null=True, on_delete=models.SET_NULL, related_name='emp_health_profile_test')
    sample_type=models.CharField(max_length=512, null=True, default='')
    collection_date=models.DateField(auto_created=False, auto_now=False)
    reg_date=models.DateField(auto_created=False, auto_now=False)
    ref_doctor=models.CharField(max_length=128, null=True, default='')
    analyst=models.CharField(max_length=128, null=True, default='')
    location=models.CharField(max_length=128, null=True, default='')
    is_entry_completed=models.BooleanField(default=False)
    created_by= models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    created_at= models.DateTimeField(auto_created=True, auto_now=True)
    
    class Meta:
         unique_together = ('employee','medical_test_session')
    
# def get_report_upload_path(instance, filename):
#     # Generate the dynamic path based on the instance and filename
#     # For example, you can use the instance's ID and the original filename
#     emp_health_profile_test=
#     medical_test_session = conf_models.MedicalTestSession.objects.filter()

#     return f'reports/{instance.id}/{filename}'

class  EmpHealthTestDetails(models.Model):
    emp_health_profile_test=models.ForeignKey(EmpHealthProfileTest,null=False, on_delete=models.CASCADE, related_name='emp_health_test_details')
    medical_test_profile= models.ForeignKey(master_models.MedicalTestProfile, null=True, on_delete=models.SET_NULL, related_name='emp_health_test_details')
    medical_test=models.ForeignKey(master_models.MedicalTest, null=False, on_delete=models.CASCADE, related_name='emp_health_test_details')
    medical_test_result=models.CharField(max_length=256, null=True, default='')
    normal_min_value=models.DecimalField(max_digits=10, decimal_places=2, default=0)
    normal_max_value=models.DecimalField(max_digits=10, decimal_places=2, default=0)
    unit = models.CharField(max_length=10, blank=True, default='')

    class Meta:
         unique_together = ("emp_health_profile_test","medical_test_profile", "medical_test")

class EmpHealthTestReports(models.Model):
        emp_health_profile_test=models.ForeignKey(EmpHealthProfileTest,null=False, on_delete=models.CASCADE, related_name='emp_health_test_report')
        report_name = models.CharField(max_length=256, null=True)
        report_url = models.FileField(upload_to= FilePathManager.get_file_path_to_upload_health_test_report, null=True, blank=True)
     
 

