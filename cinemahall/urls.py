from django.urls import path
from .views import *

app_name = "cinemahall"

urlpatterns = [
    path("", index, name="index"),
    path("SignUp/", sign_up_get, name="SignUp"),
    path("Login/", login_get, name="Login"),
    path("LoginPost/", LoginPost.as_view(), name="LoginPost"),
    path("register/", RegistrationView.as_view(), name="register"),
    path("logout/", logout_view, name="logout"),
    path("accountControls/", account_view, name="accountControls"),
    path("accountUpdate/", AccountUpdate.as_view(), name="accountUpdate"),
    path("accountInfo/", AccountInfo.as_view(), name="accountInfo"),
    path("changePassword/", change_password_view, name="changePassword"),
    path("changePasswordPost/", PasswordChange.as_view(), name="changePasswordPost"),
    path("film/<str:imdb_id>", film_details, name="filmDetails"),
]
