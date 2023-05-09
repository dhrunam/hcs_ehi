from rest_framework import generics, response, status
from masters import models as master_model
from masters import serializers as master_serializers
from django.db import transaction, connection

class MedicalTestProfileList(generics.ListCreateAPIView):

    queryset= master_model.MedicalTestProfile.objects.all().order_by('-id')
    serializer_class= master_serializers.MedicalTestProfileSerializer


class MedicalTestProfileDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = master_model.MedicalTestProfile
    serializer_class = master_serializers.MedicalTestProfileSerializer

    def put(self, request, *args, **kwargs):
        tests= master_model.MedicalTest.objects.filter(profile=request.data['id'])
        tests.update(is_deleted=request.data['is_deleted'])
        return super().put(request, *args, **kwargs)
    
    @transaction.atomic
    def patch(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        tests= master_model.MedicalTest.objects.filter(profile=request.data['id'])
        tests.update(is_deleted=request.data['is_deleted'])
        return response.Response(serializer.data, status=status.HTTP_200_OK)



class MedicalTestProfileListWithoutPagination(generics.ListAPIView):

    queryset= master_model.MedicalTestProfile.objects.filter(is_deleted=False).order_by('-id')
    serializer_class= master_serializers.MedicalTestProfileSerializer
    pagination_class = None


