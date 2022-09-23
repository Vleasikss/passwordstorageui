import React from "react";
import {TextValidator} from "react-material-ui-form-validator";
import {makeStyles} from "@material-ui/core/styles";


type PasswordValidatorProps = {
    value: string,
    toValidate?: boolean
    handlePasswordInputChange: (e:React.ChangeEvent<HTMLInputElement>) => void
}

const useStyles = makeStyles((theme) => ({
    button: {
        // position: "absolute",
        // maxWidth: 247
    }
}));

const PasswordValidator:React.FC<PasswordValidatorProps> = ({value,
                                                                handlePasswordInputChange,
                                                                toValidate=true}) => {

    const classNames = useStyles();

    return(
        <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={value}
            name="password"
            className={classNames.button}
            label="Password"
            onChange={handlePasswordInputChange}
            type="password"
            id="password"
            validators={toValidate ? ['passwordMinLength', 'passwordMaxLength']: []}
            errorMessages={['Must be not less than 8 symbols', 'Must be no more than 24 symbols']}
        />
    );
}

export default PasswordValidator;