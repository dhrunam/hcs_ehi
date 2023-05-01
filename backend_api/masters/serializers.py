from rest_framework import serializers
# from account import models as acc_models
from masters import models as masters_models
# from axes.admin import AccessLog
from django.contrib.auth.models import User,Group


class DistrictSerializer(serializers.ModelSerializer):


    class Meta:
        model = masters_models.District
        fields =( 'id','name')