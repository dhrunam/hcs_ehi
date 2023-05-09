from django.db import models
from  masters import models as master_models

# Create your models here.

class MedicalTestSession(models.Model):
    year= models.IntegerField()
    session=models.CharField(max_length=128,null=False)
    
class MedicalTestProfilePerSession(models.Model):
    medical_test_session=models.ForeignKey(MedicalTestSession,on_delete=models.CASCADE, null=False, related_name='medical_test_profile_per_session')
    medical_test_profile=models.ForeignKey(master_models.MedicalTestProfile, 
                                      null=False, on_delete=models.CASCADE, 
                                      related_name='medical_test_profile_per_session')

    
 