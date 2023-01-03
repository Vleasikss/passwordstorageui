import React, {useRef, useState} from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import {Copyright} from "../LoginPage";
import PasswordValidator from "../validators/PasswordValidator";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import SubmitButton from "../validators/SubmitButton";
import {useAlertDispatch} from "../provider/reducers/alert/AlertProvider";
import {showFailureAlert, showSuccessAlert} from "../provider/reducers/alert/AlertActions";
import {useHistory} from "react-router-dom";
import userService from "../../../service/userService";
import consts from "../../../service/consts";
import Pages from "../../../routing/Pages";


interface UserFormLogin {
    username: string,
    password: string,
    remember: boolean
}

const LoginForm: React.FC = () => {
    const dispatch = useAlertDispatch();
    const history = useHistory();
    const [form, setForm] = useState<UserFormLogin>({
        username: '',
        password: '',
        remember: false
    });
    const inputEl = useRef(null);

    const isFormValid = () => {
        // @ts-ignore
        const childs = inputEl.current.childs || [];
        for (let i = 0; i < childs.length; i++) {
            if (!childs[i].state.isValid) {
                return false;
            }
        }
        if (form.password !== "" && form.username !== "") {
            return true;
        }
    }

    /**
     * The main event on submitting form
     */
    const handleSubmitButtonClick = async (): Promise<void> => {
        if (!isFormValid()) {
            return dispatch(showFailureAlert("Login or password is incorrect"))
        }
        const result = await userService.loginUser({username: form.username, password: form.password})
            .then(response => response.json())
            .then(maybeUser => {
                if (maybeUser.token !== undefined) {
                    dispatch(showSuccessAlert("Signed in successfully"));
                    consts.setAuthentication(maybeUser.token, maybeUser.username)
                    return true
                } else {
                    dispatch(showFailureAlert("Login or password is incorrect"))
                    return false
                }
            })
            .catch(console.log)

        if (result) {
            history.push(Pages.MAIN)
            return window.location.reload()
        }
    }

    const handleUsernameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, username: event.target.value});
    }
    const handlePasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setForm({...form, password: event.target.value});
    }
    const handleCheckBoxClick = (): void => {
        setForm({...form, remember: !form.remember});
    }

    return (
        <ValidatorForm ref={inputEl}
                       onSubmit={() => {
                           // todo change forward path
                           history.push('/main')
                       }}>
            <TextValidator
                variant="outlined"
                required
                fullWidth
                value={form.username}
                validators={["required", "nameLength"]}
                errorMessages={['this field is required', 'First name is too long']}
                margin="normal"
                id="username"
                label="Username"
                name="username"
                onChange={handleUsernameInputChange}
            />
            <PasswordValidator toValidate={false}
                               value={form.password}
                               handlePasswordInputChange={handlePasswordInputChange}/>
            <FormControlLabel
                control={<Checkbox value="remember"
                                   color="primary"
                                   onChange={() => handleCheckBoxClick()}/>}
                label="Remember me"
            />
            <SubmitButton handleButtonClick={handleSubmitButtonClick} text={"Log in"}/>

            <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href={"/signup"} variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </ValidatorForm>
    );
}

export default LoginForm