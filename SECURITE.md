# Sécurité — GRADD Site

## Ce qui est implémenté

### En-têtes HTTP (\_headers + netlify.toml)

- `X-Frame-Options: DENY` — protège contre le clickjacking
- `X-Content-Type-Options: nosniff` — empêche le MIME-sniffing
- `Referrer-Policy: strict-origin-when-cross-origin` — contrôle les informations de référence
- `Permissions-Policy` — désactive caméra, micro, géolocalisation
- `Content-Security-Policy` — liste blanche des sources autorisées
- `Strict-Transport-Security` — HTTPS obligatoire (6 mois)

### Formulaire contact (api/contact.ts)

- Validation serveur : longueurs, format email, champs requis
- Échappement HTML `escapeHtml()` sur toutes les données avant injection dans l'email
- Honeypot anti-bot : champ `_hp` caché, si rempli → rejet silencieux
- Aucune donnée sensible dans les messages d'erreur renvoyés au client
- Secrets exclusivement via variables d'environnement (jamais hardcodés)

### Variables d'environnement

- `.env.local` exclu du Git (.gitignore)
- `.env.example` fourni comme modèle sans valeurs réelles
- Vérification au démarrage : si `RESEND_API_KEY` ou `CONTACT_TO_EMAIL` manquent → erreur 503 propre

---

## Checklist avant déploiement Netlify

- [ ] Aller dans Netlify → Site settings → Environment variables
- [ ] Ajouter `RESEND_API_KEY` (depuis resend.com)
- [ ] Ajouter `CONTACT_TO_EMAIL` (email de réception des contacts)
- [ ] Ajouter `CONTACT_FROM_EMAIL` (ex : noreply@gradd.sn, domaine vérifié dans Resend)
- [ ] Vérifier que le dépôt GitHub ne contient PAS de fichier .env.local
- [ ] Après déploiement : tester https://securityheaders.com avec l'URL du site

---

## Limites connues (acceptables pour ce type de site)

- **Pas de rate limiting sur l'API /api/contact** : Netlify ne fournit pas de rate limiting natif sur les fonctions. Si le spam devient problématique, envisager Cloudflare Turnstile (gratuit, sans friction visuelle) en remplacement du honeypot.
- **Pas d'authentification** : le site est entièrement public, c'est voulu.
- **Dépendances** : surveiller les mises à jour d'Astro et Resend. Lancer `npm audit` avant chaque mise en production.

---

## Commandes utiles

```bash
# Vérifier les vulnérabilités npm
npm audit

# Tester les en-têtes après déploiement
curl -I https://gradd.sn

# Score headers (objectif : A ou A+)
# https://securityheaders.com/?q=gradd.sn
```
