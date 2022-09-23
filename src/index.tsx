import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {ValidatorForm} from "react-material-ui-form-validator";
const buildValidationRules = () => {
    ValidatorForm.addValidationRule("passwordMinLength", (value) => 8 <= value.length);
    ValidatorForm.addValidationRule("passwordMaxLength", (value => value.length <= 24));
    ValidatorForm.addValidationRule("nameLength", (value) => value.length < 18);

}

buildValidationRules();

ReactDOM.render(<App/>, document.getElementById("root"));