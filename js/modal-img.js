// Seleccionar el modal y la imagen del modal
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const portfolioGrid = document.querySelector('.portfolio-grid');
// Añadir evento de clic a todas las imágenes del portfolio
portfolioGrid.addEventListener('click', (e) => {
    let { target } = e;
    if (target.tagName == 'IMG') {
        modalImg.src = target.src;
        modal.style.display = 'flex';
    }
});

// Cerrar el modal al hacer clic fuera de la imagen
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});