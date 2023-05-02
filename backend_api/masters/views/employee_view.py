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


class EmployeeList(generics.ListCreateAPIView):
    queryset = master_models.Employee.objects.all().order_by('-id')
    serializer_class =  master_serializers.EmployeeSerializer
   


class EmployeeDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = master_models.Employee
    serializer_class =  master_serializers.EmployeeSerializer

