# Configuration Netlify — Formulaire de contact

Guide rapide pour activer Netlify Forms et recevoir les soumissions du formulaire de contact par email.

1. Déployer sur Netlify

- Poussez votre branche et déployez le site sur Netlify (ou connectez le repo depuis Netlify).

2. Activer Netlify Forms

- Netlify détecte automatiquement le formulaire HTML de [contact.astro](src/pages/contact.astro), qui a `data-netlify="true"` et un champ `form-name`.
- Vérifiez dans le tableau de bord : Site → Forms. Les soumissions y apparaissent directement, sans code ni fonction serverless.

3. Recevoir les soumissions par email

- Dans Netlify → Site configuration → Forms → Form notifications → Add notification → Email notification.
- Indiquez l'adresse qui doit recevoir les messages (ex. contact@gradd.sn).
- Aucune variable d'environnement ni clé API n'est nécessaire : Netlify envoie l'email lui-même.

4. Anti-spam

- Le formulaire inclut un champ honeypot (`bot-field`, `data-netlify-honeypot="bot-field"`) : les soumissions remplissant ce champ caché sont rejetées automatiquement par Netlify.
- Netlify filtre aussi les soumissions via son propre système anti-spam (Akismet), consultable dans Site → Forms → Spam.

5. Tester localement

- Netlify Forms ne fonctionne qu'une fois déployé (le traitement se fait côté Netlify, pas dans `astro dev`). Pour tester en local, utilisez le CLI Netlify :

```
npm install -g netlify-cli
netlify dev
```

6. Récapitulatif rapide

- Formulaire : `data-netlify="true"`, `input name="form-name" value="contact"`, `action="/merci"`, honeypot `bot-field`.
- Notifications : configurées entièrement depuis le tableau de bord Netlify (Forms → Notifications), pas de code à maintenir.
