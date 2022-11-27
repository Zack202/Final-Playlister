import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
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
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
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
                            onClick = {handleCreateNewList}
                            color="inherit"
                            fontSize='30pt'
                        >
                        </HomeOutlinedIcon>
                        </Grid>
                        <Grid item xs={0} >
                        <GroupsOutlinedIcon
                            size="large"
                            edge="end"
                            fontSize='30pt'
                            color="inherit"
                        >
                        </GroupsOutlinedIcon>
                        </Grid>
                        <Grid item xs={1} >
                        <PersonOutlineOutlinedIcon
                            size="large"
                            edge="end"
                            fontSize='30pt'
                            color="inherit"
                        >
                        </PersonOutlineOutlinedIcon>
                        </Grid>
                        <Grid item xs={7} >
                        <TextField
                                    name="searchBar"
                                    fullWidth
                                    id="searchBar"
                                    label="Search"
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
                xs={6}
                sx = {{height : "70%"}}
                id="list-selector-list"
            >{listCard}</Grid>
            <Grid item xs = {6} >
            <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: "grey",borderRadius:"10px" }}>
            <Tabs  aria-label="nav tabs example">
                 <Tab label="Player"  />
                  <Tab label="Comments"  />
            </Tabs>
            <YouTubePlayerExample />
            <Box sx={{ border: 1, borderRadius:"10px", borderColor: 'divider', color: "blue" }}>
            <Grid container spacing = {2} padding = {1} style = {{contentAlign: "center", marginLeft: "20%"}}>
            <Grid item xs = {12}>
            Now Playing
                    <Typography
                            size="large"
                            edge="end"
                            fontSize='30pt'
                            color="inherit"
                        >Playlist: ???
                        </Typography>
                    </Grid>
                    <Grid item xs = {12}>
                    
                    <Typography
                            size="large"
                            edge="end"
                            fontSize='30pt'
                            color="inherit"
                        >Song#: ???
                        </Typography>
                    </Grid>
                    <Grid item xs = {12}>
                    
                    <Typography
                            size="large"
                            edge="end"
                            fontSize='30pt'
                            color="inherit"
                        >Title: ???
                        </Typography>
                    </Grid>
                    <Grid item xs = {12}>
                    
                    <Typography
                            size="large"
                            edge="end"
                            fontSize='30pt'
                            color="inherit"
                        >Artist: ???
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
                        >
                        </FastRewindIcon>
                    </Grid>
                    <Grid item xs = {2}>
                    <StopIcon
                            size="large"
                            edge="end"
                            fontSize='30pt'
                            color="inherit"
                        >
                        </StopIcon>
                    </Grid>
                    <Grid item xs = {2}>
                    <PlayArrowIcon
                            size="large"
                            edge="end"
                            fontSize='30pt'
                            color="inherit"
                        >
                        </PlayArrowIcon>
                    </Grid>
                    <Grid item xs = {2}>
                    <FastForwardIcon
                            size="large"
                            edge="end"
                            fontSize='30pt'
                            color="inherit"
                        >
                        </FastForwardIcon>
                    </Grid>
                </Grid>
            </Box>
            </Box>
            </Box>
             </Grid>
                <Grid item xs = {12}>
                    <Typography
                            size="large"
                            edge="end"
                            fontSize='30pt'
                            color="inherit"
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