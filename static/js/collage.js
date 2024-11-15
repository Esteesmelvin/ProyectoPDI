function logToServer(message) {
    fetch('/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    }).catch(error => console.error("Error al enviar log al servidor:", error));
}

window.onload = function () {
    const canvas = document.getElementById("collageCanvas");
    const ctx = canvas.getContext("2d");
    const images = document.querySelectorAll("#imageContainer img");
    let imageData = []; // Arreglo para almacenar datos de las imágenes

    logToServer("Inicializando el collage...");

    // Cargar datos de posiciones de `localStorage`
    const savedImageData = JSON.parse(localStorage.getItem("collageImageData") || "[]");

    // Cargar la imagen de fondo
    const background = new Image();
    background.src = canvas.getAttribute("data-background-src");
    background.onload = function () {
        logToServer("Imagen de fondo cargada exitosamente.");
        resizeCanvas();
        drawBackground();
        drawCollage();
    };
    background.onerror = function () {
        logToServer("Error al cargar la imagen de fondo.");
    };

    // Función para dibujar el fondo en el canvas
    function drawBackground() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        logToServer("Fondo dibujado en el canvas.");
    }

    // Función para verificar si dos rectángulos se solapan
    function isOverlapping(x, y, width, height) {
        for (const data of imageData) {
            const imgWidth = data.width * data.scale;
            const imgHeight = data.height * data.scale;
            if (
                x < data.x + imgWidth &&
                x + width > data.x &&
                y < data.y + imgHeight &&
                y + height > data.y
            ) {
                return true; // Hay superposición
            }
        }
        return false;
    }

    // Función para verificar si la imagen existe en el servidor
    function imageExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    // Verificar y actualizar `localStorage` con imágenes existentes
    async function filterExistingImages() {
        const updatedImageData = [];
        for (const data of savedImageData) {
            const exists = await imageExists(data.src);
            if (exists) {
                updatedImageData.push(data); // Mantener la imagen si existe
            }
        }
        return updatedImageData;
    }

    filterExistingImages().then(existingImageData => {
        if (existingImageData.length < images.length) {
            logToServer("Se detectaron nuevas imágenes. Actualizando collage...");

            images.forEach((img, index) => {
                if (!existingImageData[index]) {
                    let randomScale = (Math.random() * 0.15) + 0.2;
                    let randomRotation = Math.random() * Math.PI / 8 - Math.PI / 16;
                    let scaledWidth = img.width * randomScale;
                    let scaledHeight = img.height * randomScale;
                    let randomX, randomY;

                    do {
                        randomX = Math.random() * (canvas.width - scaledWidth);
                        randomY = Math.random() * (canvas.height - scaledHeight);
                    } while (isOverlapping(randomX, randomY, scaledWidth, scaledHeight));

                    existingImageData.push({
                        src: img.src,
                        x: randomX,
                        y: randomY,
                        scale: randomScale,
                        rotation: randomRotation,
                        width: img.width,
                        height: img.height
                    });
                }
            });

            localStorage.setItem("collageImageData", JSON.stringify(existingImageData));
        }

        imageData = existingImageData;
        drawCollage();
    });

    // Función para redimensionar el canvas de forma responsiva manteniendo 1080x1080
    function resizeCanvas() {
        const containerWidth = Math.min(window.innerWidth * 0.9, 1080);
        canvas.style.width = `${containerWidth}px`;
        canvas.style.height = `${containerWidth}px`;

        canvas.width = 1080;
        canvas.height = 1080;

        drawCollage();
    }

    function drawCollage() {
        drawBackground();
        imageData.forEach(data => {
            drawStoredImage(ctx, data);
        });
    }

    function drawStoredImage(ctx, data) {
        const img = new Image();
        img.src = data.src;

        img.onload = function () {
            ctx.save();
            ctx.translate(data.x + (img.width * data.scale) / 2, data.y + (img.height * data.scale) / 2);
            ctx.rotate(data.rotation);
            ctx.scale(data.scale, data.scale);
            ctx.drawImage(img, -img.width / 2, -img.height / 2);
            ctx.restore();
        };

        img.onerror = function () {
            logToServer(`Error al cargar la imagen procesada: ${data.src}`);
        };
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
};
