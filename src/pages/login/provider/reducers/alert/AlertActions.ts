import {AlertTypes} from "./Alert";

export enum AlertActionTypes {
    show = "SHOW_ALERT",
    hide = "HIDE_ALERT"
}
export type AlertAction = {
    type: AlertActionTypes;
    payload?: any;
}

export const showAlert = (text:string, alertType:AlertTypes):AlertAction => {
    return {
        type: AlertActionTypes.show,
        payload: {text:text, type:alertType}
    };
};
export const showSuccessAlert = (text:string):AlertAction => {
    return {
        type:AlertActionTypes.show,
        payload: {text:text, type:AlertTypes.SUCCESS}
    }
}
export const showFailureAlert = (text:string):AlertAction => {
    return {
        type:AlertActionTypes.hide,
        payload: {text:text, type:AlertTypes.ERROR}
    }
}
export const hideAlert = () => {
    return {
        type: AlertActionTypes.hide,
    }
}
