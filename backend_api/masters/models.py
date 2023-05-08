from django.db import models

# Create your models here.

class District(models.Model):
    name=models.CharField(max_length=128, null=False)

    def __str__(self) -> str:
        return str(self.id)

class Organisation(models.Model):
    district=models.ForeignKey(District,null=True, on_delete=models.SET_NULL, related_name='organisation_district')
    name=models.CharField(max_length=128, null=False)
    address= models.CharField(max_length=1028)
    hierarchy=models.IntegerField()

    def __str__(self) -> str:
            return str(self.name)

class EmployeeGroup(models.Model):
    name=models.CharField(max_length=128, null=False)
    
    def __str__(self) -> str:
        return str(self.id)
    
class EmployeeType(models.Model):
    type=models.CharField(max_length=128, null=False)
    
    def __str__(self) -> str:
        return str(self.id)

class Designation(models.Model):
    emp_group = models.ForeignKey(EmployeeGroup, null=True, on_delete=models.SET_NULL)
    name=models.CharField(max_length=128, null=False)
    hierarchy=models.IntegerField()

    def __str__(self) -> str:
        return str(self.id)

class BloodGroup(models.Model):
    name=models.CharField(max_length=128, null=False)
    
    def __str__(self) -> str:
        return str(self.id)
    
class Employee(models.Model):
    emp_id = models.CharField(max_length=20, null=False)
    designation = models.ForeignKey(Designation, null=True, on_delete= models.SET_NULL, related_name='employee')
    organisation = models.ForeignKey(Organisation, null=True, on_delete=models.SET_NULL, related_name='employee')
    name =  models.CharField(max_length=128, null=False)
    blood_group = models.CharField(max_length=4, null=False)
    residenntial_address = models.CharField(max_length=1028, null= True, default='')
    date_of_birth = models.DateField(auto_created=False, auto_now= False)
    date_of_joining = models.DateField(auto_created=False, auto_now=False)
    date_of_superannuation = models.DateField(auto_created=False, auto_now= False)
    type = models.CharField(max_length=20, null= True, default='')

class Section(models.Model):
    name = models.CharField(max_length=50, null=False)
    organisation=models.ForeignKey(Organisation,null=True, on_delete=models.SET_NULL, related_name='section_organisation')

    def __str__(self) -> str:
        return str(self.name)



class MedicalTestProfile(models.Model):
    name = models.CharField(max_length=128, null=False, blank=False)


class MedicalTest(models.Model):
    profile=models.ForeignKey(MedicalTestProfile, null=True, on_delete=models.SET_NULL, related_name='medical_test')
    name = models.CharField(max_length=256)
    normal_min_value=models.DecimalField(max_digits=10, decimal_places=2, default=0)
    normal_max_value=models.DecimalField(max_digits=10, decimal_places=2, default=0)
    unit = models.CharField(max_length=10, blank=True, default='')
    is_deleted=models.BooleanField(default=False);




