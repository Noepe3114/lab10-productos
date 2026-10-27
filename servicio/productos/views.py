from django.http import JsonResponse

def listar_productos(request):
    productos = [
        {"codigo": 1, "descripcion": "Coca cola", "precio": 2.33},
        {"codigo": 2, "descripcion": "Fanta", "precio": 1.7},
    ]
    return JsonResponse(productos, safe=False)