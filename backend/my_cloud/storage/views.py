from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from storage.models import Users, Files
from storage.serializers import FilesSerializer, UsersSerializer


### Users ###

@api_view(['GET', 'POST'])
def users_list(request, format=None):
    """
    List all users, or create a new user.
    """
    if request.method == 'GET':
        users = Users.objects.all()
        serializer = UsersSerializer(users, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, pk, format=None):
    """
    Retrieve, update or delete a user.
    """
    try:
        user = Users.objects.get(pk=pk)
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UsersSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UsersSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


### Files ###

@api_view(['GET', 'POST'])
def files_list(request, format=None):
    """
    List all files, or create a new file.
    """
    if request.method == 'GET':
        files = Files.objects.all()
        serializer = FilesSerializer(files, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = FilesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def file_detail(request, pk, format=None):
    """
    Retrieve, update or delete a file.
    """
    try:
        file = Files.objects.get(pk=pk)
    except Files.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = FilesSerializer(file)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = FilesSerializer(file, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        file.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
