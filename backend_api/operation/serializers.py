from rest_framework import serializers
from operation import models as op_models

class EmpHealthProfileTestSerializer(serializers.ModelSerializer):

    class Meta:
        model = op_models.EmpHealthProfileTest
        fields= (
            'id',
            'employee',
            'medical_test_session',
            'sample_type',
            'collection_date',
            'reg_date',
            'ref_doctor',
            'analyst',
            'location',
            'is_entry_completed',

        )


class EmpHealthTestDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model= op_models.EmpHealthTestDetails

        fields = (
            'id',
            'emp_health_profile_test',
            'medical_test_profile',
            'medical_test',
            'medical_test_result',
            'normal_min_value',
            'normal_max_value',
            'unit',
        )
