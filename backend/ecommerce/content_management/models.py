from django.db import models

# Create your models here.

class aboutus_dropdown(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()

    def __str__(self):
        return self.title
    
class aboutus_ourteam(models.Model):
    name = models.CharField(max_length=255)
    designation = models.CharField(max_length=255)
    image = models.ImageField(upload_to='ourteam/')

    def __str__(self):
        return self.title
    
class aboutus_mv(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()

    def __str__(self):
        return self.title