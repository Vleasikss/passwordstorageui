import {Alert} from "./Alert";
import {AlertAction, AlertActionTypes} from "./AlertActions";

export const alertReducer = (state: Alert, action: AlertAction):Alert => {
    switch (action.type) {
        case AlertActionTypes.show:
            return {...state, show:true, text: action.payload?.text, type: action.payload?.type};
        case AlertActionTypes.hide:
            return {...state, show: false};
        default:
            return state;
    }
}