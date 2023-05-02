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