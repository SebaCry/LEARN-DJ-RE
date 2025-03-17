from django.urls import path
from .views import get_kids, create_kids,kid_detail

urlpatterns = [
    path('kids/', get_kids, name='get_kids'),
    path('kids/create/', create_kids, name='create_kids'),
    path('kids/<int:pk>/', kid_detail, name='kid_detail')
]
