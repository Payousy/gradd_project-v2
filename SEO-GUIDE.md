# Guide SEO GRADD

## Architecture SEO implémentée

### 1. Métadonnées (BaseLayout.astro)

Chaque page doit recevoir via les props de BaseLayout :

- `title` : titre unique < 65 caractères incluant le mot-clé principal
- `description` : description unique de 120–160 caractères
- `canonical` : URL canonique (auto-générée)
- `ogImage` : image Open Graph (idéalement 1200×630px)
- `jsonLd` : données structurées Schema.org spécifiques à la page

### 2. Données structurées JSON-LD (à personnaliser par page)

**Page d'accueil** : `WebSite` + `ProfessionalService` ✅
**Qui sommes-nous** : `AboutPage` + `Organization`
**Compétences** : `Service` avec itemListElement
**Méthodologie** : `HowTo` avec steps
**Contact** : `ContactPage`
**Ressources** : `WebPage` avec `mentions` ✅

### 3. Fichiers techniques

- `/sitemap.xml` : généré dynamiquement ✅
- `/robots.txt` : configuré ✅

### 4. Mots-clés cibles (à intégrer naturellement dans le contenu)

**Cluster principal :**

- cabinet études Sénégal
- suivi-évaluation Afrique de l'Ouest
- évaluation politiques publiques Sénégal
- bureau études développement durable Dakar

**Cluster secondaire :**

- recherche appliquée sciences sociales
- études sociologiques Sénégal
- ODD développement Sénégal
- études impact environnemental social

**Cluster géographique :**

- cabinet conseil Dakar
- expertise développement Afrique de l'Ouest
- ECOWAS policy evaluation

### 5. Checklist par nouvelle page

- [ ] `title` unique, < 65 caractères, contient 1 mot-clé cible
- [ ] `description` unique, 120–160 caractères, incitative
- [ ] Toutes les images ont un attribut `alt` descriptif
- [ ] Headings logiques : 1 seul `h1`, structure h2/h3 cohérente
- [ ] Liens internes vers 2–3 autres pages du site
- [ ] JSON-LD Schema.org adapté au type de page
- [ ] URL courte et descriptive : `/verbe-sujet` ou `/sujet-complement`

### 6. Après déploiement

1. Soumettre `https://gradd.sn/sitemap.xml` dans Google Search Console
2. Tester les données structurées : https://search.google.com/test/rich-results
3. Vérifier Open Graph : https://developers.facebook.com/tools/debug/
4. Audit Lighthouse Performance/SEO : objectif > 95

### 7. Liens entrants (backlinks) — stratégie recommandée

Pour renforcer l'autorité du domaine, solliciter des mentions et liens depuis :

- ipar.sn (partenaire recherche)
- crepos.edu.sn (partenaire académique)
- undp.org/fr/senegal (partenaire institutionnel)
- Publications sur ResearchGate ou Academia.edu
- Actualités sur sunenews.sn / Enquête+ (presse sénégalaise)
