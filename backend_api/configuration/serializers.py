from rest_framework import serializers
from configuration import models as conf_models
from masters import serializers as master_serializer


class HelperMedicalTestProfilePerSessionSerializer(serializers.ModelSerializer):
    related_test_profile = master_serializer.HelperMedicalTestProfileSerializer(source='medical_test_profile', read_only=True)

    class Meta:
        model = conf_models.MedicalTestProfilePerSession
        fields = [
            'id',
            'medical_test_session',
            'medical_test_profile',
            'related_test_profile'
        ]
class MedicalTestSessionSeriralizer(serializers.ModelSerializer):
    related_profiles=HelperMedicalTestProfilePerSessionSerializer(source = 'medical_test_profile_per_session'
                                                                 , many=True
                                                                 , read_only=True)
    class Meta:
        model = conf_models.MedicalTestSession
        fields = (
            'id',
            'year',
            'session',
            'related_profiles',
        )
