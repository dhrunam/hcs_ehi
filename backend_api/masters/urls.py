
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

    path('masters/organisation', masters_views.OrganisationList.as_view()),
    path('masters/organisation/<int:pk>', masters_views.OrganisatiionDetails.as_view()),

    path('masters/employee_group', masters_views.EmployeeGroupList.as_view()),
    path('masters/employee_group/<int:pk>', masters_views.EmployeeGroupDetails.as_view()),

    path('masters/designation', masters_views.DesignationList.as_view()),
    path('masters/designation/<int:pk>', masters_views.DesignationDetails.as_view()),
    
    path('masters/bloodgroup', masters_views.BloodGroupList.as_view()),
    path('masters/bloodgroup/<int:pk>', masters_views.BloodGroupDetails.as_view()),

    path('masters/employee', masters_views.EmployeeList.as_view()),
    path('masters/employee/<int:pk>', masters_views.EmployeeDetails.as_view()),

    path('masters/section', masters_views.SectionList.as_view()),
    path('masters/section/<int:pk>', masters_views.SectionDetails.as_view()),



]

