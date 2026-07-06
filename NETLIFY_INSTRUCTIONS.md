# Configuration Netlify — Formulaire et webhook d'email

Guide rapide pour activer Netlify Forms, configurer le webhook vers la Netlify Function `sendFormEmail` et définir les variables d'environnement.

1. Déployer sur Netlify

- Poussez votre branche et déployez le site sur Netlify (ou connectez le repo depuis Netlify).

2. Activer Netlify Forms

- Netlify détecte automatiquement les formulaires HTML qui ont `data-netlify="true"` et un champ `form-name`.
- Vérifiez dans le tableau de bord : Site → Forms. Les soumissions apparaîtront ici.

3. Configurer le webhook (pour envoi d'email)

- URL du webhook à ajouter dans Netlify (Site → Forms → Settings → Notifications → Webhooks) :

  https://<votre-site>.netlify.app/.netlify/functions/sendFormEmail

- Méthode : POST
- Payload : choisissez l'option qui envoie `fields` (ou le payload complet). La function `sendFormEmail` gère plusieurs formats.

4. Définir les variables d'environnement (Netlify)

- Dans Netlify → Site settings → Build & deploy → Environment → Environment variables, ajoutez :
  - `RESEND_API_KEY` = votre clé Resend
  - `CONTACT_TO_EMAIL` = adresse qui recevra les messages (ex. contact@gradd.com)
  - `CONTACT_FROM_EMAIL` = adresse d'envoi (ex. noreply@votredomaine.com)

Après avoir ajouté ces variables, redéployez le site.

5. Tester localement

- Pour émuler les fonctions Netlify localement, installez le CLI Netlify et lancez :

```
npm install -g netlify-cli
netlify dev
```

- Le serveur local va émuler les fonctions et routes; vous pourrez soumettre le formulaire à `http://localhost:8888/contact`.

6. Notes et dépannage

- Si la function retourne une erreur 500, vérifiez que `RESEND_API_KEY` est défini dans les variables Netlify.
- La function attend diverses formes de payload (array `fields`, `submission`, `payload`), donc le webhook Netlify standard doit marcher.
- Si vous préférez une intégration directe (SendGrid, Mailgun), on peut adapter la function.

7. Récapitulatif rapide

- Formulaire : `data-netlify="true"`, `input name="form-name" value="contact"` et `action="/merci"`.
- Webhook : `https://<votre-site>.netlify.app/.netlify/functions/sendFormEmail` (POST)
- Variables Netlify : `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
