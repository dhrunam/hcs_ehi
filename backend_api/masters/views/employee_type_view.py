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


class EmployeeTypeList(generics.ListCreateAPIView):
    queryset = master_models.EmployeeType.objects.all().order_by('-id')
    serializer_class =  master_serializers.EmployeeTypeSerializer
   
class EmployeeTypeDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = master_models.EmployeeType
    serializer_class =  master_serializers.EmployeeTypeSerializer

class EmployeeTypeListWithoutPagination(generics.ListAPIView):
    queryset = master_models.EmployeeType.objects.all().order_by('-id')
    serializer_class =  master_serializers.EmployeeTypeSerializer
    pagination_class = None