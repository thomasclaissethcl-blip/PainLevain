# Routine levain et pain low FODMAP

Cette web app est une version autonome, sans dépendance externe, pensée pour GitHub Pages et pour une installation sur smartphone.

## Contenu

- `index.html` : structure de l’application.
- `styles.css` : styles responsive, mode clair et mode sombre.
- `app.js` : timeline, guides, checklists, calculs, journal, stockage et import export.
- `manifest.webmanifest` : configuration PWA.
- `sw.js` : mode hors ligne par cache local.
- `icons/` : icônes nécessaires à l’installation.

## Fonctionnalités

- Timeline complète du cycle hebdomadaire.
- Étapes cliquables avec guide, checklist, suivi et variantes.
- Calculs de rafraîchi, construction de levain et pâte principale.
- Planning recalculé selon le jour, l’heure, la température et le type de routine.
- Saisie des heures prévues, de début réel et de fin réelle.
- Propagation simple vers l’étape suivante après validation.
- Journal structuré avec notes modifiables, supprimables et épinglables.
- Accès aux paramètres de semaine et à la mémoire locale via boutons icônes ouvrant des modales.
- Bouton de réinitialisation placé en bas de timeline, avec signal visuel de danger.
- Stockage local dans IndexedDB, avec repli localStorage.
- Demande de persistance renforcée via l’API Storage Manager quand elle est disponible.
- Export et import JSON pour sauvegarde manuelle.
- Fonctionnement hors ligne après premier chargement.

## Déploiement GitHub Pages

1. Créer un dépôt GitHub, par exemple `routine-levain`.
2. Copier tous les fichiers de ce dossier à la racine du dépôt.
3. Aller dans `Settings`, puis `Pages`.
4. Sélectionner la branche principale et le dossier racine.
5. Ouvrir l’URL fournie par GitHub Pages.
6. Sur smartphone, utiliser l’option du navigateur permettant d’ajouter l’application à l’écran d’accueil.

## Remarques sur la persistance

L’application garde les données sur l’appareil. Elle utilise IndexedDB en priorité, puis localStorage en secours. Le bouton `Renforcer la persistance` demande au navigateur de ne pas supprimer les données automatiquement. Le comportement dépend du navigateur et du système. Pour une sécurité maximale, il faut utiliser régulièrement l’export JSON.

## Limites

Cette version ne synchronise pas les données entre appareils. Elle ne remplace pas un avis médical ou diététique. Les repères low FODMAP servent à documenter les essais, pas à garantir une tolérance individuelle.
