from rest_framework import serializers
# from account import models as acc_models
from masters import models as masters_models
# from axes.admin import AccessLog
from django.contrib.auth.models import User,Group

class HelperOrganisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = masters_models.Organisation
        fields =( 'id','name')

class HelperOrganisationSerializer(serializers.ModelSerializer):

    class Meta:
        model = masters_models.Organisation
        fields = ('id', 'name')

class DistrictSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = masters_models.District
        fields =( 'id','name')

class OrganisationSerializer(serializers.ModelSerializer):
   
    related_district = DistrictSerializer(source='district', read_only=True)

    class Meta:
        model = masters_models.Organisation
        fields =( 'id','district','name','address','hierarchy', 'related_district')

class EmployeeGroupSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = masters_models.EmployeeGroup
        fields =( 'id','name')

class EmployeeTypeSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = masters_models.EmployeeType
        fields =( 'id','type')

class DesignationSerializer(serializers.ModelSerializer):
    related_emp_group= EmployeeGroupSerializer(source='emp_group', read_only=True)
    class Meta:
        model = masters_models.Designation
        fields = ('id','emp_group', 'name', 'hierarchy','related_emp_group')

class BloodGroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = masters_models.BloodGroup
        fields = ('id', 'name')

class EmployeeSerializer(serializers.ModelSerializer):
    related_designation = DesignationSerializer(source='designation', read_only=True)
    related_organisation = OrganisationSerializer(source = 'organisation', read_only=True)
    class Meta:
        model = masters_models.Employee
        fields =  ('id',
                   'emp_id',
                    'designation',
                    'organisation',
                    'name',
                    'blood_group',
                    'residenntial_address',
                    'date_of_birth',
                    'date_of_joining',
                    'date_of_superannuation',
                    'related_designation',
                    'related_organisation',
                    'type',
                     )

class SectionSerializer(serializers.ModelSerializer):
    related_organisation = HelperOrganisationSerializer(source = 'organisation', read_only=True)
    
    class Meta:
        model = masters_models.Section
        fields = ('id', 'name', 'organisation', 'related_organisation')

    def to_representation(self, instance):
        rep = super(SectionSerializer, self).to_representation(instance)
        rep['organisation'] = instance.organisation.name
        return rep

class MedicalTestProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = masters_models.MedicalTestProfile
        fields = (
            'id',
            'name',
            'is_deleted',
        )


class MedicalTestSerializer(serializers.ModelSerializer):
    related_profile=MedicalTestProfileSerializer(source='profile', read_only=True)

    class Meta:
        model = masters_models.MedicalTest
        fields = (
            'id',
            'profile',
            'name',
            'normal_min_value',
            'normal_max_value',
            'unit',
            'related_profile'

        )




