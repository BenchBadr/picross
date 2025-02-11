import streamlit as st
try:
    from pictures.get_pic import get_random_picture
except ImportError:
    from graphics.pictures.get_pic import get_random_picture

def display(dim, bools):
    data, pokemon = get_random_picture(dim, dim)
    st.markdown(f"**Pokémon to draw**: {pokemon.capitalize()}")
    size = '20px'# f"calc({100/dim}% - 2px)"
    grid_settings = f"display: grid;grid-template-columns: repeat({dim+1}, 20px);gap: 0;"
    html = f'<div style="{grid_settings}">'
    for row in range(dim):
        with st.container():
            html+=(f'<a style="width: {size}; height: {size};">3 1</a>\n')
            for col in range(dim):
                html+=(f'<a style="background-color: {data[row][col]}; border: 1px solid black; width: {size}; height: {size};"></a>\n')
    html+=('</div>')
    st.html(html)