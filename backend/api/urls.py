from django.contrib import admin
from django.urls import path
from .views import RegisterView,LoginView,FoodListView,FoodDetailView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('register/',view=RegisterView.as_view(),name='register'),
    path('login/',view=LoginView.as_view(),name='login'),
    path('foods/', FoodListView.as_view(), name='food-list'),
    path('foods/<int:pk>/', FoodDetailView.as_view(), name='food-detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)