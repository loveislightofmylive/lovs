var header; // Déclaration de la variable header à l'extérieur de la fonction

function toggleMenu() {
    var menu = document.querySelector('.menu');
    var menuToggle = document.querySelector('.menu-toggle');

    if (menu.style.left === '0px' || menu.style.left === '') {
        // Si le menu est ouvert, fermez-le en le déplaçant à gauche
        menu.style.left = '-200px';
    } else {
        // Sinon, ouvrez le menu en le déplaçant à droite
        menu.style.left = '0';
    }
}

document.addEventListener('click', function (event) {
    var menu = document.querySelector('.menu');
    var settingsPopup = document.getElementById('settingsPopup');

    if (
        event.target !== menuToggle &&
        event.target !== searchToggle &&
        event.target !== settingsToggle &&
        !menu.contains(event.target) &&
        !settingsPopup.contains(event.target)
    ) {
        // Fermer le menu si le clic est en dehors de la zone du menu
        menu.style.left = '-200px';
        // Fermer les réglages si le clic est en dehors de la zone des réglages
        settingsPopup.style.display = 'none';
    }
});


document.addEventListener('DOMContentLoaded', function () {
    var menuToggle = document.querySelector('.menu-toggle');
    header = document.querySelector('header'); // Assignation de la variable header

    document.addEventListener('click', function (event) {
        var menu = document.querySelector('.menu');

        if (event.target !== menu && event.target !== menuToggle && !menu.contains(event.target)) {
            // Fermer le menu si le clic est en dehors de la zone du menu
            menu.style.left = '-200px';
        }
    });

    document.addEventListener('scroll', function () {
        var scrollPosition = window.scrollY || document.documentElement.scrollTop;

        // Ajouter une bulle de couleur à la classe .menu-toggle dès que l'on commence à défiler vers le bas
        if (scrollPosition > 0) {
            menuToggle.classList.add('bubble-bg');
        } else {
            menuToggle.classList.remove('bubble-bg');
        }
    });

    // ...
});

// ... (autres fonctions existantes)

// Fonction pour ouvrir/fermer le champ de recherche
function toggleSearch() {
    var searchInput = document.getElementById('searchInput');
    var searchButton = document.getElementById('searchButton');

    searchInput.style.display = searchInput.style.display === 'none' ? 'block' : 'none';
    searchButton.style.display = searchButton.style.display === 'none' ? 'block' : 'none';

    // Réinitialiser la recherche lorsque le champ est fermé
    if (searchInput.style.display === 'none') {
        resetSearch();
    }
}

// Fonction pour réinitialiser la recherche
function resetSearch() {
    var searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    searchInput.classList.remove('search-error');
}

// Fonction de recherche de terme sur toute la page
function searchTerm() {
    var searchInput = document.getElementById('searchInput');
    var searchTerm = searchInput.value.toLowerCase();
    var pageContent = document.body.textContent.toLowerCase();

    var matches = pageContent.match(new RegExp('\\b' + searchTerm + '\\b', 'gi'));

    if (matches) {
        // Si des correspondances sont trouvées, surligner le mot recherché
        resetSearch();
        matches.forEach(function (match) {
            document.querySelectorAll('.highlight').forEach(function (element) {
                element.classList.remove('highlight');
            });

            var walker = document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );

            while (walker.nextNode()) {
                var node = walker.currentNode;
                var parentNode = node.parentNode;

                if (new RegExp('(?<=\\b)' + match + '(?=\\b)', 'gi').test(node.nodeValue)) {
                    var span = document.createElement('span');
                    span.className = 'highlight';
                    span.textContent = node.nodeValue.replace(new RegExp('(?<=\\b)' + match + '(?=\\b)', 'gi'), match);
                    parentNode.replaceChild(span, node);
                }
            }
        });

        // Faire défiler jusqu'au premier élément surligné
        var highlightedElement = document.querySelector('.highlight');
        if (highlightedElement) {
            highlightedElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });

            // Réinitialiser le surlignage après 10 secondes
            setTimeout(function () {
                resetHighlight();
            }, 10000);
        }
    } else {
        // Si aucun résultat n'est trouvé, afficher une erreur
        searchInput.classList.add('search-error');

        // Réinitialiser le style après quelques secondes
        setTimeout(function () {
            searchInput.classList.remove('search-error');
        }, 2000);
    }
}

// Fonction pour gérer l'appui sur la touche "Entrée"
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        searchTerm();
    }
}

// Fonction pour réinitialiser le surlignage
function resetHighlight() {
    var highlightedElements = document.querySelectorAll('.highlight');
    highlightedElements.forEach(function (element) {
        element.classList.remove('highlight');
    });
}

// ... (autres fonctions JavaScript) ...

function toggleSettingsPopup() {
    var settingsPopup = document.getElementById('settingsPopup');
    settingsPopup.style.display = settingsPopup.style.display === 'none' ? 'block' : 'none';
}


// Ajoutez un gestionnaire d'événements pour appliquer la classe lorsque le bouton de réglages est survolé
document.addEventListener('scroll', function () {
        var scrollPosition = window.scrollY || document.documentElement.scrollTop;

        // Ajouter une bulle de couleur à la classe .menu-toggle dès que l'on commence à défiler vers le bas
        if (scrollPosition > 0) {
            settingsButton.classList.add('bubble-bgb');
        } else {
            settingsButton.classList.remove('bubble-bgb');
        }
    });

function applySettings() {
    var contentContainer = document.querySelector('.content-container');
    var opacityFilterCheckbox = document.getElementById('opacityFilter');
    var removeBackgroundCheckbox = document.getElementById('removeBackground');
    var backgroundTypeRadio = document.querySelector('input[name="backgroundType"]:checked');
    var resetBackgroundCheckbox = document.getElementById('resetBackground');
    var textColorRadio = document.querySelector('input[name="textColor"]:checked');

    // Réinitialiser les styles avant d'appliquer de nouveaux réglages
    contentContainer.style.backgroundColor = '';
    contentContainer.style.backgroundImage = '';
    document.body.style.color = '';

    // Appliquer les réglages en fonction des choix de l'utilisateur
    if (opacityFilterCheckbox.checked) {
        // Supprimer le filtre d'opacité
        contentContainer.style.backgroundColor = 'rgba(255, 255, 255, 0)';
    }

    if (removeBackgroundCheckbox.checked) {
        // Supprimer le fond d'écran
        contentContainer.style.backgroundImage = 'none';
    }

if (backgroundTypeRadio) {
    // Choisir le fond en fonction de la couleur sélectionnée
    var backgroundColor;

    switch (backgroundTypeRadio.value) {
        case 'blue':
            backgroundColor = '#3498db';
            break;
        case 'pink':
            backgroundColor = '#fad7e0';
            break;
        case 'green':
            backgroundColor = '#2ecc71';
            break;
        case 'purple':
            backgroundColor = '#9b59b6';
            break;
        // Ajoutez d'autres couleurs selon vos préférences
        default:
            backgroundColor = '#ffffff'; // Couleur par défaut
    }

    contentContainer.style.backgroundColor = backgroundColor;
}


    if (textColorRadio) {
        // Choisir la couleur du texte
        var textColor = textColorRadio.value;
        document.body.style.color = textColor;
    }

    // Fermer le pop-up de réglages
    toggleSettingsPopup();
}

