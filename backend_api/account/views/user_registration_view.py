from rest_framework import generics
from django.contrib.auth.models import User,Group
from account import serializers
from durin.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated



class UserRegisterList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = serializers.RegisterSerializer

    


class UserRegisterDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = User
    serializer_class = serializers.RegisterSerializer

class UserUpdatePassword(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = User
    serializer_class = serializers.UpdateUserPasswordSerializer


class UserGroupList(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = Group.objects.all()
    serializer_class = serializers.UserGroupSerializer

class UserGroupDetails(generics.RetrieveUpdateDestroyAPIView):
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    queryset = Group
    serializer_class = serializers.UserGroupSerializer

