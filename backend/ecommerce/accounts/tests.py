from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class AccountTests(APITestCase):
    
    def test_register_user(self):
        """
        Ensure we can register a new user.
        """
        url = reverse('register')  # The name of your registration URL
        data = {
            'email': 'newuser@example.com',
            'password': 'newpassword123',
            'first_name': 'Jane',
            'last_name': 'Doe',
            'phone': '0987654321',
            'address': '456 Elm Street'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Verify the user was created
        user = User.objects.get(email='newuser@example.com')
        self.assertEqual(user.first_name, 'Jane')
        self.assertEqual(user.role, 'customer')  # Ensure role is set to 'customer'

    def test_register_user_missing_fields(self):
        """
        Ensure registration fails when required fields are missing.
        """
        url = reverse('register')
        data = {
            'email': 'newuser@example.com',  # Missing some required fields
            'password': 'newpassword123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_user(self):
        """
        Ensure we can log in a user with correct credentials.
        """
        # First, create a user to test login
        user = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpassword123',
            first_name='John',
            last_name='Doe',
            phone='1234567890',
            address='123 Main Street',
            role='customer'
        )
        
        url = reverse('login')  # The name of your login URL
        data = {
            'email': 'testuser@example.com',
            'password': 'testpassword123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)  # JWT access token
        self.assertIn('refresh', response.data)  # JWT refresh token
        self.assertIn('role', response.data)
        self.assertEqual(response.data['role'], 'customer')

    def test_login_user_invalid_credentials(self):
        """
        Ensure login fails with incorrect credentials.
        """
        # First, create a user to test invalid login
        User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpassword123',
            first_name='John',
            last_name='Doe',
            phone='1234567890',
            address='123 Main Street',
            role='customer'
        )

        url = reverse('login')  # The name of your login URL
        data = {
            'email': 'testuser@example.com',
            'password': 'wrongpassword'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Invalid credentials')

    def test_login_user_not_customer_role(self):
        """
        Ensure login fails if the user is not a customer.
        """
        # First, create a user with the 'admin' role
        User.objects.create_user(
            username='adminuser',
            email='adminuser@example.com',
            password='adminpassword123',
            first_name='Admin',
            last_name='User',
            phone='1234567890',
            address='Admin Street',
            role='admin'  # Non-customer role
        )

        url = reverse('login')  # The name of your login URL
        data = {
            'email': 'adminuser@example.com',
            'password': 'adminpassword123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'User is not a customer')
