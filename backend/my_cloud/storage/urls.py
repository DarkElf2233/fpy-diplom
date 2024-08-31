from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from storage import views

urlpatterns = [
    path('storage/', views.files_list),
    path('storage/<int:pk>', views.file_detail),

    path('users/', views.users_list),
    path('users/<int:pk>', views.user_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)
