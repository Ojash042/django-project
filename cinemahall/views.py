import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from django.views.decorators.csrf import requires_csrf_token, ensure_csrf_cookie, csrf_exempt
from .serializers import CustomerSerializer
from rest_framework.response import Response
from .models import Customer
# Create your views here.


def index(request):
    return render(request, 'cinemahall/index.html')


@requires_csrf_token
@ensure_csrf_cookie
def sign_up_get(request):
    return render(request, 'cinemahall/SignUp.html')


class RegistrationView(APIView):
    def post(self, request):
        data = request.data
        del data["confirmPassword"]
        data_body = {
            "customer_first_name": data["firstName"],
            "customer_last_name": data["lastName"],
            "customer_email": data["email"],
            "customer_contact_info": data["phone"],
            "password": data["password"]
        }

        try:
            Customer.objects.get(customer_email=data_body["customer_email"])
            context = {
                "error": "E-mail already exists"
            }

            return Response(context, status=400)
        except ObjectDoesNotExist:
            serializers = CustomerSerializer(data=data_body)
            if serializers.is_valid():
                serializers.save()
                return redirect("/")
            else:
                print(serializers.errors)


class LoginPost(APIView):
    def post(self, request):
        if request.user.is_authenticated:
            return redirect('/')
        data = request.data
        user = authenticate(request, customer_email=data["email"], password=data["password"])
        if user is not None:
            login(request, user)
            return Response(status=200)
        else:
            context = {
                "error": "E-mail/Password Invalid"
            }
            return Response(context, status=400)


@requires_csrf_token
def login_get(request):
    if request.user.is_authenticated:
        print("hello w")
        return redirect('/')
    else:
        print("HAA")
    return render(request, 'cinemahall/Login.html')


def logout_view(request):
    logout(request)
    return redirect('/')


def account_view(request):
    if not request.user.is_authenticated:
        return redirect('cinemahall:Login')
    return render(request, "cinemahall/accountControls.html")


class AccountUpdate(APIView):
    def post(self, request):
        user = request.user
        data = request.data
        print(data)
        user_data = {
            "customer_first_name": data["firstName"],
            "customer_last_name": data["lastName"],
            "customer_email": data["email"],
            "customer_contact_info": data["phone"]
        }
        serializer = CustomerSerializer(user, data=user_data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(status=200)
        return Response(status=400)



class AccountInfo(APIView):
    def get(self, request):
        context = {
            "email": request.user.customer_email,
            "first_name": request.user.customer_first_name,
            "last_name": request.user.customer_last_name,
            "contact_info": request.user.customer_contact_info,
        }
        return Response(context, status=200)


def change_password_view(request):
    pass


class PasswordChange(APIView):
    pass
