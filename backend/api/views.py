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
from rest_framework.parsers import MultiPartParser,FormParser

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
    
# class LoginView(APIView):
#     permission_classes = (AllowAny,)
    
#     def post(self, request):
#         username = request.data.get("username")
#         password = request.data.get("password")
#         message = request.data.get("message")
        
#         print(message)
#         print(request.user.is_superuser)
#         if(message != "admin" or not request.user.is_superuser):
#             return Response({"error":"Only admin can login."},status=status.HTTP_403_FORBIDDEN)

#         user = authenticate(username=username, password=password)
#         print(user)
#         print(user.is_superuser,"admin")
#         if user:
#             token,_ = Token.objects.get_or_create(user=user)
#             if user.is_superuser:
#                 return Response(token.key,{"message": "admin"},status=status.HTTP_200_OK)
#             else:
#                 return Response(token.key,status=status.HTTP_200_OK)
#         else:
#             return Response({"error": "Wrong Credentials"},status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        print(request.data)
        username = request.data.get("username")
        password = request.data.get("password")
        message = request.data.get("message")

        user = authenticate(username=username, password=password)

        if not user:
            return Response({"error": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST)

        # Handle admin login
        if message == "admin":
            if not user.is_superuser:
                return Response({"error": "Only admin can login."}, status=status.HTTP_403_FORBIDDEN)
            token, _ = Token.objects.get_or_create(user=user)
            return Response(token.key, status=status.HTTP_200_OK)

        # Handle user login
        if message == "user":
            token, _ = Token.objects.get_or_create(user=user)
            return Response(token.key, status=status.HTTP_200_OK)

        # If message is neither "admin" nor "user"
        return Response({"error": "Invalid login type specified."}, status=status.HTTP_400_BAD_REQUEST)
        
class FoodListView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser,FormParser]
    
    def get(self,request):
        food = Food.objects.all()
        serializer = FoodSerializer(food,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        if not request.user.is_superuser:
            return Response({"error":"Only admin  can add food items."},status=status.HTTP_403_FORBIDDEN)
        try:
            request.data['price'] = float(request.data['price'])
        except:
            pass
        serializer = FoodSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class FoodDetailView(APIView):
    
    def get(self,request,pk):
        food = Food.objects.get(pk=pk)
        serializer = FoodSerializer(food)
        return Response(serializer.data)

    
    def delete(self,request,pk):
        food = Food.objects.get(pk=pk)
        if not request.user.is_superuser:
            return Response({"error":"Only Admin can delete food items."},status=status.HTTP_403_FORBIDDEN)
        
        try:
            food = Food.objects.get(pk=pk)
        except Food.DoesNotExist:
            return Response({"error":"Food item does not exist."},status=status.HTTP_404_NOT_FOUND)
        food.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class CartView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get_cart(self,request):
        # print("-------------------------------------------------")
        # print(request)
        cart,_ = Cart.objects.get_or_create(user = request, is_active = True)
        return cart
    
    def get(self,request):
        cart = self.get_cart(request.user)
        # print("this is ",cart)
        item = CartItem.objects.filter(cart = cart)
        print(item)
        serializer = CartItemSerializer(item,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        cart = self.get_cart(request.user)
        # print("cart",cart)
        # print(request.data)
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
    
    
class OrderView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request,pk=None):
        if pk:  
            try:
                order = Order.objects.get(pk=pk)
                if request.user.is_superuser or order.user == request.user:
                    serializer = OrderSerializer(order)
                    return Response(serializer.data)
                else:
                    return Response({"error": "You do not have permission to view this order."}, status=status.HTTP_403_FORBIDDEN)
            except Order.DoesNotExist:
                return Response({"error": "Order does not exist."}, status=status.HTTP_404_NOT_FOUND)
        
        if request.user.is_superuser:
            order = Order.objects.all()
        else:    
            order = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(order, many=True)
        return Response(serializer.data)

            
    def post(self, request):
        print(request.user)
        print(request.data)
        serializer = OrderSerializer(data=request.data)  # No user here
        print(serializer.is_valid())
        if serializer.is_valid():
            order = serializer.save(user=request.user)  # Pass user when saving
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self,request,pk):
        try:
            order = Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return Response({"error":"Order does not exist."},status=status.HTTP_404_NOT_FOUND)
        print(request.data)
        serializer = OrderSerializer(order,data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



class OrderItemView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self,request):
        try:
            order = Order.objects.get(user = request.user)
            serializer = OrderSerializer(order,many=True)
            print(serializer.data,"orders")
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