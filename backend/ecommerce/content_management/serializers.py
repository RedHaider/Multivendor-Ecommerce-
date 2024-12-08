from rest_framework import serializers
from .models import home_carousal , contactus_faq, contactus_form , home_banner , aboutus_dropdown, aboutus_mv ,aboutus_ourteam

class HomeCarouselSerializer(serializers.ModelSerializer):
    class Meta:
        model = home_carousal
        fields = ['title', 'image']

class ContactUsFAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = contactus_faq
        fields =['title','description']

class ContactUsFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = contactus_form
        fields = ['name', 'email', 'description']

class HomeBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = home_banner
        fields = ['title', 'image']  

# Serializer for aboutus_dropdown model
class AboutUsDropdownSerializer(serializers.ModelSerializer):
    class Meta:
        model = aboutus_dropdown
        fields = ['title', 'content']

# Serializer for aboutus_ourteam model
class AboutUsOurTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = aboutus_ourteam
        fields = ['name', 'designation', 'image']

# Serializer for aboutus_mv model
class AboutUsMVSerializer(serializers.ModelSerializer):
    class Meta:
        model = aboutus_mv
        fields = ['title', 'content']