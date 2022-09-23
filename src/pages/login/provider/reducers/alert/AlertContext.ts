import {Alert, AlertTypes} from "./Alert";
import React from "react";
import {AlertAction} from "./AlertActions";

export const DEFAULT_SUCCESS_ALERT: Alert = {text: "", show:false, type: AlertTypes.SUCCESS};
export const DEFAULT_FAILURE_ALERT: Alert = {text: "", show:false, type: AlertTypes.ERROR};
export const DEFAULT_WARNING_ALERT: Alert = {text: "", show:false, type: AlertTypes.WARNING};

export type SuccessAlertContext = {
    successAlert: Alert;
    alertDispatch: React.Dispatch<AlertAction>;
};

