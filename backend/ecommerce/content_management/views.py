from django.shortcuts import render, get_object_or_404, redirect
from .models import aboutus_dropdown, aboutus_ourteam, aboutus_mv , home_banner, home_carousal, footer_description , contactus_faq, logo_main, contactus_form
from .forms import AboutUsDropdownForm, AboutUsOurTeamForm, AboutUsMVForm
from django.views.generic import ListView, CreateView, UpdateView, DeleteView, DetailView
from django.urls import reverse_lazy


# Dropdown Content Views
def aboutus_dropdown_list(request):
    dropdown_items = aboutus_dropdown.objects.all()
    return render(request, 'content_management/aboutus_dropdown_list.html', {'dropdown_items': dropdown_items})

def aboutus_dropdown_create(request):
    if request.method == 'POST':
        form = AboutUsDropdownForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('aboutus_dropdown_list')
    else:
        form = AboutUsDropdownForm()
    return render(request, 'content_management/aboutus_dropdown_form.html', {'form': form})

def aboutus_dropdown_detail(request, pk):
    dropdown_item = get_object_or_404(aboutus_dropdown, pk=pk)
    return render(request, 'content_management/aboutus_dropdown_detail.html', {'dropdown_item': dropdown_item})

def aboutus_dropdown_edit(request, pk):
    dropdown_item = get_object_or_404(aboutus_dropdown, pk=pk)
    if request.method == 'POST':
        form = AboutUsDropdownForm(request.POST, instance=dropdown_item)
        if form.is_valid():
            form.save()
            return redirect('aboutus_dropdown_list')
    else:
        form = AboutUsDropdownForm(instance=dropdown_item)
    return render(request, 'content_management/aboutus_dropdown_form.html', {'form': form, 'title': 'Edit Dropdown Item'})

def aboutus_dropdown_delete(request, pk):
    dropdown_item = get_object_or_404(aboutus_dropdown, pk=pk)
    if request.method == 'POST':
        dropdown_item.delete()
        return redirect('aboutus_dropdown_list')
    return render(request, 'content_management/aboutus_dropdown_confirm_delete.html', {'dropdown_item': dropdown_item})





# Team Content Views
def aboutus_ourteam_list(request):
    team_members = aboutus_ourteam.objects.all()
    return render(request, 'content_management/aboutus_ourteam_list.html', {'team_members': team_members})

def aboutus_ourteam_create(request):
    if request.method == 'POST':
        form = AboutUsOurTeamForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('aboutus_ourteam_list')
    else:
        form = AboutUsOurTeamForm()
    return render(request, 'content_management/aboutus_ourteam_form.html', {'form': form})



# Mission and Vision Content Views

def aboutus_mv_list(request):
    mv_entries = aboutus_mv.objects.all()
    return render(request, 'content_management/aboutus_mv_list.html', {'mv_entries': mv_entries})


def aboutus_mv_detail(request, pk):
    mv_entry = get_object_or_404(aboutus_mv, id=pk)
    return render(request, 'content_management/aboutus_mv_detail.html', {'mv_entry': mv_entry})


def aboutus_mv_edit(request, pk):
    mv_entry = get_object_or_404(aboutus_mv, id=pk)
    if request.method == 'POST':
        form = AboutUsMVForm(request.POST, instance=mv_entry)
        if form.is_valid():
            form.save()
            return redirect('aboutus_mv_list')
    else:
        form = AboutUsMVForm(instance=mv_entry)
    return render(request, 'content_management/aboutus_mv_form.html', {'form': form})


#Home Carousal
# List View
class HomeCarousalListView(ListView):
    model = home_carousal
    template_name = 'content_management/home_carousal.html'
    context_object_name = 'carousals'


# Create View
class HomeCarousalCreateView(CreateView):
    model = home_carousal
    fields = ['title', 'image']
    template_name = 'content_management/home_carousal_form.html'
    success_url = reverse_lazy('home-carousal-list')


# Detail View
class HomeCarousalDetailView(DetailView):
    model = home_carousal
    template_name = 'content_management/home_carousal_details.html'
    context_object_name = 'carousal'


# Update View
class HomeCarousalUpdateView(UpdateView):
    model = home_carousal
    fields = ['title', 'image']
    template_name = 'content_management/home_carousal_edit.html'
    success_url = reverse_lazy('home-carousal-list')


# Delete View
class HomeCarousalDeleteView(DeleteView):
    model = home_carousal
    success_url = reverse_lazy('home-carousal-list')  # Redirect to the list page after deletion

    # Skip confirmation page by overriding `get` method
    def get(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)
    

#Banner of home
class HomeBannerListView(ListView):
    model = home_banner
    template_name = 'content_management/home_banner.html'
    context_object_name = 'banners'


class HomeBannerCreateView(CreateView):
    model = home_banner
    fields = ['title', 'image']
    template_name = 'content_management/home_banner_form.html'
    success_url = reverse_lazy('home-banner-list')


class HomeBannerUpdateView(UpdateView):
    model = home_banner
    fields = ['title', 'image']
    template_name = 'content_management/home_banner_edit.html'
    success_url = reverse_lazy('home-banner-list')


class HomeBannerDetailView(DetailView):
    model = home_banner
    template_name = 'content_management/home_banner_details.html'
    context_object_name = 'banner'


#Footer Description
# List View (READ - all descriptions)
class FooterDescriptionListView(ListView):
    model = footer_description
    template_name = 'content_management/footer_description.html'
    context_object_name = 'descriptions'


# Update View (EDIT - update description)
class FooterDescriptionUpdateView(UpdateView):
    model = footer_description
    fields = ['title', 'description']
    template_name = 'content_management/footer_description_form.html'
    success_url = reverse_lazy('footer-description-list')


# Detail View (VIEW - description details)
class FooterDescriptionDetailView(DetailView):
    model = footer_description
    template_name = 'content_management/footer_description_details.html'
    context_object_name = 'description'



# About us FAQ

# List View (READ - all FAQs)
class ContactUsFAQListView(ListView):
    model = contactus_faq
    template_name = 'content_management/contact_us_faq.html'
    context_object_name = 'faqs'


# Create View (CREATE)
class ContactUsFAQCreateView(CreateView):
    model = contactus_faq
    fields = ['title', 'description']
    template_name = 'content_management/contact_us_faq_form.html'
    success_url = reverse_lazy('contactus-faq-list')


# Update View (EDIT - update FAQ)
class ContactUsFAQUpdateView(UpdateView):
    model = contactus_faq
    fields = ['title', 'description']
    template_name = 'content_management/contact_us_faq_form.html'
    success_url = reverse_lazy('contactus-faq-list')


# Detail View (VIEW - FAQ details)
class ContactUsFAQDetailView(DetailView):
    model = contactus_faq
    template_name = 'content_management/contactus_faq_detail.html'
    context_object_name = 'faq'


# Delete View (DELETE - delete FAQ)
class ContactUsFAQDeleteView(DeleteView):
    model = contactus_faq
    success_url = reverse_lazy('contactus-faq-list')

    # Skip confirmation page
    def get(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)
    

#LOGO
    
# List View (READ - all logos)
class LogoMainListView(ListView):
    model = logo_main
    template_name = 'content_management/main_logo.html'
    context_object_name = 'logos'


# Update View (EDIT - update logo)
class LogoMainUpdateView(UpdateView):
    model = logo_main
    fields = ['title', 'logo']
    template_name = 'content_management/main_logo_form.html'
    success_url = reverse_lazy('logo-main-list')


# Detail View (VIEW - logo details)
class LogoMainDetailView(DetailView):
    model = logo_main
    template_name = 'content_management/main_logo_details.html'
    context_object_name = 'logo'


# List View (READ - all contact forms)
class ContactUsFormListView(ListView):
    model = contactus_form
    template_name = 'content_management/contact_us.html'
    context_object_name = 'forms'



# Detail View (VIEW - contact form details)
class ContactUsFormDetailView(DetailView):
    model = contactus_form
    template_name = 'content_management/contact_us_details.html'
    context_object_name = 'form'


# Delete View (DELETE - delete contact form)
class ContactUsFormDeleteView(DeleteView):
    model = contactus_form
    success_url = reverse_lazy('contactus-form-list')

    # Skip confirmation page
    def get(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)