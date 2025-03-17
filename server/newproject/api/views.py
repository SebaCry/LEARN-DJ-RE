from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Kids
from .serializer import KidsSerializer

@api_view(['GET'])
def get_kids(request):
    kids = Kids.objects.all()
    serializedData = KidsSerializer(kids, many=True).data
    return Response(serializedData)

@api_view(['POST'])
def create_kids(request):
    data = request.data
    serializer = KidsSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def kid_detail(request, pk):
    try:
        kid = Kids.objects.get(pk=pk)
    except Kids.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'DELETE':
        kid.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        data = request.data
        serializer = KidsSerializer(kid, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
