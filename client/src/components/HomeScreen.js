import React, { useContext, useEffect,useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import CommentCard from './CommentCard'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TextField from '@mui/material/TextField';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import Grid from '@mui/material/Grid';
import YouTubePlayerExample from '../PlaylisterYouTubePlayer'
import  Tabs  from '@mui/material/Tabs';
import  Tab  from '@mui/material/Tab';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';
import yt from '../PlaylisterYouTubePlayer';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState("");
    const [comment, setComment] = useState("");
    const [idNameUpdate, setidNameUpdate] = useState([]);
    const [playerActive, setPlayerActive] = useState(0);
    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList("");
    }
    let pName = "";
    let sName = "";
    let aName = "";
    let commentTab = true;
    if (store.currentList){
        if(store.currentList.published == true){
            commentTab = false;
        }
         pName = store.currentList.name;
         if(store.currentList.songs.length != 0){
         sName = store.currentList.songs[store.currentSongNumber].title;
         aName = store.currentList.songs[store.currentSongNumber].artist;
         } else {
            sName = "???";
            aName = "???";
         }
    }

    let playerComments = <div></div>
    function handleComments() {
        setPlayerActive(1);
    }
    function handlePlayer() {
        setPlayerActive(0);
    }
    function handleLoadPlayer() {
        store.loadIdNamePairs();
    }
    function handlePublishLists(){
        store.loadIdNamePairsPublished();
    }
    function handleKeyPress (event){
            if (event.code === "Enter") {
                let arr = store.idNamePairs;
                setidNameUpdate(arr.filter(e => (e.name).includes(text)));
                
            }
    }
    function handleKeyPress2(event){
        if (event.code === "Enter") {
            store.addComment(comment);
            event.target.value = "";
        }
}
    if(text == "" && idNameUpdate !==store.idNamePairs){
        setidNameUpdate(store.idNamePairs)
    }
    function handleUpdateText (event){
        setText(event.target.value);
    }
    function handleUpdateComment (event){
        setComment(event.target.value);
    }
    if (playerActive == 0){
         playerComments = <div>
        <YouTubePlayerExample />
        <Box sx={{ border: 1, borderRadius:"10px", borderColor: 'divider', color: "blue" }}>
        <Grid container spacing = {2} padding = {1} style = {{contentAlign: "center", marginLeft: "20%"}}>
        <Grid item xs = {12}>
        Now Playing
                <Typography
                        size="large"
                        edge="end"
                        fontSize='14pt'
                        color="inherit"
                    >Playlist: {pName}
                    </Typography>
                </Grid>
                <Grid item xs = {12}>
                
                <Typography
                        size="large"
                        edge="end"
                        fontSize='14pt'
                        color="inherit"
                    >Song#: {store.currentSongNumber}
                    </Typography>
                </Grid>
                <Grid item xs = {12}>
                
                <Typography
                        size="large"
                        edge="end"
                        fontSize='14pt'
                        color="inherit"
                    >Title: {sName}
                    </Typography>
                </Grid>
                <Grid item xs = {12}>
                
                <Typography
                        size="large"
                        edge="end"
                        fontSize='14pt'
                        color="inherit"
                    >Artist: {aName}
                    </Typography>
                </Grid>
        </Grid>
        <Box sx={{ border: 1, borderRadius:"10px", borderColor: 'divider', color: "blue" }}>
            <Grid container spacing = {2} padding = {1} style = {{contentAlign: "center", marginLeft: "20%"}}>
                <Grid item xs = {2}>
                <FastRewindIcon
                        size="large"
                        edge="end"
                        fontSize='30pt'
                        color="inherit"
                        transform= "scale(1.8)"
                        id = "prev-button"
                    >
                    </FastRewindIcon>
                </Grid>
                <Grid item xs = {2}>
                <StopIcon
                        size="large"
                        edge="end"
                        fontSize='30pt'
                        color="inherit"
                        transform= "scale(1.8)"
                        id = "stop-button"
                    >
                    </StopIcon>
                </Grid>
                <Grid item xs = {2}>
                <PlayArrowIcon
                        size="large"
                        edge="end"
                        fontSize='30pt'
                        color="inherit"
                        transform= "scale(1.8)"
                        id = "play-button"
                    >
                    </PlayArrowIcon>
                </Grid>
                <Grid item xs = {2}>
                <FastForwardIcon
                        size="large"
                        edge="end"
                        fontSize='30pt'
                        color="inherit"
                        transform= "scale(1.8)"
                        id = "next-button"
                    >
                    </FastForwardIcon>
                </Grid>
            </Grid>
        </Box>
        </Box>
        </div>
    }else {
        if(store.currentList){
        playerComments = <div><List sx={{ width: '90%', left: '5%', overflowY: "scroll", height:"45vh"}}>
        {
            
            store.currentList.comments.map((pair) => (
                <CommentCard
                    key={pair.userName}
                    idNamePair={pair}
                />
            ))
        }
        </List>
        <TextField
                                    name="commentBar"
                                    fullWidth
                                    id="commentBar"
                                    label="Add Comment"
                                    onKeyPress={handleKeyPress2}
                                    onChange={handleUpdateComment}
                                />
                                </div>
    } else {
        playerComments = <div></div>
    }
}
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%' }}>
            {
                idNameUpdate.map((pair) => (
                    <ListCard
                        key={pair.comment}
                        idNamePair={pair}
                        selected={false}
                        switcher={setPlayerActive}
                    />
                ))
            }
            </List>;
    }
   
    return (
        <div>
        <div id="toolBarChanger">
            <Grid container spacing={2} padding={1}>
            <Grid item xs={0}>
            <HomeOutlinedIcon
                            size="large"
                            edge="end"
                            
                            color="inherit"
                            fontSize='30pt'
                            onClick={handleLoadPlayer}
                        >
                        </HomeOutlinedIcon>
                        </Grid>
                        <Grid item xs={0} >
                        <GroupsOutlinedIcon
                            size="large"
                            edge="end"
                            fontSize='30pt'
                            color="inherit"
                            onClick={handlePublishLists}
                        >
                        </GroupsOutlinedIcon>
                        </Grid>
                        <Grid item xs={1} >
                        <PersonOutlineOutlinedIcon
                            size="large"
                            edge="end"
                            fontSize='30pt'
                            color="inherit"
                            onClick={handlePublishLists}
                        >
                        </PersonOutlineOutlinedIcon>
                        </Grid>
                        <Grid item xs={7} >
                        <TextField
                                    name="searchBar"
                                    fullWidth
                                    id="searchBar"
                                    label="Search"
                                    onKeyPress={handleKeyPress}
                                    onChange={handleUpdateText}
                                />
                                </Grid>
            <Grid item xs={0} >
                <Typography variant="h5" fontSize='15pt' >SORT BY</Typography>
                </Grid>
                <Grid item xs={1} >
                <SortOutlinedIcon
                            size="large"
                            edge="end"
                            fontSize='30pt'
                            color="inherit"
                        >
                        </SortOutlinedIcon>
                        </Grid>
            </Grid>

            </div>
            
           <div>
           
           <Grid container spacing={6} padding ={1}>
            <Grid
                item
                xs={7}
                sx = {{height : "50%"}}
                id="list-selector-list"
            >{listCard}</Grid>
            <Grid item xs = {5} >
            <Box id="playerComment" sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: "grey",borderRadius:"10px" }}>
            <Tabs  value = {playerActive} aria-label="nav tabs example">
                 <Tab label="Player" onClick={handlePlayer}/>
                  <Tab label="Comments" onClick={handleComments} disabled={commentTab}/>
            </Tabs>
            {playerComments}
           
            </Box>
             </Grid>
                <Grid item xs = {12}>
                    <Typography
                            size="large"
                            edge="end"
                            fontSize='30pt'
                            color="inherit"
                            onClick = {handleCreateNewList}
                        >+ Your Lists
                        </Typography>
                    
                </Grid>
             </Grid>
            
            </div>
                
                
    
            <MUIDeleteModal></MUIDeleteModal>
            </div>
        )
}

export default HomeScreen;