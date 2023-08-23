from rest_framework import serializers
from .models import Customer


class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = ["customer_first_name", "customer_last_name", "customer_email", "customer_contact_info", "password"]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return Customer.objects.create_user(**validated_data)

