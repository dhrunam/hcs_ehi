from rest_framework import generics
from operation import models as op_models, serializers as op_serializers
from django.db import transaction, connection


class EmpHealthProfileTestList(generics.ListCreateAPIView):

    queryset = op_models.EmpHealthProfileTest.objects.all().order_by('-id')
    serializer_class = op_serializers.EmpHealthProfileTestSerializer

    # @transaction.atomic
    # def perform_create(self, serializer):
    #     self.request.data['created_by']= self.request.user.id
    #     instance=serializer.save()
    #     return instance
    def get_queryset(self):
        queryset = super().get_queryset()
        employee = self.request.guery_params.get('employee')
        session =  self.request.guery_params.get('session')
        if employee : 
            queryset = queryset.filter(employee=employee)
        
        if session : 
            queryset = queryset.filter(medical_test_session=session)
            
        return queryset
    

class EmpHealthProfileTestDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = op_models.EmpHealthProfileTest
    serializer_class = op_serializers.EmpHealthProfileTestSerializer

    def perform_update(self, serializer):
        self.request.data._mutable = True
        self.request.data['created_by']= self.request.user.id
        self.request.data._mutable = False
        return super().perform_update(serializer)
    
    def patch(self, request, *args, **kwargs):
        
        return self.partial_update(request, *args, **kwargs)    
    