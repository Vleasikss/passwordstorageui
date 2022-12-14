import React, {useEffect, useState} from "react";
import Loading from "../../components/loading/Loading";
import userService from "../../service/userService";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import Pages from "../../routing/Pages";

const MainPage: React.FC = () => {
    const history = useHistory();

    const [fetchInProgress, setFetchProgress] = useState(true);
    const [services, setServices] = useState<string[]>([])

    useEffect(() => {
        userService.findAllServices()
            .then(result => result.json())
            .then(result => setServices(result))
            .then(() => setFetchProgress(false))
            .catch(console.error)
    }, [])

    const handleButtonSubmit = (service: string) => {
        history.push(Pages.SERVICE_CREDENTIALS.replaceAll(":service", service))
    }

    if (fetchInProgress) {
        return (<Loading centered={true}/>)
    }

    return (
        <div>
            {services.map(s => <Button onClick={() => handleButtonSubmit(s)} key={s}>{s}</Button>)}
        </div>
    )

}

export default MainPage;