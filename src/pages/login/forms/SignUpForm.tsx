import React, {useRef, useState} from "react";
import {Copyright, useStyles} from "../LoginPage";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {Link} from "@material-ui/core";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import EmailValidator from "../validators/EmailValidator";
import PasswordValidator from "../validators/PasswordValidator";
import SubmitButton from "../validators/SubmitButton";
import PasswordMatchValidator from "../validators/PasswordMatchValidator";
import {useAlertDispatch, useAlertState} from "../provider/reducers/alert/AlertProvider";
import {showFailureAlert, showSuccessAlert} from "../provider/reducers/alert/AlertActions";
import {useHistory} from "react-router-dom";
import Pages from "../../../routing/Pages";
import userService from "../../../service/userService";


interface UserFormSignUp {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    remember: boolean

}


const SignUpForm: React.FC = () => {
    const history = useHistory();
    const dispatch = useAlertDispatch();

    const [form, setForm] = useState<UserFormSignUp>({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        remember: false
    });

    const [repeatedPassword, setRepeatedPassword] = useState("");
    const inputEl = useRef(null);

    const isFormValid = (): boolean => {

        // @ts-ignore
        const childs = inputEl.current.childs || [];
        for (let i = 0; i < childs.length; i++) {
            // @ts-ignore
            if (!childs[i].state.isValid) {
                return false;
            }
        }
        return form.password !== "" && form.email !== ""
            && form.firstName !== "" && form.lastName !== ""
            && repeatedPassword !== "" && repeatedPassword === form.password;
    }

    /**
     * The main event on submitting form
     */
    const handleSubmitButtonClick = (): any => {
        if (!isFormValid()) {
            return dispatch(showFailureAlert("Invalid form"))
        }
        return userService.createNewUser({username: form.firstName, password: form.password})
            .then(result => {
                if (result) {
                    dispatch(showSuccessAlert("successfully registered new user"))
                    return history.push(Pages.LOGIN);
                } else {
                    dispatch(showFailureAlert("unable to create new user"))
                }
            })
            .catch(console.log)
    }
    const handleCheckBoxClick = (): void => {
        setForm({...form, remember: !form.remember});
    }
    const handleMailInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, email: event.target.value});

    }
    const handlePasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, password: event.target.value});
    }
    const handleFirstNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, firstName: event.target.value});
    }
    const handleLastNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, lastName: event.target.value});
    }
    const handleRepeatedPasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatedPassword(event.target.value);
    }

    return (
        <ValidatorForm ref={inputEl}
                       onSubmit={() => {
                           history.push('/login')
                       }}>
            <TextValidator
                variant="outlined"
                margin="normal"
                value={form.lastName}
                required
                fullWidth
                id="lastName"
                validators={["required", "nameLength"]}
                errorMessages={['this field is required', 'Last name is too long']}
                label="Last name"
                name="lastName"
                onChange={handleLastNameInputChange}
            />
            <TextValidator
                variant="outlined"
                required
                fullWidth
                value={form.firstName}
                validators={["required", "nameLength"]}
                errorMessages={['this field is required', 'First name is too long']}
                margin="normal"
                id="firstName"
                label="First name"
                name="firstName"
                onChange={handleFirstNameInputChange}
            />
            <EmailValidator value={form.email}
                            handleMailInputChange={handleMailInputChange}/>
            <PasswordValidator value={form.password}
                               handlePasswordInputChange={handlePasswordInputChange}/>
            <PasswordMatchValidator value={repeatedPassword}
                                    valueToMatch={form.password}
                                    handlePasswordMatchInputChange={handleRepeatedPasswordInputChange}/>

            <FormControlLabel
                control={<Checkbox value="remember" color="primary" onChange={() => handleCheckBoxClick()}/>}
                label="Remember me"
            />
            <SubmitButton handleButtonClick={handleSubmitButtonClick} text={"Sign up"}/>


            <Grid container>
                <Grid item>
                    <Link href={"/login"} variant="body2">
                        {"Already have an account? Sign in"}
                    </Link>
                </Grid>
            </Grid>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </ValidatorForm>
    )
}

export default SignUpForm;