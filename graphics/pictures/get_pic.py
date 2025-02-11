import random
import requests
from PIL import Image
from io import BytesIO

def random_pokemon():
    with open('graphics/pictures/pokemon_data.txt', 'r') as file:
        lines = file.readlines()
        return random.choice(lines).strip()

def get_random_picture(w, h):
    pokemon = random_pokemon()
    url = f"https://raw.githubusercontent.com/rh-hideout/pokeemerald-expansion/refs/heads/master/graphics/pokemon/{pokemon}/icon.png"
    response = requests.get(url, timeout=10)
    response.raise_for_status() 
    img = Image.open(BytesIO(response.content))

    # Resize image
    img = img.crop((0, 0, 32, 32))
    resized_img = img.resize((w, h), Image.Resampling.LANCZOS)
    resized_img = resized_img.convert("RGB")

    pixel_data_hex_list = []
    for y in range(resized_img.height):
        row_hex = []
        for x in range(resized_img.width):
            r, g, b = resized_img.getpixel((x, y))
            hex_color = '#{:02x}{:02x}{:02x}'.format(r, g, b) 
            row_hex.append(hex_color)
        pixel_data_hex_list.append(row_hex)

    transparency = pixel_data_hex_list[0][0]
    return ([[pixel if pixel != transparency else '#ffffff' for pixel in row] for row in pixel_data_hex_list], pokemon)


