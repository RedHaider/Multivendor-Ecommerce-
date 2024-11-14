from django.shortcuts import render, get_object_or_404, redirect
from .models import aboutus_dropdown, aboutus_ourteam, aboutus_mv
from .forms import AboutUsDropdownForm, AboutUsOurTeamForm, AboutUsMVForm


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
# List view
def aboutus_mv_list(request):
    mv_entries = aboutus_mv.objects.all()
    return render(request, 'content_management/aboutus_mv_list.html', {'mv_entries': mv_entries})

# Detail view
def aboutus_mv_detail(request, pk):
    mv_entry = get_object_or_404(aboutus_mv, id=pk)
    return render(request, 'content_management/aboutus_mv_detail.html', {'mv_entry': mv_entry})

# Edit view
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
