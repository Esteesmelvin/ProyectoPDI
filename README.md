
# Proyecto PDI

Este proyecto es una aplicación web que permite a los usuarios procesar imágenes, eliminar el fondo y agregarlas a un collage interactivo.

## Características

- Subida de imágenes desde el navegador.
- Eliminación automática del fondo usando `rembg`.
- Collage interactivo donde las imágenes procesadas se posicionan automáticamente.
- Almacenamiento local para guardar la configuración del collage.
- Diseño responsive para adaptarse a dispositivos móviles y de escritorio.

## Requisitos

1. **Python 3.8 o superior**.
2. **Git** (opcional, para clonar el repositorio).
3. Dependencias Python especificadas en `requirements.txt`.

### Dependencias Python

- `Flask`
- `TensorFlow`
- `rembg`
- `Pillow`
- `NumPy`

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Esteesmelvin/ProyectoPDI.git
cd ProyectoPDI
```

### 2. Crear un entorno virtual (opcional)

```bash
python -m venv venv
source venv/bin/activate    # Linux/MacOS
venv\Scripts\activate       # Windows
```

### 3. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 4. Verificar rutas estáticas

Asegúrate de que las carpetas `static/processed_images` y `static/images` existan:

```bash
mkdir -p static/processed_images static/images
```

Copia tu imagen de fondo en `static/images/` (e.g., `album.jpg`).

## Ejecución

1. Ejecuta la aplicación:

   ```bash
   python app.py
   ```

2. Accede en el navegador a:

   ```
   http://127.0.0.1:5000
   ```

## Uso

1. Sube una imagen desde la página principal.
2. Procesa la imagen y agrégala al collage interactivo.
3. Haz clic en `Avanzar` para ver el collage con las imágenes procesadas.

## Estructura del Proyecto

```plaintext
ProyectoPDI/
├── app.py                    # Código backend principal
├── requirements.txt          # Dependencias
├── static/
│   ├── css/                  # Archivos CSS
│   │   └── styles.css
│   ├── images/               # Imágenes (fondo del collage)
│   │   └── album.jpg
│   ├── js/                   # Archivos JS
│   │   └── script.js
│   └── processed_images/     # Imágenes procesadas
├── templates/
│   ├── index.html            # Página principal
│   └── collage.html          # Página del collage
└── nsfw_mobilenet2.224x224.h5 # Modelo preentrenado
```

## Despliegue en Producción

Usa Gunicorn para producción:

```bash
pip install gunicorn
gunicorn -w 4 app:app
```

### Despliegue con ngrok

1. Instala ngrok.
2. Ejecuta:

   ```bash
   ngrok http 5000
   ```

3. Copia la URL proporcionada por `ngrok` y compártela.

## Licencia

Proyecto bajo la licencia [MIT](https://opensource.org/licenses/MIT).
