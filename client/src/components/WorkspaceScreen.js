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
import AuthContext from '../auth'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
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
        store.loadIdNamePairs();
    }
    function handleDelete(event) {
        event.stopPropagation();
        store.markListForDeletion();
    }
    function handleDuplicate(event){
        event.stopPropagation();
        store.dupePlaylist("");
    }
        let undoButton = <div></div>;
        let  redoButton = <div></div>;
        let  publishButton = <div></div>;
        let  addSongButton = <div></div>;
        let deleteButton = <div></div>;
        let duplicateButton = <div></div>;
    const blankDate = new Date(0);
    
    if(auth.user.userName !== "GUEST"){
        duplicateButton = <Button onClick={(event) => {
            handleDuplicate(event)
        }} aria-label='Duplicate'>Duplicate</Button>;
    }

    if(store.currentList){
        if(store.currentList.published == blankDate.toISOString()){
             undoButton = <Button onClick={(event) => {
                handleUndo(event)
            }} >Undo</Button>;
             redoButton = <Button onClick={(event) => {
                handleRedo(event)
            }} aria-label='Redo'>Redo</Button>;
             publishButton = <Button onClick={(event) => {
                handlePublish(event)
            }} aria-label='Publish'>Publish</Button>;
             addSongButton = <div class = "unselected-list-card" style={{textAlign: "center"}} onClick={handleClick}>+</div>
        }
    }
    if (store.screen == 0){
        deleteButton = <Button onClick={(event) => {
            handleDelete(event)
        }} aria-label='Delete'>Delete</Button>
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
            {addSongButton}
            <Grid container spacing={0} >
            <Grid item xs={1} variant="contained" id='undo-button' disabled={!store.canUndo()}>{undoButton}</Grid>
            <Grid item xs={6} disabled={!store.canRedo()}>{redoButton}</Grid>
            <Grid item xs={1.5}>{publishButton}</Grid>
            <Grid item xs={1.5}>{deleteButton}</Grid>
            <Grid item xs={1.5}>{duplicateButton}</Grid>
            </Grid>
         </List>            
         
         </Box>
         { modalJSX }
         </div>
    )
}

export default WorkspaceScreen;