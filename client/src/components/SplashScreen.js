import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import AuthContext from '../auth'
export default function SplashScreen() {
    const { auth } = useContext(AuthContext);
    function handleGuest(){
        auth.registerUser("GUEST","GUEST","GUEST","GUEST","GUESTGUEST","GUESTGUEST")
        auth.loginUser("GUEST","GUESTGUEST");
    }
    return (
        <div id="splash-screen">
            <img src="PLL.png" alt="logo" width="300" height="150"></img><br></br>
            <text id="textWelcome">Welcome to Playlister!</text><br></br>
            <br></br>
            <br></br>
            <br></br>
            <text>Playlister is a multifunction playlist creator that allows its users to create, edit, and delete playlists and songs. Playlists can be published publicly where they can be viewed, liked, and played. Try to create a great playlist for your own enjoyment or try to get as many likes and views as you can! </text>
            <br></br>
            <Button component = {Link} to='/register/' sx={{ mt: 20, mb: 2, mr :15,  w:1000}} variant="contained">Create Account</Button>
            <Button component = {Link} to='/login/' sx={{ mt: 20, mb: 2, mr :15,  w:"25%" }} variant="contained">Login</Button>
            <Button component = {Link} to='/' onClick = {handleGuest}sx={{ mt: 20, mb: 2, w:1/4 }} variant="contained">Continue as Guest</Button>
            <br></br>
            <text id="textName">Created by Zachary Lowinger</text>
        </div>
    ) 
}