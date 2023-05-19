from rest_framework import generics, response, status
from operation import models as op_models, serializers as op_serializers
from django.db import transaction, connection
import json


class EmpHealthTestReportsList(generics.ListCreateAPIView):
    queryset= op_models.EmpHealthTestReports.objects.all().order_by('-id')
    serializer_class = op_serializers.EmpHealthTestReportsSerializer

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        request.data._mutable = True
        
        if 'report_url' in request.FILES:
                file_name_parts = request.data['report_url'].name.split(
                    '.')
                if len(file_name_parts) > 1:
                    request.data['report_url'].name = request.data.get(
                        'report_name') + '.'+file_name_parts[len(file_name_parts)-1]


        
        print(request.data)
        response = self.create(request, *args, **kwargs)
        request.data._mutable = False
        return response
    
    def get_queryset(self):
         
        queryset= op_models.EmpHealthTestReports.objects.all().order_by('-id')
        emp_health_profile_test= self.request.query_params.get('emp_health_profile_test')

        if(emp_health_profile_test):
             queryset=queryset.filter(emp_health_profile_test=emp_health_profile_test)

        return queryset
    