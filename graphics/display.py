import streamlit as st
try:
    from pictures.get_pic import get_random_picture
except ImportError:
    from graphics.pictures.get_pic import get_random_picture
from streamlit.components.v1 import html




# def display(dim, bools):
#     data, pokemon = get_random_picture(dim, dim)
#     st.markdown(f"**Pokémon to draw**: {pokemon.capitalize()}")
#     size = '20px'
#     grid_settings = f"display: grid;grid-template-columns: repeat({dim+1}, 20px);gap: 0;"
#     html_content = f'<div class="grid-container" style="{grid_settings}">'
#     for row in range(dim):
#         html_content += f'<a style="width: {size}; height: {size};">3 1</a>\n'
#         for col in range(dim):
#             html_content += f'<a data-row="{row}" data-col="{col}" style="background-color: {['red', data[row][col]][int(bools[row][col])]}; border: 1px solid black; width: {size}; height: {size};"></a>\n'
#     html_content += '</div>'
#     html(html_content)


def display(dim, bools):
    if 'data' not in st.session_state:
        st.session_state.data, st.session_state.pokemon = get_random_picture(dim, dim)
    if 'grid_state' not in st.session_state:
        st.session_state.grid_state = [[False for _ in range(dim)] for _ in range(dim)]

    st.markdown(f"**Pokémon to draw**: {st.session_state.pokemon.capitalize()}")
    size = '20px'
    grid_settings = f"display: grid;grid-template-columns: repeat({dim+1}, 20px);gap: 0;"
    
    html_content = f'''
    <div class="grid-container" style="{grid_settings}">
    '''
    for row in range(dim):
        html_content += f'<a style="width: {size}; height: {size};">{row}</a>\n'
        for col in range(dim):
            color = 'black' if st.session_state.grid_state[row][col] else 'white'
            html_content += f'<a id="cell-{row}-{col}" onclick="toggleCell({row}, {col})" style="background-color: {color}; border: 1px solid black; width: {size}; height: {size};"></a>\n'
    html_content += '</div>'

    html_content += '''
    <script>
    function toggleCell(row, col) {
        const cell = document.getElementById(`cell-${row}-${col}`);
        const currentColor = cell.style.backgroundColor;
        const newColor = currentColor === 'white' ? 'black' : 'white';
        cell.style.backgroundColor = newColor;
        window.parent.postMessage({
            type: 'streamlit:setComponentValue',
            value: {row: row, col: col, color: newColor}
        }, '*');
    }
    </script>
    '''

    html(html_content, height=(dim+1)*25)

    # Handle the message from JavaScript
    if 'componentValue' in st.session_state:
        value = st.session_state.componentValue
        st.session_state.grid_state[value['row']][value['col']] = (value['color'] == 'black')
        del st.session_state.componentValue
        st.experimental_rerun()
