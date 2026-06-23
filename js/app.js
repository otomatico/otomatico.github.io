/**
 * Carga un archivo JSON y renderiza su contenido en un contenedor.
 * @param {string} jsonUrl - URL del archivo JSON (ej: 'data/portfolio.json').
 * @param {string} containerId - ID del contenedor HTML donde se renderizará el contenido.
 * @param {function} renderItem - Función que define cómo renderizar cada elemento del JSON.
 */
/*
function loadJSONAndRender(jsonUrl, containerId, renderItem) {
    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`No se pudo cargar el archivo ${jsonUrl}`);
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById(containerId);
            if (!container) {
                throw new Error(`No se encontró el contenedor con ID: ${containerId}`);
            }

            // Limpiar el contenedor antes de renderizar
            container.innerHTML = '';

            // Renderizar cada elemento del JSON
            data.forEach(item => {
                container.innerHTML += renderItem(item);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById(containerId).innerHTML =
                `<p class="error-message">Error al cargar los datos: ${error.message}</p>`;
        });
}
*/
function loadJSONAndRender(jsonUrl, containerId, renderItem, isAccordion = false) {
    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`No se pudo cargar el archivo ${jsonUrl}`);
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById(containerId);
            if (!container) {
                throw new Error(`No se encontró el contenedor con ID: ${containerId}`);
            }

            container.innerHTML = '';

            // Renderizar cada elemento
            data.forEach((item, index) => {
                container.innerHTML += renderItem(item, index);
            });

            // Si es un acordeón, añadir el botón y la lógica
            if (isAccordion && data.length > 3) {
                container.innerHTML += `
                    <button id="toggle" class="accordion-button">
                        <span class="button-text">Ver más</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                `;

                // Lógica para el botón
                const toggleButton = container.querySelector('#toggle');
                //const hiddenExperiences = container.querySelectorAll('.hidden');
                const buttonText = toggleButton.querySelector('.button-text');
                const icon = toggleButton.querySelector('i');

                toggleButton.addEventListener('click', () => {
                    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
                    const hiddenExperiences = container.querySelectorAll('div+div+div+div');
                    hiddenExperiences.forEach(el => {
                        //el.style.display = isExpanded ? 'none' : 'block';
                        el.classList.toggle("hidden")
                    });

                    toggleButton.setAttribute('aria-expanded', !isExpanded);
                    buttonText.textContent = isExpanded ? 'Ver más' : 'Ver menos';
                    icon.classList.toggle('fa-chevron-down');
                    icon.classList.toggle('fa-chevron-up');
                });

                // Ocultar elementos inicialmente
                //hiddenExperiences.forEach(el => {
                //    el.style.display = 'none';
                //});
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById(containerId).innerHTML =
                `<p class="error-message">Error al cargar los datos: ${error.message}</p>`;
        });
}

function renderPortfolioItem(project,index) {
    const isHidden = index >= 3;
    return `
        <div class="portfolio-item ${isHidden ? 'hidden' : ''}">
            <img src="${project.image}" alt="${project.title}">
            <div>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="technologies">
                    <strong>Tecnologías:</strong>
                    [${project.technologies.map(tech => `<span>${tech}</span>`).join(', ')}]
                </div>
                <a href="${project.link}" target="_blank">
                    <i class="fab fa-github"></i> Ver en GitHub
                </a>
            </div>
        </div>
    `;
}
function renderExperienceItem(job, index) {
    const isHidden = index >= 3; // Ocultar elementos a partir del índice 3
    return `
        <div class="job ${isHidden ? 'hidden' : ''}">
            <h3>${job.title} | ${job.company}</h3>
            <p>${job.period}</p>
            <ul>
                ${job.responsibilities.map(res => `<li>${res}</li>`).join('')}
            </ul>
        </div>
    `;
}

function renderSkillItem(skill) {
    return `
        <div class="skill">
            <i class="${skill.icon}"></i> ${skill.name}
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    // Cargar portfolio
    loadJSONAndRender(
        'data/portfolio.json',
        'portfolio-container',
        renderPortfolioItem,
        true
    );

    // Cargar experiencia (si tienes un JSON para experiencia)
    loadJSONAndRender(
        'data/experience.json',
        'experience-container',
        renderExperienceItem,
        true
    );

    // Cargar habilidades (si tienes un JSON para habilidades)
    loadJSONAndRender(
        'data/skills.json',
        'skills-container',
        renderSkillItem
    );
});