import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import userService from "../../service/userService";
import AlertComponent from "../../components/alerts/AlertComponent";
import {useAlertDispatch} from "../login/provider/reducers/alert/AlertProvider";
import {showFailureAlert} from "../login/provider/reducers/alert/AlertActions";
import {useHistory} from "react-router-dom";
import Pages from "../../routing/Pages";

const theme = createTheme();

export default function PutCredentialsPage() {
    const dispatch = useAlertDispatch();
    const history = useHistory();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const login: string = data.get("login")!.toString();
        const password: string = data.get("password")!.toString()
        const description: string = data.get("description")!.toString()
        const serviceName: string = data.get("serviceName")!.toString()

        if (!login || !password || !serviceName) {
            return dispatch(showFailureAlert("Empty login, password or service name"))
        }
        return userService.putCredentials({
            serviceName: serviceName!,
            password: password!,
            login: login!,
            description: description!
        })
            .then(result => result.json())
            .then(() => history.push(Pages.MAIN))
            .catch(console.log)
    };

    return (
        <ThemeProvider theme={theme}>
            <AlertComponent/>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Put Credentials
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="serviceName"
                                    label="Service name"
                                    name="serviceName"
                                    autoComplete="serviceName"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="login"
                                    label="Login"
                                    name="login"
                                    autoComplete="login"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="description"
                                    label="Description"
                                    type="text"
                                    multiline={true}
                                    rows={6}
                                    id="description"
                                >
                                </TextField>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Put Credentials
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}