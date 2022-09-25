import React from "react";
import Button from "@material-ui/core/Button";
import {useStyles} from "../LoginPage";

type SubmitButtonProps = {
    text?:string,
    handleButtonClick: (e:React.MouseEvent<HTMLButtonElement>) => void

}
const SubmitButton:React.FC<SubmitButtonProps> = ({text = "", handleButtonClick}) => {
    const classes = useStyles();

    return(
        <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
        className={classes.submit}
        // component={Link}
        // to={/login}
    >
        {text}
    </Button>
    );
}

export default SubmitButton;