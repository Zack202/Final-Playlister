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
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
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
    const [searchChoose, setsearchChoose] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    useEffect(() => {
        if(store.screen == 0){
        store.loadIdNamePairs();
        } else {
            store.loadIdNamePairsPublished();
        }
    }, [store.screen]);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    function handleCreateNewList() {
        store.createNewList("");
    }
    let addOrDisplay = <div></div>
    if (text !== ""){
     addOrDisplay = <Typography
    size="large"
    edge="end"
    fontSize='30pt'
    color="inherit"
    
>{text} Lists
</Typography>
    }
    if (store.screen == 0){
        addOrDisplay = <Typography
        size="large"
        edge="end"
        fontSize='30pt'
        color="inherit"
        onClick = {handleCreateNewList}
    >+ Your Lists
    </Typography>
    }
    let pName = "";
    let sName = "";
    let aName = "";
    let commentTab = true;
    const blankDate = new Date(0);
    if (store.currentList){
        if(store.currentList.published !== blankDate.toISOString()){
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
    function handleSortName(){
            let sortedProducts = store.idNamePairs.sort((p1, p2) => (p1.name.toUpperCase() < p2.name.toUpperCase()) ? -1 : (p1.name.toUpperCase() > p2.name.toUpperCase()) ? 1 : 0);
            console.log(sortedProducts);
            handleMenuClose();
    }
    function handleSortLikes(){
        let sortedProducts = store.idNamePairs.sort((p1, p2) => (p1.likes.length < p2.likes.length) ? 1 : (p1.likes.length > p2.likes.length) ? -1 : 0);
        console.log(sortedProducts);
        handleMenuClose();
}
    function handleSortDislikes(){
        let sortedProducts = store.idNamePairs.sort((p1, p2) => (p1.dislikes.length < p2.dislikes.length) ? 1 : (p1.dislikes.length > p2.dislikes.length) ? -1 : 0);
        console.log(sortedProducts);
       handleMenuClose();
    }
    function handleSortListens(){
        let sortedProducts = store.idNamePairs.sort((p1, p2) => (p1.listens < p2.listens) ? 1 : (p1.listens > p2.listens) ? -1 : 0);
        console.log(sortedProducts);
        handleMenuClose();
    }
    function handleSortPublished(){
        let sortedProducts = store.idNamePairs.sort((p1, p2) => (p1.published < p2.published) ? 1 : (p1.published > p2.published) ? -1 : 0);
        console.log(sortedProducts);
        handleMenuClose();
    }
    function handleSortEdit(){
        let sortedProducts = store.idNamePairs.sort((p1, p2) => (p1.updatedAt < p2.updatedAt) ? 1 : (p1.updatedAt > p2.updatedAt) ? -1 : 0);
        console.log(sortedProducts);
        handleMenuClose();
    }
    let playerComments = <div></div>
    function handleComments() {
        setPlayerActive(1);
    }
    function handlePlayer() {
        setPlayerActive(0);
    }
    function handleLoadPlayer() {
        setPlayerActive(0);
        setsearchChoose(false);
        store.setScreen(0);
        document.getElementById("houseG").style.color = "red";
        document.getElementById("publishNameG").style.color = "black";
        document.getElementById("publishUserG").style.color = "black"
    }
    function handlePublishListsName(){
        setPlayerActive(0);
        setsearchChoose(false);
        store.setScreen(1);
        console.log(store.screen);
        document.getElementById("houseG").style.color = "black";
        document.getElementById("publishNameG").style.color = "red";
        document.getElementById("publishUserG").style.color = "black"
    }
    function handlePublishListsUser(){

        setPlayerActive(0);
        setsearchChoose(true);
        store.setScreen(2);
        document.getElementById("houseG").style.color = "black";
        document.getElementById("publishNameG").style.color = "black";
        document.getElementById("publishUserG").style.color = "red"
    }
    function handleKeyPress (event){
            if (event.code === "Enter") {
                if(searchChoose == false){
                let arr = store.idNamePairs;
                setidNameUpdate(arr.filter(e => (e.name).includes(text)));
                } else if (searchChoose == true){
                    let arr = store.idNamePairs;
                setidNameUpdate(arr.filter(e => (e.userName).includes(text)));
                }
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
            <Grid item xs={0} id = "houseG" color = "red">
            <HomeOutlinedIcon
                            size="large"
                            edge="end"
                            
                            fontSize='30pt'
                            id = "house"
                            onClick={handleLoadPlayer}
                        >
                        </HomeOutlinedIcon>
                        </Grid>
                        <Grid item xs={0} id = "publishNameG">
                        <GroupsOutlinedIcon
                            size="large"
                            edge="end"
                            fontSize='30pt'
                            
                            id = "publishName"
                            onClick={handlePublishListsName}
                        >
                        </GroupsOutlinedIcon>
                        </Grid>
                        <Grid item xs={1} id = "publishUserG">
                        <PersonOutlineOutlinedIcon
                            size="large"
                            edge="end"
                            fontSize='30pt'
                            
                            id = "publishUser"
                            onClick={handlePublishListsUser}
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
                            onClick={handleProfileMenuOpen}
                            
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
                <Grid item xs = {12} sx={{textAlign:"center"}}>
                    {addOrDisplay}
                    
                </Grid>
             </Grid>
            </div>
            <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleSortPublished}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleSortEdit}>Last Edited Date (Newest)</MenuItem>
            <MenuItem onClick={handleSortListens}>Listens (High - Low)</MenuItem>
            <MenuItem onClick={handleSortLikes}>Likes (High - Low)</MenuItem>
            <MenuItem onClick={handleSortDislikes}>Dislikes (High - Low)</MenuItem>
            <MenuItem onClick={handleSortName}>Name (A - Z)</MenuItem>
        </Menu>
                
                
    
            <MUIDeleteModal></MUIDeleteModal>
            </div>
        )
}

export default HomeScreen;