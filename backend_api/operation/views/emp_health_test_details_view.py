from rest_framework import generics
from operation import models as op_models, serializers as op_serializers
from django.db import transaction, connection


class EmpHealthTestDetailsList(generics.ListCreateAPIView):
    queryset = op_models.EmpHealthTestDetails.objects.all().order_by('-id')
    serializer_class = op_serializers.EmpHealthTestDetailsSerializer

    def get_queryset(self):
        queryset = op_models.EmpHealthTestDetails.objects.all().order_by('-id')
        emp_health_profile_test_id=self.request.query_params.get('test_id')
        if(emp_health_profile_test_id):
            queryset.filter(emp_health_profile_test=emp_health_profile_test_id)
        
        return queryset

    
class EmpHealthTestDetailDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = op_models.EmpHealthTestDetails
    serializer_class = op_serializers.EmpHealthTestDetailsSerializer


    
