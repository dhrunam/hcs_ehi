
from importlib.resources import path
from django.db import router
from django.urls import include, path
from rest_framework import routers
from masters import views as masters_views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('masters/district', masters_views.DistrictList.as_view()),
    path('masters/district/<int:pk>', masters_views.DistrictDetails.as_view()),
    path('masters/district/list', masters_views.DistrictListWithoutPagination.as_view()),

    path('masters/organisation', masters_views.OrganisationList.as_view()),
    path('masters/organisation/<int:pk>', masters_views.OrganisatiionDetails.as_view()),
    path('masters/organisation/list', masters_views.OrganisationListWithoutPagination.as_view()),

    path('masters/employee_group', masters_views.EmployeeGroupList.as_view()),
    path('masters/employee_group/<int:pk>', masters_views.EmployeeGroupDetails.as_view()),
    path('masters/employee_group/list', masters_views.EmployeeGroupListWithoputPagination.as_view()),

    path('masters/designation', masters_views.DesignationList.as_view()),
    path('masters/designation/<int:pk>', masters_views.DesignationDetails.as_view()),
    path('masters/designation/list', masters_views.DesignationListWithoutPagination.as_view()),
    
    path('masters/bloodgroup', masters_views.BloodGroupList.as_view()),
    path('masters/bloodgroup/<int:pk>', masters_views.BloodGroupDetails.as_view()),
    path('masters/bloodgroup/list', masters_views.BloodGroupListWtioutPagination.as_view()),

    path('masters/employee', masters_views.EmployeeList.as_view()),
    path('masters/employee/<int:pk>', masters_views.EmployeeDetails.as_view()),

    path('masters/medical_test_profile', masters_views.MedicalTestProfileList.as_view()),
    path('masters/medical_test_profile/<int:pk>', masters_views.MedicalTestProfileDetails.as_view()),
    path('masters/medical_test_profile/list', masters_views.MedicalTestProfileListWithoutPagination.as_view()),

    path('masters/medical_test', masters_views.MedicalTestList.as_view()),
    path('masters/medical_test/<int:pk>', masters_views.MedicalTestDetails.as_view()),
    path('masters/medical_test/list', masters_views.MedicalTestListWithoutPagination.as_view()),
    
    path('masters/employee_type', masters_views.EmployeeTypeList.as_view()),
    path('masters/employee_type/<int:pk>', masters_views.EmployeeTypeDetails.as_view()),
    path('masters/employee_type/list', masters_views.EmployeeTypeListWithoutPagination.as_view()),
]

