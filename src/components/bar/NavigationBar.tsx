import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useHistory} from "react-router-dom";
import Pages from "../../routing/Pages";
import consts from "../../service/consts";

type ToolbarPage = {
    title: string,
    onClick: (history: any) => void
}
const pages: ToolbarPage[] = [
    {
        title: "New creds",
        onClick: (history) => history.push(Pages.PUT_CREDENTIALS)
    },
    {
        title: "Main",
        onClick: (history) => history.push(Pages.MAIN)
    }
]
const NavigationBar: React.FC = () => {
    const [username, setUsername] = useState(consts.userLogin())

    const history = useHistory();
    const isUserAuthenticated = () => consts.isUserAuthenticated();

    const handleLogoutButton = () => {
        consts.logout();
        setUsername("")
        history.push(Pages.LOGIN)
    }

    const showAuthenticated = () => {
        return (
            <>
                <Box style={{margin: 10}}>
                    {pages.map((page) => (
                        <Button
                            key={page.title}
                            sx={{my: 2, color: 'white', display: 'block'}}
                            onClick={() => page.onClick(history)}
                        >
                            {page.title}
                        </Button>
                    ))}
                </Box>
                <p style={{marginRight: 10}}>{username}</p>
                <Button color="inherit" onClick={handleLogoutButton}>Logout</Button>
            </>
        )
    }
    const showNotAuthenticated = () => {
        return (
            <Button color={"inherit"}>Login</Button>
        )
    }

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{flexGrow: 1}}>Password Storage</Typography>
                    {isUserAuthenticated() ? showAuthenticated() : showNotAuthenticated()}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default NavigationBar;
