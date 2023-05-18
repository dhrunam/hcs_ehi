from rest_framework import generics
from operation import models as op_models, serializers as op_serializers
from django.db import transaction, connection
import json


class EmpHealthTestDetailsList(generics.ListCreateAPIView):
    queryset = op_models.EmpHealthTestDetails.objects.all().order_by('-id')
    serializer_class = op_serializers.EmpHealthTestDetailsSerializer

    def get_queryset(self):
        queryset = op_models.EmpHealthTestDetails.objects.all().order_by('-id')
        emp_health_profile_test_id=self.request.query_params.get('test_id')
        if(emp_health_profile_test_id):
            queryset.filter(emp_health_profile_test=emp_health_profile_test_id)
        
        return queryset
    
    @transaction.atomic()
    def perform_create(self, serializer):
        
        health_record_id = self.request.data['health_record_id']

        data= json.loads(self.request.data['data'])
        print('Request Data: ',data)
        if(data and health_record_id):
            for item in data:
                test_details=item.test_details
                profile_id = item.profile_id

                if test_details:
                    
                    for test in test_details:
                        
                        self.request.data['emp_health_profile_test']=health_record_id
                        self.request.data['medical_test']=test.id
                        self.request.data['medical_test_profile']=profile_id
                        self.request.data['medical_test_result']=test.value
                        self.request.data['normal_min_value']=test.normal_min_value
                        self.request.data['normal_max_value']=test.normal_max_value
                        self.request.data['unit']=test.unit

                        serializer.save()

        queryset = op_models.EmpHealthTestDetails.objects.filter(emp_health_profile_test=profile_id).order_by('id')

        return queryset
        

    #     emp_health_profile_test=models.ForeignKey(EmpHealthProfileTest,null=False, on_delete=models.CASCADE, related_name='emp_health_test_details')
    # medical_test=models.ForeignKey(master_models.MedicalTest, null=False, on_delete=models.CASCADE, related_name='emp_health_test_details')
    # medical_test_result=models.CharField(max_length=256, null=True, default='')
    # normal_min_value=models.DecimalField(max_digits=10, decimal_places=2, default=0)
    # normal_max_value=models.DecimalField(max_digits=10, decimal_places=2, default=0)
    # unit = models.CharField(max_length=10, blank=True, default='')

class EmpHealthTestDetailDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = op_models.EmpHealthTestDetails
    serializer_class = op_serializers.EmpHealthTestDetailsSerializer


    
