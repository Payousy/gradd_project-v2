# Configuration Netlify — Formulaire simple

Guide rapide pour déployer sur Netlify et activer la capture des formulaires.

## 1. Déployer sur Netlify

- Poussez votre code sur GitHub
- Allez sur [netlify.com](https://netlify.com) et connectez-vous
- Cliquez **"Add new site"** → **"Import an existing project"**
- Sélectionnez GitHub et votre repo `gradd_project-v2`
- Netlify détectera automatiquement la configuration Astro et commencera le build

## 2. Activer Netlify Forms

Netlify détecte automatiquement les formulaires HTML qui ont `data-netlify="true"` et un champ `form-name`.

**Votre formulaire de contact a déjà cette configuration**, donc les messages apparaîtront immédiatement dans le dashboard Netlify.

## 3. Consulter les messages

- Allez dans le dashboard Netlify
- Cliquez sur votre site
- Naviguez à **Site → Forms**
- Les soumissions de votre formulaire de contact apparaîtront ici
- Vous pouvez répondre directement aux messages reçus

## 4. Activer les notifications par email (optionnel)

Si vous voulez recevoir un email chaque fois qu'un formulaire est soumis :

- Dans le dashboard Netlify → **Site → Forms → Settings → Notifications**
- Cliquez **"Add notification"** → **"Email"**
- Entrez votre adresse email
- Netlify vous enverra automatiquement les soumissions par email

## 5. Ajouter le formulaire à d'autres pages

Si vous avez d'autres formulaires à ajouter, assurez-vous qu'ils ont :

```html
<form name="form-name" data-netlify="true" method="POST" action="/merci">
  <!-- vos champs -->
  <button type="submit">Envoyer</button>
</form>
```

**Important** : Chaque formulaire doit avoir un `name` unique (ex: `contact`, `newsletter`, etc.)

## 6. Tester localement

Pour émuler Netlify Forms localement :

```bash
npm install -g netlify-cli
netlify dev
```

Ouvrez `http://localhost:8888` et testez votre formulaire.

## Résumé

✅ Formulaires capturés automatiquement sur Netlify  
✅ Aucune clé API ou configuration supplémentaire  
✅ Notifications email optionnelles  
✅ Tout fonctionnera dès le déploiement
