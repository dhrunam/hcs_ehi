from rest_framework import serializers
from django.db import transaction
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import User, Group
from rest_framework.validators import UniqueValidator


class UserGroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = Group

        fields = [
            'id',
            'name',

        ]

class RegisterSerializer(serializers.ModelSerializer):
    
    related_groups = UserGroupSerializer(
        source='groups',  many=True, read_only=True)
    email = serializers.EmailField(
        required=False,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    # email=serializers.CharField(write_only=True, max_length=128)
    first_name = serializers.CharField(max_length=128)
    last_name = serializers.CharField(max_length=128)
    is_staff = serializers.BooleanField(default=False)
    group = serializers.CharField(max_length=128, write_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'password', 'password2',
            'email',
            'first_name',
            'last_name',
            'is_staff',
            'group',
            'related_groups',

        ]
        extra_kwargs = {
            'group': {'required': True}
        }

    def validate(self, attrs):
        if 'password' in attrs:
            if attrs['password'] != attrs['password2']:
                raise serializers.ValidationError(
                    {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):

        try:
            with transaction.atomic():
                user = User.objects.create(
                    username=validated_data['username'],
                    email=validated_data.get('email', ''),
                    first_name=validated_data['first_name'],
                    last_name=validated_data['last_name'],
                    is_staff=True if validated_data['group'] == 'user' else False,
                )
                user.groups.add(Group.objects.get(
                    id=validated_data['group']))
                user.set_password(validated_data['password'])
                user.save()

                return user

                # return Response(serializers.data(), status=status.HTTP_200_OK)

        except TypeError:
            return TypeError("There is some error in processing your data.")

    def update(self, instance, validated_data):

        try:
            with transaction.atomic():
                user = instance

                user.username = validated_data['username']
                # user.email = validated_data['email']
                user.first_name = validated_data['first_name']
                user.last_name = validated_data['last_name']
                user.is_staff = True if validated_data['group'] == 'user' else False
                # user.set_password(validated_data['password'])
                user.groups.clear();
                user.groups.add(Group.objects.get(
                    id=validated_data['group']))
                user.save()

                return user

        except TypeError:
            return TypeError("There is some error in processing your data.")


class UpdateUserPasswordSerializer(serializers.ModelSerializer):
    

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    # email=serializers.CharField(write_only=True, max_length=128)


    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'password', 'password2',


        ]


    def validate(self, attrs):
        if 'password' in attrs:
            if attrs['password'] != attrs['password2']:
                raise serializers.ValidationError(
                    {"password": "Password fields didn't match."})

        return attrs


    def update(self, instance, validated_data):

        try:
            with transaction.atomic():
                user = instance

                user.set_password(validated_data['password'])
                user.save()
                return user

        except TypeError:
            return TypeError("There is some error in processing your data.")



