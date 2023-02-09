fetch('http://localhost:5678/api/works')
.then(response => response.json()) // On convertit la réponse en JSON
.then(data => {
  // On boucle sur les données
  for (const item of data) {
    // On crée une nouvelle figure
    const figure = document.createElement('figure');
    
    // On crée l'image
    const img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = item.title;
    img.names = item.category.name;
    console.log(img.names);
    img.setAttribute("crossorigin", "anonymous"); // Ajout du tag "crossorigin"
    
    
    // On crée la légende
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = item.title;
    
    // On ajoute l'image et la légende à la figure
    figure.appendChild(img);
    figure.appendChild(figcaption);
    
    // On ajoute la figure au conteneur "gallery"
    document.querySelector('.gallery').appendChild(figure);
  }

  // Ajout du filtrage
  const allFilter = document.querySelector('.all_filter');
  const objectFilter = document.querySelector('.object_filter');
  const apartmentFilter = document.querySelector('.apartment_filter');
  const hotelRestaurantFilter = document.querySelector('.hotel_restaurant_filter');

  allFilter.addEventListener('click', function() {
    const figures = document.querySelectorAll('figure');
    for (const figure of figures) {
      figure.style.display = 'block';
    }
  });

  objectFilter.addEventListener('click', function() {
    const figures = document.querySelectorAll('figure');
    for (const figure of figures) {
      if (figure.querySelector('img').names === 'Objets') {
        figure.style.display = 'block';
      } else {
        figure.style.display = 'none';
      }
    }
  });

  apartmentFilter.addEventListener('click', function() {
    const figures = document.querySelectorAll('figure');
    for (const figure of figures) {
      if (figure.querySelector('img').names === 'Appartements') {
        figure.style.display = 'block';
      } else {
        figure.style.display = 'none';
      }
    }
  });

  hotelRestaurantFilter.addEventListener('click', function() {
    const figures = document.querySelectorAll('figure');
    for (const figure of figures) {
      if (figure.querySelector('img').names === 'Hotels & restaurants') {
        figure.style.display = 'block';
      } else {
        figure.style.display = 'none';
      }
    }
  });
});
