// Fonction pour masquer le pop-up d'erreur
function closeErrorPopup() {
    document.getElementById('errorPopup').style.display = 'none';
}

// Fonction d'authentification
function validateLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Base de données des utilisateurs Premium
    var premiumUsers = {
        'plop': 'plop',
        'mld': '150823'
        // Ajoutez d'autres utilisateurs si nécessaire
    };

    // Base de données des utilisateurs Classic
    var classicUsers = {
        'user3': 'password3',
        'user4': 'password4'
        // Ajoutez d'autres utilisateurs si nécessaire
    };

    // Vérifier si l'utilisateur appartient à la base de données Premium
    if (username in premiumUsers && password === premiumUsers[username]) {
        window.location.href = 'index.html';
    }
    // Vérifier si l'utilisateur appartient à la base de données Classic
    else if (username in classicUsers && password === classicUsers[username]) {
        window.location.href = 'index.html';
    }
    // Afficher un message d'erreur si l'authentification échoue
    else {
        // Afficher le pop-up d'erreur
        document.getElementById('errorPopup').style.display = 'block';
    }
}
