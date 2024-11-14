from django import forms
from .models import aboutus_dropdown, aboutus_ourteam, aboutus_mv

class AboutUsDropdownForm(forms.ModelForm):
    class Meta:
        model = aboutus_dropdown
        fields = ['title', 'content']

class AboutUsOurTeamForm(forms.ModelForm):
    class Meta:
        model = aboutus_ourteam
        fields = ['name', 'designation', 'image']

class AboutUsMVForm(forms.ModelForm):
    class Meta:
        model = aboutus_mv
        fields = ['title', 'content']
