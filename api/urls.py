from django.urls import path
from . import views


urlpatterns = [
    path('filmlists/', views.FilmsListApi.as_view()),
]