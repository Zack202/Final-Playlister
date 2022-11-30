import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { Grid, Typography } from '@mui/material';
import WorkspaceScreen from './WorkspaceScreen';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [expandActive, setExpandActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        setExpandActive(false);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
            document.getElementById(id).style.color = "red";
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    function handleExpandSongs(event,id){
        event.stopPropagation();
        handleLoadList(event, id);
        setExpandActive(!expandActive);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    
    let x = <Box></Box>
    let y = <KeyboardDoubleArrowDownIcon style={{fontSize:'18pt'}} />
    if (store.currentList){
        if((store.currentList._id == idNamePair._id) && expandActive){
        x = <WorkspaceScreen></WorkspaceScreen>
        y = <KeyboardDoubleArrowUpIcon style={{fontSize:'18pt'}}></KeyboardDoubleArrowUpIcon>
    }
}

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1, border: 1, alignItems: "start",borderRadius: "10px" }}
            style={{ width: '100%', fontSize: '16pt',color: "blue" }}
            button
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }}
        >
        <Grid container spacing={1}>
            <Grid item xs={8}>{idNamePair.name}</Grid>
            <Grid item xs={2}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <ThumbUpOffAltIcon style={{fontSize:'18pt'}} />
                </IconButton>
                12
            </Grid>
            <Grid item xs={2} >
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                    <ThumbDownOffAltIcon style={{fontSize:'18pt'}} />
                </IconButton>
                12
            </Grid>
            <Grid item xs={12} >
                <Typography style={{fontSize:'10pt'}}>
                    By: McKilla Gorilla
                </Typography> 
            </Grid>
            <Grid item xs={12} id={idNamePair._id + idNamePair._id}>
                
                    
                {x}
            </Grid>
            <Grid item xs={8} >
                <Typography style={{fontSize:'10pt'}}>
                    Published: Date
                </Typography> 
            </Grid>
            <Grid item xs={3} >
                <Typography style={{fontSize:'10pt'}}>
                    Listens: 69
                </Typography> 
            </Grid>
            <Grid item xs={1}>
                <IconButton onClick={(event) => {
                handleExpandSongs(event, idNamePair._id)
            }} aria-label='expand'>
                    {y}
                </IconButton>
            </Grid>
           </Grid> 
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;