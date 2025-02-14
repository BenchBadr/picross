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
    data, pokemon = get_random_picture(dim, dim)
    st.markdown(f"**Pokémon to draw**: {pokemon.capitalize()}")
    size = '20px'

    # Apply the custom CSS
    st.markdown(f"""
    <style>
        .grid-container {{
            display: grid; 
            grid-template-columns: repeat({dim+1}, 20px); 
            gap: 0;
            background:blue;
        }}


        div.stButton > button[kind="secondary"]:first-child {{
            background-color: rgb(204, 49, 49);
            border-radius:0;
            aspect-ratio: 1; 
            width:100%;

        }}

        div.stButton > button[kind="tertiary"]:first-child  {{
            background:transparent;
            border-radius:0;
            aspect-ratio: 1; 
            width:100%;
        }}


        .stHorizontalBlock {{
            gap:0;
        }}

        .stColumn .stVerticalBlock {{
            gap:0;
        }}
    </style>
    """, unsafe_allow_html=True)

    if "coords" not in st.session_state:
        st.session_state.coords = None

    coords = st.session_state.get("coords", None)
    columns = st.columns(dim + 1) 



    for j in range(dim + 1):
        for i in range(dim + 1): 
            with columns[i]:
                if i == 0 and j == 0:
                    st.button("", type='tertiary', key=f"btn-{i}-{j}")
                elif i == 0: 
                    st.button(f"{str(j)}", type='tertiary', key=f"btn-{i}-{j}") 
                elif j == 0:
                    st.button(f"{str(i)}", type='tertiary', key=f"btn-{i}-{j}") 
                else:
                    st.button(f"", type='secondary', key=f"btn-{i}-{j}")
               
                
    st.markdown(f'Clicked `{coords}`')