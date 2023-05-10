from rest_framework import generics, response
from configuration import serializers as conf_serializer
from configuration import models as conf_models
from django.db import connection, transaction
from masters import models as master_models
import json

class MedicalTestSessionList(generics.ListCreateAPIView):
    queryset= conf_models.MedicalTestSession.objects.all().order_by('-id')
    serializer_class= conf_serializer.MedicalTestSessionSeriralizer
    
    @transaction.atomic
    def perform_create(self, serializer):
        instance = serializer.save()
        # Access the instance of the just created model here
        print(instance)  # Example: Printing the instance
        
        # You can perform any additional operations using the instance

        # Note: The instance will also be returned in the response to the client
        data = json.loads(self.request.data['profiles'])
        print(data)
        if data:
            for element in data:
                conf_models.MedicalTestProfilePerSession.objects.create(
                    medical_test_session = instance,
                    medical_test_profile = master_models.MedicalTestProfile.objects.get(pk=element)
                )
        
        return instance
    

class MedicalTestSessionDetails(generics.RetrieveUpdateAPIView):
    queryset= conf_models.MedicalTestSession
    serializer_class= conf_serializer.MedicalTestSessionSeriralizer
    
    def perform_update(self, serializer):
        instance = serializer.save()
        # Access the instance of the updated object here
        data = json.loads(self.request.data['profiles'])
        print(data)
        if data:
            conf_models.MedicalTestProfilePerSession.objects.filter(medical_test_session=instance.id).delete()
            for element in data:
                conf_models.MedicalTestProfilePerSession.objects.create(
                    medical_test_session = instance,
                    medical_test_profile = master_models.MedicalTestProfile.objects.get(pk=element)
                )
        # You can perform any additional operations using the instance

        # Note: The instance will also be returned in the response to the client

        return instance

        








