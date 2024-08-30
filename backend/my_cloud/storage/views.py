from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets

from my_cloud.storage.serializers import FileSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class FileViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all().order_by('created')
    serializer_class = FileSerializer
    permission_classes = [permissions.IsAuthenticated]