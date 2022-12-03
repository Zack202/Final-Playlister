import { padding } from '@mui/system';
import YouTube from 'react-youtube';
import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from './store/index'

export default function YouTubePlayerExample() {
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT
    const { store } = useContext(GlobalStoreContext);
    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    const playlist = [];
    let currentSong = 0;
    if(store.currentList){
        if(store.currentList.songs){
            
    store.currentList.songs.forEach(addYt);
    function addYt(song){
        playlist.push(song.youTubeId);
    }
}   
}
    //let playlist = [
    //    "mqmxkGjow1A",
    //    "8RbXIMZmVv8",
    //    "8UbNbor3OqQ"
    //];

    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST

    const playerOptions = {
        height: '280',
        width: '605',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = playlist[currentSong];
        store.getCurrentSongNum(store.currentSongNumber);
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        console.log(store.currentSongNumber);
        store.getCurrentSongNum(store.currentSongNumber +1);
        console.log(store.currentSongNumber);
        store.getCurrentSongNum(store.currentSongNumber % playlist.length);
        console.log(store.currentSongNumber);
    }
    function decSong() {
        console.log(currentSong);
        currentSong--;
        if(currentSong < 0){
            currentSong = playlist.length -1;
        }
        console.log(currentSong);
    }

    function onPlayerReady(event) {
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
            store.increaseListen();
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
        var playButton = document.getElementById("play-button");
        playButton.addEventListener("click", function() {
        player.playVideo();
        });

        var playButton = document.getElementById("stop-button");
        playButton.addEventListener("click", function() {
        player.pauseVideo();
        });

        var playButton = document.getElementById("prev-button");
        playButton.addEventListener("click", function() {
            currentSong--;
        currentSong = currentSong % playlist.length;
            console.log(currentSong);
        loadAndPlayCurrentSong(player)
        });

        var playButton = document.getElementById("next-button");
        playButton.addEventListener("click", function() {
            console.log(currentSong);
            currentSong++;
            if(currentSong > playlist.length){
                currentSong = 0;
            }
        loadAndPlayCurrentSong(player)
        });
    }


    return <YouTube
        videoId={playlist[currentSong]}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange} 
        
        />;
        
}