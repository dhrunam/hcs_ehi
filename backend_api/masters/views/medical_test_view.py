from rest_framework import generics
from masters import (
    models as master_models,
    serializers as master_serializers
    
    )


class MedicalTestList(generics.ListCreateAPIView):
    queryset = master_models.MedicalTest.objects.all().order_by('-id')
    serializer_class = master_serializers.MedicalTestSerializer


class MedicalTestDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = master_models.MedicalTest
    serializer_class = master_serializers.MedicalTestSerializer

class MedicalTestListWithoutPagination(generics.ListAPIView):
    queryset = master_models.MedicalTest.objects.all().order_by('-id')
    serializer_class = master_serializers.MedicalTestSerializer
    pagination_class = None
