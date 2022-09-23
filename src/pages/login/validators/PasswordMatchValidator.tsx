import React, {useEffect} from "react";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";

type PasswordMatchValidatorProps = {
    value: string,
    valueToMatch:string
    handlePasswordMatchInputChange: (e:React.ChangeEvent<HTMLInputElement>) => void

}
const PasswordMatchValidator:React.FC<PasswordMatchValidatorProps> = ({value,
                                                                          handlePasswordMatchInputChange,
                                                                          valueToMatch}) => {

    useEffect( () => {
        const matchPasswords = (value:string):boolean =>{
            return value === valueToMatch;
        }
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            return matchPasswords(value);
        });

    }, [value, valueToMatch]);

    return(
        <TextValidator
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="passwordRepeated"
        onChange={handlePasswordMatchInputChange}
        type="password"
        id="password-repeated"
        label="Repeat password"
        validators={['isPasswordMatch', 'required']}
        errorMessages={['Passwords mismatch', 'This field is required']}
        value={value}
    />);
}

export default PasswordMatchValidator;