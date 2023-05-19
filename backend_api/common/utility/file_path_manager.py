from configuration import models as conf_models
from operation import models as op_models
from masters import models as master_models
class FilePathManager():
    def get_file_path(instance, filename):

            # Generate the dynamic path based on the instance and filename
    # For example, you can use the instance's ID and the original filename
        emp_health_profile_test = op_models.EmpHealthProfileTest.objects.filter(id = instance.emp_health_profile_test).last()
        medical_test_session = []
        path=f'reports/'
        if emp_health_profile_test:
            medical_test_session= conf_models.MedicalTestSession.objects.filter(id=emp_health_profile_test.medical_test_session).last()
            if medical_test_session:
                path= path + f'{medical_test_session.year}/{medical_test_session.session}'

        path= path + f'/{filename}'
        return  path
