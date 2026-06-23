// Lista de temas disponibles
const themes = [
    { value: "default", text: "Por defecto" },
    { value: "oldschool", text: "Old School" },
    { value: "neofuturista", text: "Neo-Futurista" },
    { value: "windows98", text: "Windows 98" }
];

// Función para cargar el CSS seleccionado
function loadCSS(theme) {
    const link = document.getElementById('theme-css');
    if (link) {
        link.href = `styles/${theme}.css`;
    }
    // Añade el atributo theme al body
    document.body.setAttribute('theme', theme);
    // Guarda la preferencia en localStorage
    localStorage.setItem('theme', theme);
}

// Función para inicializar el select con las opciones
function initSelect() {
    const select = document.getElementById('style-select');
    if (!select) return;

    // Limpia el select
    select.innerHTML = '';

    // Añade las opciones dinámicamente
    themes.forEach(theme => {
        const option = document.createElement('option');
        option.value = theme.value;
        option.textContent = theme.text;
        select.appendChild(option);
    });

    // Carga el tema guardado en localStorage (si existe)
    const savedTheme = localStorage.getItem('theme') || 'default';
    select.value = savedTheme;
    loadCSS(savedTheme);

    // Escucha cambios en el select
    select.addEventListener('change', function() {
        loadCSS(this.value);
    });
}

// Inicializa el select cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initSelect);