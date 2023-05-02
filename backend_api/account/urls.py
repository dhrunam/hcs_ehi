
from django.db import router
from django.urls import include, path
from rest_framework import routers
from account import views as acc_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('account/register', acc_views.UserRegisterList.as_view()),
    path('account/<int:pk>', acc_views.UserRegisterDetails.as_view()),
    path('account/group', acc_views.UserGroupList.as_view()),
    path('account/group/<int:pk>', acc_views.UserGroupDetails.as_view()),
]
