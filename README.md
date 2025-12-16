Le lien pour le github repo "https://github.com/abdallahhesham13579-create/Cinema-Mini-Project"

Cinema Luna - Documentation Technique

1. Vue d'ensemble du projet
   Cinema Luna est une application web exécutée côté client (client-side) qui permet aux utilisateurs d'explorer une vaste base de données de films. L'application s'appuie sur l'API OMDB (Open Movie Database) pour récupérer des données en temps réel, incluant les affiches de films, les résumés, les notes et les informations sur le casting.

L'objectif de ce projet était de construire une interface réactive et interactive, simulant une "Single Page Application" (SPA) en utilisant du JavaScript pur (Vanilla JS), avec un accent particulier sur la gestion asynchrone des données et la manipulation dynamique du DOM.

1.1 Technologies Utilisées
Frontend : HTML5, CSS3, JavaScript (ES6+)

API Externe : API OMDB (RESTful)

Icônes/Polices : FontAwesome, Google Fonts (DM Serif Display)

Gestion de version : Git (implicite) 2. Structure des Fichiers et Architecture
Le projet suit une structure par composants où chaque page possède ses propres fichiers HTML, CSS et JavaScript afin de maintenir une séparation claire des responsabilités (Separation of Concerns).
/Racine_du_Projet
│
├── index.html # Structure de la page d'accueil
├── index.css # Styles de la page d'accueil
├── index.js # Logique de l'accueil (Films tendances)
│
├── search.html # Structure de l'interface de recherche
├── search.css # Styles de la page de recherche
├── search.js # Logique de recherche (Fetch par requête & Pagination)
│
├── movie.html # Structure de la page de détails
├── movie.css # Styles de la page de détails
├── movie.js # Logique des détails (Fetch par ID)
│
└── logo.jpg # Identité visuelle du projet 3. Fonctionnalités Principales et Implémentation
3.1 Page d'accueil : Films Tendances (index.js)
La page d'accueil affiche une sélection de films "Tendances".

Implémentation : Un tableau d'identifiants IMDb (tendanceIds) est défini dans le code pour cibler des films précis.

Concurrence (Async) : L'application utilise Promise.all() pour récupérer les données des six films simultanément. Cela garantit que l'interface ne s'affiche que lorsque toutes les données sont prêtes, optimisant ainsi le chargement.

Rendu Dynamique : Les cartes de films sont générées via document.createElement() et insérées dans le conteneur #filmsTend.

3.2 Système de Recherche (search.js)
Les utilisateurs peuvent rechercher des films par titre.

Appel API : Utilise le paramètre s= de l'API OMDB pour la recherche textuelle.

Logique de Pagination :

Une variable globale currentPage suit la page actuelle de l'API.

La fonction newSearch() réinitialise la page à 1 et vide les anciens résultats.

Le bouton "Load More" appelle fetchData(true), ce qui incrémente currentPage et ajoute les nouveaux résultats à la suite des existants sans recharger la page.

Gestion d'erreurs : Le code vérifie if (data.Response === "True") pour s'assurer que la recherche est valide avant d'afficher quoi que ce soit.

3.3 Page de Détails du Film (movie.js)
Cette page présente les informations complètes d'un film sélectionné.

Navigation et Routage : L'application utilise les paramètres d'URL pour transmettre l'identité du film entre les pages HTML.

Lien généré : movie.html?id=${movie.imdbID}.

Récupération : new URLSearchParams(window.location.search).get("id").

Récupération de données : Une requête API unique est faite avec l'ID (i=) et le paramètre plot=full pour obtenir le synopsis long.

Affichage : Les données (Affiche, Acteurs, Réalisateur, Note, Genre) sont injectées dynamiquement dans le HTML. 4. Détails de l'Intégration API
L'application communique avec l'API OMDB via des requêtes HTTP fetch (GET).
Page,Fonction,Paramètres Clés,Description
tendance(),i={id},Récupère les infos pour la liste statique des tendances.
fetchData(),"s={nom}, page={n}",Recherche par mots-clés avec gestion des pages.
getMovieDetails(),"i={id}, plot=full",Récupère les métadonnées complètes d'un film unique.

5. Design UI/UX (\*.css)
   Le projet utilise un système de design cohérent grâce aux variables CSS (:root) :

Palette de Couleurs :

--redcol (#b82c37) : Boutons et pied de page.

--bluecol (#1d3557) : Textes principaux et bordures.

--creamcol (#fcecc9) : Fond des cartes.

Mise en page (Layout) :

Utilisation intensive de Flexbox (display: flex) pour aligner la barre de navigation, centrer les cartes de films et structurer le pied de page.

Interactivité : Les cartes possèdent des effets hover (agrandissement scale(1.05) et ombre portée) pour indiquer qu'elles sont cliquables.

6. Défis Techniques et Solutions
   Synchronisation des Données :

Défi : Afficher une liste de films tendances sans effet de "pop-in" (clignotement) individuel.

Solution : Utilisation de async/await couplé à Promise.all dans index.js pour attendre la résolution de toutes les requêtes avant le rendu.

Persistance de la Navigation :

Défi : Savoir quel film afficher sur la page movie.html sans backend ni base de données.

Solution : Passage de l'ID via l'URL (?id=...), une technique standard pour les applications sans état serveur (stateless).

7. Améliorations Futures Possibles
   Sécurité : Masquer la clé API (actuellement exposée dans le JS) en utilisant un proxy backend.

Filtres avancés : Ajouter des options pour filtrer par année de sortie ou par type (Série vs Film) dans la barre de recherche.

Expérience Utilisateur : Ajouter une animation de chargement (loader) pendant les requêtes réseau pour indiquer à l'utilisateur que la recherche est en cours.
