# pw-generator

Générateur de mots de passe et de phrases de passe, 100 % local : un seul fichier HTML, sans serveur, sans dépendance, sans requête réseau.

## Utilisation

Ouvrez `generateur-mdp.html` dans un navigateur (double-clic).

- **Mot de passe** : longueur 4–128, minuscules / majuscules / chiffres / symboles, caractères en plus ou exclus, exclusion des caractères ambigus, un de chaque type, sans répétition, etc.
- **Phrase de passe** : 3–12 mots tirés de la liste EFF large (anglais), d'une liste française (voir plus bas), ou des deux mélangées ; séparateur, majuscules, chiffre et symbole optionnels.
- Estimation de l'entropie en bits, copie en un clic, presse-papiers vidé après 30 s (optionnel).

## Sécurité

- Aléa : `crypto.getRandomValues` avec échantillonnage par rejet (pas de biais de modulo) et mélange de Fisher-Yates.
- Une Content-Security-Policy (`default-src 'none'`) interdit toute connexion réseau depuis la page.
- Rien n'est stocké (ni `localStorage`, ni cookie) ; les résultats disparaissent à la fermeture de l'onglet.
- Ne commitez jamais de vrais mots de passe dans ce dépôt.

## Développement

Le fichier final est généré à partir de `src/template.html` et des listes de `listes/` :

```bash
node build.js
```

Après toute modification de `src/template.html` ou des listes, relancez la commande puis vérifiez `generateur-mdp.html`.

## Listes de mots

| Fichier | Origine |
| --- | --- |
| `listes/eff_large_wordlist.txt` | [EFF Large Wordlist](https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases), licence CC BY 3.0 US |
| `listes/diceware-fr-5-jets.txt` | Liste française de Christophe-Marie Duquesne, dépôt [chmduquesne/diceware-fr](https://github.com/chmduquesne/diceware-fr), licence [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). **Modifiée** à la compilation : `build.js` retire les jetons parasites (`=`, `--`, `aa`, `ab`…) et ne garde que les mots d'au moins 3 lettres sans symbole. |

## Licence

Le code est sous licence MIT (voir `LICENSE`). Les listes de mots gardent leurs licences d'origine (CC BY 3.0 : attribution requise, modifications indiquées ci-dessus).
