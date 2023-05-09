from rest_framework import generics
from masters import models as master_model
from masters import serializers as master_serializers

class MedicalTestProfileList(generics.ListCreateAPIView):

    queryset= master_model.MedicalTestProfile.objects.order_by('-id')
    serializer_class= master_serializers.MedicalTestProfileSerializer


class MedicalTestProfileDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = master_model.MedicalTestProfile
    serializer_class = master_serializers.MedicalTestProfileSerializer

    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)
    
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)


class MedicalTestProfileListWithoutPagination(generics.ListAPIView):

    queryset= master_model.MedicalTestProfile.objects.all().order_by('-id')
    serializer_class= master_serializers.MedicalTestProfileSerializer
    pagination_class = None


