from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Food,CartItem,Cart,OrderItem,Order

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email','password']
        
    def create(self,validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        return user
    
class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['id', 'name', 'description', 'price', 'image','category']
        
class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id','food','quantity']
        
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'food', 'quantity', 'price']
        
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many = True)
    
    class Meta:
        model = Order
        fields = ['id',  'total_price', 'first_name', 'last_name', 
                  'email', 'street', 'city', 'zipcode', 'country', 'mobile', 'status','created_at', 'items']
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        
        for items in items_data:
            OrderItem.objects.create(order=order, **items)
        return order
    
    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance