import React from 'react';
import YouTube from 'react-youtube';
import { GlobalStoreContext } from './store'
import { useContext, useState, useEffect } from 'react'

export default function YouTubePlayerExample() {
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT
    
    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    //let playlist = [
    //    "mqmxkGjow1A",
    //    "8RbXIMZmVv8",
     //   "8UbNbor3OqQ"
    //];
    const { store } = useContext(GlobalStoreContext);
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
        if(store.currentList){
        let song = store.songlist[store.currentSongNumber];
        player.loadVideoById(song);
        player.playVideo();
        }
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        let checker = store.currentSongNumber;
        checker++;
        checker = checker % store.songlist.length;
        store.getCurrentSongNum(checker);
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
            player.playVideo();
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            if(store.currentList){
            store.checkListens(store.currentList._id);
            }
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
            //player.playVideo();
            
        }
    
    var playButton1 = document.getElementById("play-button");
        playButton1.addEventListener("click", function() {
        player.playVideo();
        });

        var playButton2 = document.getElementById("stop-button");
        playButton2.addEventListener("click", function() {
        player.pauseVideo();
        });


    
    }
    return <YouTube
        videoId={store.currentList ? store.songlist[store.currentSongNumber] : ""}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange} />;
}