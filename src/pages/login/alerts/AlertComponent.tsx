import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import {useAlertDispatch, useAlertState} from "../provider/reducers/alert/AlertProvider";
import {hideAlert} from "../provider/reducers/alert/AlertActions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position:"absolute",
            // width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }),
);

type SuccessAlertProps = {
}
const AlertComponent:React.FC<SuccessAlertProps> = () => {
    const classes = useStyles();
    const dispatch = useAlertDispatch();
    const context = useAlertState();


    return (
        <div className={classes.root}>
            <Collapse in={context.show}>
                <Alert severity={context.type}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                dispatch(hideAlert());
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {context.text}
                </Alert>
            </Collapse>
        </div>
    );
}
export default AlertComponent
