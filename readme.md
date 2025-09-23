kør appen
---------
npm install #instalerer dependencies
npm start #kører appen



fil struktur
------------

- app/
  - _layout.js (root stack layout)
  - index.js (redirecter til pantry-tab)
  - (tabs)/
    - _layout.js (tab-bar med Pantry, Recipes, Suggestions)
    - pantry.js (Pantry-screen)
    - recipes.js (Recipes-screen)
    - suggest.js (Suggestions-screen)

- styles/
  - styles.js (komponent-styles)
  - theme.js (farver, spacing, radius, shadows)

- data/
  - recipes.js (opskrifter med ingredienser)

- assets/ (billeder, ikoner, fonts)

- package.json (dependencies og scripts)
- app.json (expo config)
- README.md (beskrivelse + link til demo-video)
