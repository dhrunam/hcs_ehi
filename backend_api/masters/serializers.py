from rest_framework import serializers
# from account import models as acc_models
from masters import models as masters_models
# from axes.admin import AccessLog
from django.contrib.auth.models import User,Group


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

class DesignationSerializer(serializers.ModelSerializer):

    class Meta:
        model = masters_models.Designation
        fields = ('id','emp_group', 'name', 'hierarchy')

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
                     )

class SectionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = masters_models.Section
        fields = ('id', 'name', 'organisation')

    def to_representation(self, instance):
        rep = super(SectionSerializer, self).to_representation(instance)
        rep['organisation'] = instance.organisation.name
        return rep
      

