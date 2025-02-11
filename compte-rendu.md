# Picross : Compte-rendu

## Interface graphique

Utilisation de Streamlit

## Logique du jeu

Il existe dans les données de décompilation de `pokeemerald` l'intégralité des icônes miniatures de Pokémon Émeraude soit près de 400 images.

Ces images sont en format 32x64. Exemple: 

<img src="https://raw.githubusercontent.com/pret/pokeemerald/refs/heads/master/graphics/pokemon/abra/icon.png">

Or, l'image en contient en réalité 2, qui sont ensuite alternées pour créer une animation. On peut ainsi exploiter des image de dimensions 32x32. 