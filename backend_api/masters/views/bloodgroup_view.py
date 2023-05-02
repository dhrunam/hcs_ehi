from rest_framework import generics, pagination
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction, connection
from masters import serializers as master_serializers
from durin.auth import TokenAuthentication
from masters import models as master_models
from django.contrib.auth.models import User
import datetime

from account import models as acc_models


class BloodGroupList(generics.ListCreateAPIView):
    queryset = master_models.BloodGroup.objects.all().order_by('-id')
    serializer_class =  master_serializers.BloodGroupSerializer
   


class BloodGroupDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = master_models.BloodGroup
    serializer_class =  master_serializers.BloodGroupSerializer
