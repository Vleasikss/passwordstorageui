export enum AlertTypes {
    WARNING = "warning",
    ERROR = "error",
    SUCCESS = "success"
}

export interface Alert {
    show:boolean,
    text:string,
    type:AlertTypes;
}