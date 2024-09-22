from numbers import Number
import django
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser
from .serializers import UserSerializer,FoodSerializer,CartItemSerializer,OrderItemSerializer,OrderSerializer
from rest_framework import status
from django.contrib.auth import authenticate
from .models import Food,Cart,CartItem,Order,OrderItem
import json

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
            food = Food.objects.get(pk=pk)
        except Food.DoesNotExist:
            return Response({"error":"Food item does not exist."},status=status.HTTP_404_NOT_FOUND)
        food.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class CartView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get_cart(self,request):
        print("-------------------------------------------------")
        print(request)
        cart,_ = Cart.objects.get_or_create(user = request, is_active = True)
        return cart
    
    def get(self,request):
        cart = self.get_cart(request.user)
        print("this is ",cart)
        item = CartItem.objects.filter(cart = cart)
        print(item)
        serializer = CartItemSerializer(item,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        cart = self.get_cart(request.user)
        print("cart",cart)
        print(request.data)
        food_id = request.data.get('id')
        quantity = request.data.get('quantity',1)
        message = request.data.get('message')
        print(food_id,quantity)
        quantity = int(quantity)
        
        try:
            food = Food.objects.get(id = food_id)
        except Food.DoesNotExist:
            return Response({"error":"Food item does not exist."},status=status.HTTP_404_NOT_FOUND)
        
        cart_item,created = CartItem.objects.get_or_create(cart = cart, food = food)
        if created:
            cart_item.quantity = quantity
        else:
            if(message == "add"):
                cart_item.quantity += 1
                
            elif(message == "remove"):
                cart_item.quantity -= 1
                
            else:
                cart_item.delete()
                return Response({"message": "Cart item deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        cart_item.save()
        print("saved to cart")
        return Response({"message":"Cart item added successfully."},status=status.HTTP_201_CREATED)
    
    # def delete(self,request):
    #     cart = self.get_cart(request.user)
    #     food_id = request.data.get('id')
        
    #     try:
    #         food = Food.objects.get(id = food_id)
    #     except Food.DoesNotExist:
    #         return Response({"error":"Food item does not exist."},status=status.HTTP_404_NOT_FOUND)
        
    #     cart_item = CartItem.objects.get(cart = cart, food = food)
    #     cart_item.delete()
    #     return Response({"message":"Cart item deleted successfully."},status=status.HTTP_204_NO_CONTENT)
    
class OrderView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self,request):
        order = Order.objects.filter(user = request.user)
        serializer = OrderSerializer(order,many=True)
        return Response(serializer.data)
            
    def post(self,request):
        serializer = OrderSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save(user = request.user)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class OrderItemView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self,request,pk):
        try:
            order = Order.objects.get(pk=pk)
            serializer = OrderSerializer(order)
            return Response(serializer.data)
        except Order.DoesNotExist:
            return Response({"error":"Order does not exist."},status=status.HTTP_404_NOT_FOUND)
        
    def put(self,request,pk):
        try:
            order = Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return Response({"error":"Order does not exist."},status=status.HTTP_404_NOT_FOUND)
        
        serializer = OrderSerializer(order,data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,pk):
        try:
            order = Order.objects.get(pk=pk)
            order.delete()
            return Response({"message":"Order deleted successfully."},status=status.HTTP_204_NO_CONTENT)
        except Order.DoesNotExist:
            return Response({"error":"Order does not exist."},status=status.HTTP_404_NOT_FOUND)