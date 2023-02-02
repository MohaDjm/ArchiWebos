// Référence aux éléments HTML
const filters = document.querySelectorAll('.btn_filters');
const figures = document.querySelectorAll('figure');

// Ajouter un écouteur d'événement "click" pour chaque filtre
filters.forEach(filter => {
  filter.addEventListener('click', e => {
    // Enlever la classe "active" des autres filtres
    filters.forEach(f => f.classList.remove('active'));
    // Ajouter la classe "active" au filtre sélectionné
    e.target.classList.add('active');
    // Récupérer le type de filtre sélectionné
    const filterType = e.target.textContent;
    // Filtrer les figures en fonction du type de filtre sélectionné
    figures.forEach(figure => {
      if (filterType === 'Tous') {
        figure.style.display = 'block';
      } else if (filterType === 'Objets' && figure.textContent.includes('Abajour')) {
        figure.style.display = 'block';
      } else if (filterType === 'Appartements' && figure.textContent.includes('Appartement')) {
        figure.style.display = 'block';
      } else if (filterType === 'Hôtel & restaurants' && (figure.textContent.includes('Restaurant') || figure.textContent.includes('Hotel'))) {
        figure.style.display = 'block';
      } else {
        figure.style.display = 'none';
      }
    });
  });
});
