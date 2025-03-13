# Project Setup
**BRANCH MASTER**; LES AUTRES SONT DES PREVERSIONS


## Installation et démarrage du projet


1. Installez les dépendances nécessaires :
   ```bash
   npm install
   ```

2. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

## Configuration de l'environnement

Créez un fichier `.env` dans le dossier backend et ajoutez les variables suivantes :
```env
MONGO_URI=mongodb+srv://ipssi:ipssi_hackathon_2025@cluster0.cdawf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=ipssi_hackathon_2025
```

Le fichier `.env` est essentiel pour stocker des informations sensibles comme les URI de base de données et les secrets JWT. Assurez-vous de ne pas partager ce fichier publiquement, surtout avec des informations sensibles telles que les identifiants MongoDB.
