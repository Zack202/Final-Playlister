import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    
    let modalJSX = "";
    if (store.currentList == null) {
        store.history.push("/");
        return(<Box></Box>)
    }
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    function handleClick(event) {
        event.stopPropagation();
        store.addNewSong();
    }
    function handleUndo(event) {
        event.stopPropagation();
        store.undo();
    }
    function handleRedo(event) {
        event.stopPropagation();
        store.redo();
    }
    function handlePublish(event) {
        event.stopPropagation();
        store.publishList();
    }
    function handleDelete(event) {
        event.stopPropagation();
        store.markListForDeletion();
    }
    function handleDuplicate(event) {
        event.stopPropagation();
    }
    function handleDuplicate(event){
        event.stopPropagation();
        store.dupePlaylist("");
    }
    return (<div>
        <Box>
        <List 
            id="playlist-cards" 
            sx={{ width: '100%', bgcolor: 'background.paper' }}
        >
            {
                store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))
                  
            }
            <div class = "unselected-list-card" style={{textAlign: "center"}} onClick={handleClick}>+</div>
            <Grid container spacing={0} >
            <Grid item xs={1} variant="contained" id='undo-button' disabled={!store.canUndo()}><Button onClick={(event) => {
                        handleUndo(event)
                    }} >Undo</Button></Grid>
            <Grid item xs={6} disabled={!store.canRedo()}><Button onClick={(event) => {
                        handleRedo(event)
                    }} aria-label='Redo'>Redo</Button></Grid>
            <Grid item xs={1.5}><Button onClick={(event) => {
                        handlePublish(event)
                    }} aria-label='Publish'>Publish</Button></Grid>
            <Grid item xs={1.5}><Button onClick={(event) => {
                        handleDelete(event)
                    }} aria-label='Delete'>Delete</Button></Grid>
            <Grid item xs={1.5}><Button onClick={(event) => {
                        handleDuplicate(event)
                    }} aria-label='Duplicate'>Duplicate</Button></Grid>
            </Grid>
         </List>            
         
         </Box>
         { modalJSX }
         </div>
    )
}

export default WorkspaceScreen;