import React from "react";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import Pages from "../../routing/Pages";

type CardComponentParams = {
    value: string
}
const CardComponent: React.FC<CardComponentParams> = ({value}) => {
    const history = useHistory();

    const handleButtonSubmit = () => {
        history.push(Pages.SERVICE_CREDENTIALS.replaceAll(":service", value))
    }

    return (
        <Button onClick={handleButtonSubmit} key={value}>{value}</Button>
    )

}

export default CardComponent;