import React from "react";
import Pages from "../../routing/Pages";
import consts from "../../service/consts";
import {useHistory} from "react-router-dom";
import Button from "@mui/material/Button";
import "./styles.css";

const NoAccessPage: React.FC = () => {

    const history = useHistory();

    const followPage = (page: string) => {
        history.push(page)
    }

    return (
        <div className={"centered"}>
            <h1>You have no permission to visit this page</h1>
            <br/>
            {consts.isUserAuthenticated() || <Button onClick={() => followPage(Pages.LOGIN)}>Login</Button>}
        </div>
    )

}

export default NoAccessPage;