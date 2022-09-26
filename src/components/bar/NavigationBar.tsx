import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useHistory} from "react-router-dom";
import Pages from "../../routing/Pages";
import consts from "../../service/consts";
import {useState} from "react";

const NavigationBar: React.FC = () => {

    const [username, setUsername] = useState(consts.userLogin())

    const history = useHistory();

    const handleLogoutButton = () => {
        consts.logout();
        setUsername("")
        history.push(Pages.LOGIN)
    }

    const showUser = () => {
        if (username) {
            return (
                <>
                    <p style={{marginRight: 10}}>{username}</p>
                    <p/>
                    <Button color="inherit" onClick={handleLogoutButton}>Logout</Button>
                </>
            )
        }
        return <Button color={"inherit"}>Login</Button>
    }

    return (
        <Box sx={{ flexGrow: 1}} style={{marginBottom: 10}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>News</Typography>
                    {showUser()}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default NavigationBar;
