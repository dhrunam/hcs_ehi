
from importlib.resources import path
from django.db import router
from django.urls import include, path
from rest_framework import routers
from configuration import views as conf_views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('config/medical_test_session', conf_views.MedicalTestSessionList .as_view()),
    path('config/medical_test_session/<int:pk>', conf_views.MedicalTestSessionDetails.as_view()),
]