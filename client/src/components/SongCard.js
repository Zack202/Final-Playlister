import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index } = props;

    function handleDragStart(event) {
        if(store.currentList){
            if(store.currentList.published == blankDate.toISOString()){
                event.dataTransfer.setData("song", index);
            }
        }
    }

    function handleDragOver(event) {
        if(store.currentList){
            if(store.currentList.published == blankDate.toISOString()){
        event.preventDefault();
            }}
    }

    function handleDragEnter(event) {
        if(store.currentList){
            if(store.currentList.published == blankDate.toISOString()){
        event.preventDefault();
        setDraggedTo(true);}}
    }

    function handleDragLeave(event) {
        if(store.currentList){
            if(store.currentList.published == blankDate.toISOString()){
        event.preventDefault();
        setDraggedTo(false);}}
    }

    function handleDrop(event) {if(store.currentList){
        if(store.currentList.published == blankDate.toISOString()){
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }}}
    function handleRemoveSong(event) {
        store.showRemoveSongModal(index, song);
    }
    function handleClick(event) {
        if(store.currentList){
            if(store.currentList.published == blankDate.toISOString()){
        event.stopPropagation();
        // DOUBLE CLICK IS FOR SONG EDITING
        if (event.detail === 2) {
            store.showEditSongModal(index, song);
        }}}
    }
    let removeSongButton = <input
    type="button"
    id={"remove-song-" + index}
    className="list-card-button"
    value={"\u2715"}
    onClick={handleRemoveSong}
/>;
const blankDate = new Date(0);
    if(store.currentList){
        if(store.currentList.published !== blankDate.toISOString()){
            removeSongButton = <div></div>;
        }
    }
    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            onClick={handleClick}
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                >
                {song.title} by {song.artist}
            </a>
            {removeSongButton}
        </div>
    );
}

export default SongCard;