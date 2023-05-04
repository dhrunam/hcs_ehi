from rest_framework import generics
from masters import models as master_model
from masters import serializers as master_serializers

class MedicalTestProfileList(generics.ListCreateAPIView):

    queryset= master_model.MedicalTestProfile.objects.all().order_by('-id')
    serializer_class= master_serializers.MedicalTestProfileSerializer


class MedicalTestProfileDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = master_model.MedicalTestProfile
    serializer_class = master_serializers.MedicalTestProfileSerializer


class MedicalTestProfileListWithoutPagination(generics.ListCreateAPIView):

    queryset= master_model.MedicalTestProfile.objects.all().order_by('-id')
    serializer_class= master_serializers.MedicalTestProfileSerializer
    pagination_class = None


