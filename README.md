# Proyecto PDI

Este proyecto es una aplicación web para procesar imágenes, eliminar el fondo y permitir a los usuarios agregar sus imágenes procesadas a un collage interactivo. La aplicación utiliza Flask como backend, TensorFlow para modelos de detección y procesamiento de imágenes, y tecnologías frontend como HTML, CSS y JavaScript.

## Características

- Carga de imágenes desde el navegador.
- Procesamiento de imágenes para eliminar el fondo (usando `rembg`).
- Visualización de imágenes procesadas en un lienzo interactivo tipo collage.
- Almacenamiento local de las posiciones de las imágenes en el collage.
- Responsive para adaptarse a diferentes tamaños de pantalla.

## Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes programas y bibliotecas:

1. **Python 3.8 o superior** (incluye `pip`).
2. **Git** (para clonar el repositorio, opcional).
3. Bibliotecas de Python necesarias (instaladas automáticamente desde `requirements.txt`).

### Bibliotecas de Python

Las principales bibliotecas utilizadas son:
- Flask
- TensorFlow
- rembg
- PIL (Pillow)
- NumPy

## Instalación

1. **Clonar el repositorio (opcional):**

   Si tienes Git instalado, puedes clonar este repositorio:

   ```bash
   git clone https://github.com/Esteesmelvin/ProyectoPDI.git
   cd ProyectoPDI
