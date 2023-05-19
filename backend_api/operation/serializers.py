from rest_framework import serializers
from operation import models as op_models


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


class EmpHealthTestReportsSerializer(serializers.ModelSerializer):

    class Meta:
        model = op_models.EmpHealthTestReports
        fields = (
            'id',
            'emp_health_profile_test',
            'report_name',
            'report_url',

        )


class EmpHealthProfileTestSerializer(serializers.ModelSerializer):
    related_emp_health_test_details = EmpHealthTestDetailsSerializer(source='emp_health_test_details', many=True, read_only=True)
    related_emp_health_tests_reports= EmpHealthTestReportsSerializer(source='emp_health_test_report', many=True, read_only=True)
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
            'related_emp_health_test_details',
            'related_emp_health_tests_reports',

        )


