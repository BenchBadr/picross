import streamlit as st

# Sidebar content
st.sidebar.title("Picross")

# Sidebar
st.sidebar.markdown("## Game")
st.sidebar.markdown("- Progress: \n > 35%")
st.sidebar.markdown("- Mistakes: \n > 2")    
st.sidebar.markdown('---')

## Settings Section
st.sidebar.header("Settings")
show_crossouts = st.sidebar.checkbox("Show crossouts", value=True)  
grid_size = st.sidebar.selectbox("Grid size", options=["5x5", "10x10", "15x15"])  

## New Game Button
if st.sidebar.button("New Game"):
    st.sidebar.success("Starting a new game!") 

# Main content (optional)
st.title("Picross Game")
st.write("Enjoy your game!")
