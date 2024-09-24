from django.contrib.auth.decorators import user_passes_test

def check_role(role):
    def decorator(user):
        return user.role == role
    return user_passes_test(decorator)
