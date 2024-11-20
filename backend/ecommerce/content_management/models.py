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
    
class home_carousal(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='carousal/')

    def __str__(self):
        return self.title
    
class home_banner(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='home banner/')

    def __str__(self):
        return self.title

class footer_description(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.title

class contactus_form(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    description = models.TextField()

    def __str__(self):
        return self.name

class contactus_faq(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.title
    
class logo_main(models.Model):
    title = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='main_logo/')

    def __str__(self):
        return self.title
