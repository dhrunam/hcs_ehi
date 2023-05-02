
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
]

