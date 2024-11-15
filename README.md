Proyecto PDI
Este proyecto es una aplicación web para procesar imágenes, eliminar el fondo y permitir a los usuarios agregar sus imágenes procesadas a un collage interactivo. La aplicación utiliza Flask como backend, TensorFlow para modelos de detección y procesamiento de imágenes, y tecnologías frontend como HTML, CSS y JavaScript.

Características
Carga de imágenes desde el navegador.
Procesamiento de imágenes para eliminar el fondo (usando rembg).
Visualización de imágenes procesadas en un lienzo interactivo tipo collage.
Almacenamiento local de las posiciones de las imágenes en el collage.
Responsive para adaptarse a diferentes tamaños de pantalla.
Requisitos
Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes programas y bibliotecas:

Python 3.8 o superior (incluye pip).
Git (para clonar el repositorio, opcional).
Bibliotecas de Python necesarias (instaladas automáticamente desde requirements.txt).
Bibliotecas de Python
Las principales bibliotecas utilizadas son:

Flask
TensorFlow
rembg
PIL (Pillow)
NumPy
Instalación
Clonar el repositorio (opcional):

Si tienes Git instalado, puedes clonar este repositorio:

bash
Copiar código
git clone https://github.com/Esteesmelvin/ProyectoPDI.git
cd ProyectoPDI
Crear un entorno virtual (opcional):

Crear un entorno virtual es opcional, pero recomendado para evitar conflictos con otras bibliotecas instaladas globalmente.

bash
Copiar código
python -m venv venv
source venv/bin/activate    # En Linux/MacOS
venv\Scripts\activate       # En Windows
Instalar dependencias:

Ejecuta el siguiente comando para instalar las dependencias listadas en requirements.txt:

bash
Copiar código
pip install -r requirements.txt
Configurar el modelo de detección:

Asegúrate de que el archivo del modelo nsfw_mobilenet2.224x224.h5 esté ubicado en la raíz del proyecto o en la carpeta configurada en app.py.

Verificar rutas estáticas:

Asegúrate de que las carpetas static/processed_images y static/images existan. Si no, créalas manualmente:

bash
Copiar código
mkdir -p static/processed_images static/images
También verifica que el archivo de fondo (album.jpg o similar) esté ubicado en static/images.

Ejecución
Inicia la aplicación Flask:

bash
Copiar código
python app.py
Esto ejecutará el servidor en modo de desarrollo y estará disponible en http://127.0.0.1:5000.

Accede a la aplicación:

Abre un navegador y dirígete a:

arduino
Copiar código
http://127.0.0.1:5000
Subir imágenes:

Sube una imagen utilizando el botón Cargar imagen.
Procesa la imagen para eliminar el fondo y agrégala al collage interactivo.
Revisar el collage:

Después de procesar una imagen, haz clic en Avanzar para ver el collage con todas las imágenes procesadas.

Despliegue en Producción
Para desplegar el proyecto en un servidor de producción, se recomienda utilizar un servidor WSGI como Gunicorn o uWSGI. Por ejemplo:

bash
Copiar código
pip install gunicorn
gunicorn -w 4 app:app
Uso con ngrok (opcional)
Si deseas compartir tu aplicación en una red restringida, puedes usar ngrok:

Instala ngrok y ejecuta el siguiente comando:

bash
Copiar código
ngrok http 5000
Obtén el enlace público proporcionado por ngrok y compártelo con otros usuarios.

Estructura del Proyecto
php
Copiar código
ProyectoPDI/
├── app.py                    # Archivo principal de la aplicación
├── requirements.txt          # Dependencias del proyecto
├── static/
│   ├── css/                  # Archivos CSS
│   │   └── styles.css
│   ├── images/               # Imágenes estáticas (e.g., fondo del collage)
│   │   └── album.jpg
│   ├── js/                   # Archivos JavaScript
│   │   └── script.js
│   └── processed_images/     # Imágenes procesadas por los usuarios
├── templates/
│   ├── index.html            # Página de inicio
│   └── collage.html          # Página del collage
└── nsfw_mobilenet2.224x224.h5 # Modelo preentrenado
Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir, por favor:

Realiza un fork del repositorio.
Crea una nueva rama para tus cambios:
bash
Copiar código
git checkout -b feature-nueva-funcion
Envía un pull request.
