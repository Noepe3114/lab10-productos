from django.contrib import admin
from django.urls import path
from productos.views import listar_productos

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/producto/', listar_productos),
]