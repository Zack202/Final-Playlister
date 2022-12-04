import ListItem from '@mui/material/ListItem';
import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
function CommentCard(props){
    const { idNamePair, selected } = props;
let commentElement =<ListItem
            id={idNamePair.userName}
            sx={{ marginTop: '15px', display: 'flex', p: 1, border: 1, alignItems: "start",borderRadius: "10px" }}
            style={{ width: '100%', fontSize: '10pt',color: "blue" }}
            
        >{idNamePair.userName + ": " + idNamePair.comment}</ListItem>
        return(
            commentElement
        );

}
export default CommentCard;