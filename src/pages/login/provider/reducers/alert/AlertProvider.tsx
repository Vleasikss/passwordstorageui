import React, {useEffect, useReducer} from "react";
import {alertReducer} from "./AlertReducers";
import {DEFAULT_SUCCESS_ALERT} from "./AlertContext";
import {Alert} from "./Alert";
import {AlertAction, hideAlert} from "./AlertActions";

export const alertState = React.createContext<Alert>(DEFAULT_SUCCESS_ALERT);
export const alertDispatch = React.createContext<React.Dispatch<AlertAction> | undefined>(undefined);


export const AlertProvider = ({children}: { children: React.ReactNode; }) => {

    const [state, dispatch] = useReducer(alertReducer, DEFAULT_SUCCESS_ALERT);


    useEffect(() => {
        const closeAutomatically = () => {
            setTimeout(() => dispatch(hideAlert()), 5000)
        }
        closeAutomatically();
    },[state]);

    return (
        <alertState.Provider value={state}>
        <alertDispatch.Provider value={dispatch}>
            {children}
        </alertDispatch.Provider>
        </alertState.Provider>
    );
};

export const useAlertState = (): Alert => {
    const context = React.useContext(alertState);
    if (undefined === context) {
        throw new Error("Please use within SuccessAlertStateProvider");
    }
    return context;
}
export const useAlertDispatch = (): React.Dispatch<AlertAction> => {
    const context = React.useContext(alertDispatch);
    if (undefined === context) {
        throw new Error("Please use within SuccessAlertDispatchProvider");
    }
    return context;
}