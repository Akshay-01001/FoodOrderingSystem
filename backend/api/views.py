import django
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser
from .serializers import UserSerializer,FoodSerializer
from rest_framework import status
from django.contrib.auth import authenticate
from .models import Food

# Create your views here.

class RegisterView(APIView):
    permission_classes = (AllowAny,)
    
    def post(self, request):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            user = serializer.save()
            token,_ = Token.objects.get_or_create(user=user)
            return Response({'token':token.key,'message':"Login Success"},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    permission_classes = (AllowAny,)
    
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            token,_ = Token.objects.get_or_create(user=user)
            return Response(token.key,status=status.HTTP_200_OK)
        else:
            return Response({"error": "Wrong Credentials"},status=status.HTTP_400_BAD_REQUEST)
        
class FoodListView(APIView):
    permission_classes = [AllowAny]
    
    def get(self,request):
        food = Food.objects.all()
        serializer = FoodSerializer(food,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        if not request.user.is_staff:
            return Response({"error":"Only staff members can add food items."},status=status.HTTP_403_FORBIDDEN)
        serializer = FoodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class FoodDetailView(APIView):
    
    def get(self,request,pk):
        food = Food.objects.get(pk=pk)
        serializer = FoodSerializer(food)
        return Response(serializer.data)

    
    def delete(self,request,pk):
        food = Food.objects.get(pk=pk)
        if not request.user.is_staff:
            return Response({"error":"Only staff members can delete food items."},status=status.HTTP_403_FORBIDDEN)
        
        try:
            food - Food.objects.get(pk=pk)
        except Food.DoesNotExist:
            return Response({"error":"Food item does not exist."},status=status.HTTP_404_NOT_FOUND)
        food.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)