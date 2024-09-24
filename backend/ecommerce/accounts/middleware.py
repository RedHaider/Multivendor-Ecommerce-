from django.shortcuts import redirect

class RoleBasedRedirectMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if request.user.is_authenticated and request.path == '/accounts/login/':  # Adjust login path
            if request.user.role == 'admin':
                return redirect('admin_dashboard')
            elif request.user.role == 'vendor':
                return redirect('vendor_dashboard')
            elif request.user.role == 'customer':
                return redirect('customer_dashboard')
        return response
