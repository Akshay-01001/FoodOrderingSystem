from django.db import models

# Create your models here.
class Food(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='food_images/')
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=255)

    def __str__(self):
        return self.name