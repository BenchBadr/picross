import React, { useState, useEffect } from 'react';

async function getRandomPokemon() {
  const response = await fetch('/pokemon_data.txt'); 
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const text = await response.text();
  const lines = text.split('\n');
  return lines[Math.floor(Math.random() * lines.length)].trim();
}

async function getRandomPicture(w, h) {
  const pokemon = await getRandomPokemon();
  const url = `https://raw.githubusercontent.com/rh-hideout/pokeemerald-expansion/refs/heads/master/graphics/pokemon/${pokemon}/icon.png`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
        if (response.status === 404) {
            console.error(`Pokemon ${pokemon} not found. Trying another one...`);
            return getRandomPicture(w, h);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const image = await createImageBitmap(blob); 

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    ctx.imageSmoothingEnabled = false; 
    ctx.drawImage(image, 0, 0, 32, 32, 0, 0, w, h);

    const pixelDataHexList = [];
    for (let y = 0; y < h; y++) {
      const rowHex = [];
      for (let x = 0; x < w; x++) {
        const data = ctx.getImageData(x, y, 1, 1).data;
        const hexColor = `#${[...data.slice(0, 3)].map(x => x.toString(16).padStart(2, '0')).join('')}`;
        rowHex.push(hexColor);
      }
      pixelDataHexList.push(rowHex);
    }

    const transparency = pixelDataHexList[0][0];
    const processedPixelData = pixelDataHexList.map(row =>
      row.map(pixel => (pixel === transparency ? '#ffffff' : pixel))
    );

    return [processedPixelData, pokemon];
  } catch (error) {
    console.error("Error fetching or processing image:", error);
    return [[], null]; 
  }
}


function MyComponent() {
  const [pixelData, setPixelData] = useState([]);
  const [pokemonName, setPokemonName] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const [data, pokemon] = await getRandomPicture(32, 32); 
      setPixelData(data);
      setPokemonName(pokemon);
    }

    fetchData();
  }, []);

  return (
    <div>
      {pokemonName && <h2>{pokemonName}</h2>}
      {pixelData.length > 0 ? (pokemonName
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MyComponent;