from rest_framework import generics, response, status
from operation import models as op_models, serializers as op_serializers
from django.db import transaction, connection
from django.forms.models import model_to_dict
from django.contrib.auth.models import User


class EmpHealthProfileTestList(generics.ListCreateAPIView):

    queryset = op_models.EmpHealthProfileTest.objects.all().order_by('-id')
    serializer_class = op_serializers.EmpHealthProfileTestSerializer

    # @transaction.atomic
    # def perform_create(self, serializer):
    #     self.request.data['created_by']= self.request.user.id
    #     instance=serializer.save()
    #     return instance
    def post(self, request, *args, **kwargs):

        print(request.data)
        
        if(int(request.data['id']) <= 0):
            print('Insert:')
            request.data['created_by']= request.user.id

            result = self.create(request, *args, **kwargs)
        else:
            print('Update:')
            result = self._update(request, *args, **kwargs)

        return result

    def get_queryset(self):
        queryset = super().get_queryset()
        employee = self.request.query_params.get('employee')
        session =  self.request.query_params.get('session')
        if employee : 
            queryset = queryset.filter(employee=employee)
        
        if session : 
            queryset = queryset.filter(medical_test_session=session)
            
        return queryset
    
    def _update(self , request, *args, **kwargs):

        model = op_models.EmpHealthProfileTest.objects.get(id=request.data['id'])
        if(model):
            model.location = request.data['location']
            model.reg_date = request.data['reg_date']
            model.collection_date = request.data['collection_date']
            model.ref_doctor = request.data['ref_doctor']
            model.sample_type = request.data['sample_type']
            model.analyst = request.data['analyst']
            model.created_by = request.user

            model.save()

            serialize_model = model_to_dict(model)

            return response.Response(serialize_model, status=status.HTTP_202_ACCEPTED)
    
        return response.Response("Data not found", status=status.HTTP_404_NOT_FOUND)
    
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
    