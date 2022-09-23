import React from "react";
import {TextValidator} from "react-material-ui-form-validator";


type EmailValidatorProps = {
    value: string
    handleMailInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    toValidate?: boolean
}


const EmailValidator:React.FC<EmailValidatorProps> = ({value,
                                                          handleMailInputChange,
                                                          toValidate=true}) => {
    return(
        <TextValidator
            onChange={handleMailInputChange}
            name="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            value={value}
            validators={toValidate ? ['required', 'isEmail'] : []}
            errorMessages={['This field is required', 'Email is not valid']}
        />
    );

}

export default EmailValidator;