document.addEventListener('DOMContentLoaded', function () {
    // Cargar el archivo JSON
    fetch('data/porfolio.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo JSON');
            }
            return response.json();
        })
        .then(projects => {
            const portfolioContainer = document.getElementById('portfolio-container');

            // Recorrer cada proyecto y crear su HTML
            projects.forEach(each => {
                const rawHTML = `
            <div class="portfolio-item">
              <img src="${each.image}" alt="${each.title}">
              <div>
                <h3>${each.title}</h3>
                <p>${each.description}</p>
                <div class="technologies"><strong>Tecnologias</strong>: [
                    ${each.technologies.map(tech => `<span>${tech}</span>`).join(', ')}
                    ]
                </div>
                <a href="${each.link}" target="_blank">
                  <i class="fab fa-github"></i> Ver en GitHub
                </a>
              </div>
            </div>
          `;
                portfolioContainer.innerHTML += rawHTML;
            });
        })
        .catch(error => {
            console.error('Error al cargar el portfolio:', error);
            // Opcional: Mostrar un mensaje de error en el HTML
            document.getElementById('portfolio-container').innerHTML =
                '<p>No se pudo cargar el portfolio. Inténtalo más tarde.</p>';
        });
});
