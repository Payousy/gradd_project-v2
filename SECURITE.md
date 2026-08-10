# Sécurité — GRADD Site

## Ce qui est implémenté

### En-têtes HTTP (\_headers + netlify.toml)

- `X-Frame-Options: DENY` — protège contre le clickjacking
- `X-Content-Type-Options: nosniff` — empêche le MIME-sniffing
- `Referrer-Policy: strict-origin-when-cross-origin` — contrôle les informations de référence
- `Permissions-Policy` — désactive caméra, micro, géolocalisation
- `Content-Security-Policy` — liste blanche des sources autorisées
- `Strict-Transport-Security` — HTTPS obligatoire (6 mois)

### Formulaire contact (Netlify Forms)

- Traitement entièrement délégué à Netlify (aucun code serveur, aucune donnée transitant par un service tiers custom)
- Validation côté navigateur : longueurs, format email, champs requis (attributs HTML natifs)
- Honeypot anti-bot natif Netlify : champ caché `bot-field`, rejet automatique si rempli
- Filtrage anti-spam supplémentaire par Netlify (Akismet), consultable dans Site → Forms → Spam
- Notifications par email configurées depuis le tableau de bord Netlify — aucun secret, clé API ou variable d'environnement à gérer côté code

---

## Checklist avant déploiement Netlify

- [ ] Vérifier que Netlify Forms détecte bien le formulaire (Site → Forms, après un premier déploiement)
- [ ] Configurer la notification email dans Site → Forms → Notifications (voir NETLIFY_INSTRUCTIONS.md)
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
