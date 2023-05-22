from rest_framework import serializers
from operation import models as op_models
# import magic


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
    
    # def validate_report_url(self, value):
    #     file_extension = value.name.split('.')[-1].lower()

    #     # Allowed file extensions
    #     allowed_extensions = ['pdf']

    #     if file_extension not in allowed_extensions:
    #         raise serializers.ValidationError("Invalid file type. Only PDF files are allowed.")

       
    #     mime_type = magic.from_buffer(value.read(), mime=True)

    #     # Allowed MIME types
    #     allowed_mime_types = ['application/pdf']

    #     if mime_type not in allowed_mime_types:
    #         raise serializers.ValidationError("Invalid file type. Only PDF files are allowed.")

    #     return value




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
            'emp_remarks',
            'is_entry_completed',
            'related_emp_health_test_details',
            'related_emp_health_tests_reports',

        )


