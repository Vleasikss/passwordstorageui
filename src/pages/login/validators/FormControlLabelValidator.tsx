import React from "react";

type FormControlLabelValidatorProps = {
    value: boolean,
    handleFormControlLabelClick: () => void
}
const FormControlLabelValidator:React.FC<FormControlLabelValidatorProps> = (value, handleFormControlLabelClick) => {


    return(
        <label onClick={() => handleFormControlLabelClick}>
            <input type={"checkbox"} color="primary" name="remember"  onChange={() => handleFormControlLabelClick()}/>
            Remember me
        </label>


    );
}
export default FormControlLabelValidator;