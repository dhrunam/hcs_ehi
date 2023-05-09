from django.db import models
from  masters import models as master_models

# Create your models here.

class MedicalTestConfiguration(models.Model):
    medical_test=models.ForeignKey(master_models.MedicalTest, null=False, on_delete=models.CASCADE, related_name='medical_test_conf')
    year= models.IntegerField(max_length=4)
    session=models.CharField(max_length=128,null=False)
    
