from django.db import models
from accounts.models import User

class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ('order', 'Order'),
        ('review', 'Review'),
        ('message', 'Message'),
        ('alert', 'Alert'),
        ('other', 'Other'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    related_object_id = models.IntegerField(null=True, blank=True)
    notification_type = models.CharField(max_length=50, choices=NOTIFICATION_TYPES, default='other')

    def __str__(self):
        return f'Notification for {self.user.username} - {self.notification_type}'

    class Meta:
        ordering = ['-created_at']  # Order by most recent first

class VendorNotification(models.Model):
    NOTIFICATION_TYPES = [
        ('order', 'Order'),
        ('review', 'Review'),
        ('message', 'Message'),
        ('alert', 'Alert'),
        ('other', 'Other'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='vendor_notifications')
    title = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    related_object_id = models.IntegerField(null=True, blank=True)
    notification_type = models.CharField(max_length=50, choices=NOTIFICATION_TYPES, default='other')

    def __str__(self):
        return f'Notification for {self.user.username} - {self.notification_type}'

    class Meta:
        ordering = ['-created_at']  