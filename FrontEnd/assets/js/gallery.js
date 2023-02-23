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



function connectedUser() {
  const token = localStorage.getItem('token');
  const btnModifier = document.getElementById('modifier');
  const fontBtn = document.querySelector('.fa-solid')
  if (token) {
    const login = document.querySelector('.login');  
    const logout = document.querySelector('.logout');
    const filtersDiv = document.querySelector('.filters');
    filtersDiv.style.display = 'none';
    login.style.display = 'none';
    logout.style.display = 'block';
    btnModifier.style.display = 'block';
    fontBtn.style.display = 'block';

    console.log(token);

    // Ajouter les éléments d'édition si l'utilisateur est connecté
    const blackHeadbandElement = document.createElement("div");
    blackHeadbandElement.classList.add("admin-headband");

    const editionModeElement = document.createElement("div");
    editionModeElement.classList.add("edition-mode");
    editionModeElement.innerHTML = `<i class="fa-solid fa-pen-to-square"></i><span>Mode édition</span>`;

    const publishEditElement = document.createElement("button");
    publishEditElement.innerHTML = "publier les changements";

    blackHeadbandElement.appendChild(editionModeElement);
    blackHeadbandElement.appendChild(publishEditElement);

    const bodyElement = document.getElementsByTagName("body");
    bodyElement[0].prepend(blackHeadbandElement);

  } else {
    btnModifier.style.display = 'none';
    fontBtn.style.display = 'none';
  }
}

connectedUser();


function logout() {
  const logout = document.querySelector('.logout');
  logout.addEventListener('click', function() {
    localStorage.clear();
    window.location.href = "./index.html";
  });
}
logout();


// Récupération des éléments nécessaires
const modifier = document.getElementById("modifier");
const modal = document.getElementById("modal");
const close = document.getElementsByClassName("close")[0];

// Fonction pour afficher la fenêtre modale
function openModal() {
  modal.style.display = "block";
}

// Fonction pour masquer la fenêtre modale
function closeModal() {
  modal.style.display = "none";
}

// Gestionnaire d'événements pour afficher la fenêtre modale
modifier.addEventListener("click", function(event) {
  event.preventDefault();
  openModal();
});

// Gestionnaire d'événements pour masquer la fenêtre modale lorsqu'on clique sur le bouton "x"
close.addEventListener("click", function(event) {
  event.preventDefault();
  closeModal();
});

// Gestionnaire d'événements pour masquer la fenêtre modale lorsqu'on clique en dehors de la zone modale
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    closeModal();
  }
});

// NOUVEAU CODE TESTS

fetch('http://localhost:5678/api/works')
.then(response => response.json()) // On convertit la réponse en JSON
.then(data => {
  // On crée un tableau pour stocker les images
  const images = [];

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

    // On ajoute l'image au tableau
    images.push(img);

    // On crée la légende
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = item.title;

    // On ajoute l'image et la légende à la figure
    figure.appendChild(img);
    figure.appendChild(figcaption);
  }

  // On écoute l'événement clic sur le bouton "Modifier"
  modifier.addEventListener("click", function(event) {
    event.preventDefault();
    displayGalleryImages(images);
    openModal();
  });
});

function displayGalleryImages(images) {
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = '';

  images.forEach(image => {
    // Ajouter une classe à chaque image
    image.classList.add('modal-image');

    // Ajouter un événement clic à chaque image
    image.addEventListener('click', () => {
      const modalImg = document.createElement('img');
      modalImg.src = image.src;
      modalImg.classList.add('modal-content');
      const modal = document.getElementById('modal');
      modal.style.display = 'block';
      modal.appendChild(modalImg);
    });

    modalBody.appendChild(image);
  });
}
