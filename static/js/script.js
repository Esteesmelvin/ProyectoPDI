let selectedFile;

function uploadImage(event) {
    selectedFile = event.target.files[0];
    const imagePreview = document.getElementById("preview");
    const processButton = document.getElementById("processButton");

    imagePreview.src = URL.createObjectURL(selectedFile);
    imagePreview.style.display = "block";
    processButton.style.display = "inline-block";
}

function removeBackground() {
    if (!selectedFile) {
        alert("Por favor, selecciona una imagen primero.");
        return;
    }

    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.style.display = "flex";
    const processButton = document.getElementById("processButton");
    processButton.style.display = "none";

    const formData = new FormData();
    formData.append("image", selectedFile);

    fetch('/remove-bg', {
        method: 'POST',
        body: formData
    })
    .then(async response => {
        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.error);
            loadingScreen.style.display = "none";
            processButton.style.display = "inline-block";
            return;
        }

        const blob = await response.blob();
        loadingScreen.style.display = "none";
        const imagePreview = document.getElementById("preview");
        imagePreview.src = URL.createObjectURL(blob);
        imagePreview.style.display = "block";  // Asegurarse de que la imagen procesada se muestre
        document.getElementById("postProcessButtons").style.display = "flex";
    })
    .catch(error => {
        console.error('Error al eliminar el fondo:', error);
        alert("Hubo un error al procesar la imagen.");
        loadingScreen.style.display = "none";
        processButton.style.display = "inline-block";
    });
}

function retryImage() {
    const imagePreview = document.getElementById("preview");
    const processButton = document.getElementById("processButton");
    const postProcessButtons = document.getElementById("postProcessButtons");

    imagePreview.src = "";
    imagePreview.style.display = "none";
    postProcessButtons.style.display = "none";

    document.getElementById("imageUpload").value = "";
    processButton.style.display = "none";
}

function advance() {
    window.location.href = '/collage';
}
