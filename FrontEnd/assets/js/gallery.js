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
    // Créer le conteneur de l'image et de l'icône de suppression
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    // Créer l'élément image
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    img.classList.add('modal-image');
    img.setAttribute("crossorigin", "anonymous"); // Ajout du tag "crossorigin"

    // Ajouter l'élément image au conteneur
    imageContainer.appendChild(img);

    // Ajouter le texte "éditer" en bas de chaque image
    const editSpan = document.createElement('span');
    editSpan.textContent = 'éditer';
    imageContainer.appendChild(editSpan);

    // Créer l'icône de suppression
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-trash-can', 'delete-icon');

    // Ajouter l'icône de suppression au conteneur
    imageContainer.appendChild(deleteIcon);

    // Ajouter le conteneur d'image au corps de la modale
    modalBody.appendChild(imageContainer);

    deleteIcon.addEventListener('click', function() {
      // Récupération de l'index de l'image dans le tableau
      const index = images.indexOf(image);

      // Suppression de l'image de la galerie
      images.splice(index, 1);

      // Suppression de l'élément de la modale
      const parent = deleteIcon.parentElement;
      parent.remove();

      // Suppression de l'image depuis l'API
      fetch(`http://localhost:5678/api/works/${image.id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          console.log('Image supprimée avec succès');
        } else {
          console.log('Une erreur est survenue');
        }
      })
      .catch(error => {
        console.error('Une erreur est survenue', error);
      });
    });
  });
}
