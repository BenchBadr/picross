import streamlit as st

# Sidebar content
st.sidebar.title("Picross")

# Sidebar
st.sidebar.markdown('---')
st.sidebar.markdown("## Game")
progress = 35 
mistakes = 2   
st.sidebar.markdown(f"- Progress: \n > {progress}%")
st.sidebar.markdown(f"- Mistakes: \n > {mistakes}")    
st.sidebar.markdown('---')

# Settings Section
st.sidebar.header("Settings")
show_crossouts = st.sidebar.checkbox("Show crossouts", value=True)

# Define grid size options and corresponding dimensions
grid_options = {
    "5x5": 5,
    "10x10": 10,
    "15x15": 15
}

# Select grid size
grid_size_label = st.sidebar.selectbox("Grid size", options=list(grid_options.keys()))
dim = grid_options[grid_size_label] 
st.sidebar.markdown('---')

# New Game Button
if st.sidebar.button("New Game"):
    st.sidebar.success("Starting a new game!") 
    st.rerun()

# Main content
st.title("Picross Game")

