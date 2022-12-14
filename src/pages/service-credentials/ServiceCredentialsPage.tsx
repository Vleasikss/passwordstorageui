import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import Loading from "../../components/loading/Loading";
import userService from "../../service/userService";
import CredentialsTable from "./CredentialsTable";
import ICredentialsDto from "../../model/ICredentialsDto";
import {Button} from "@mui/material";
import {useAlertDispatch} from "../login/provider/reducers/alert/AlertProvider";
import {showFailureAlert, showSuccessAlert} from "../login/provider/reducers/alert/AlertActions";
import Pages from "../../routing/Pages";
import AlertComponent from "../../components/alerts/AlertComponent";

const ServiceCredentialsPage: React.FC = () => {
    const {service} = useParams<{ service: string }>();
    const [fetchInProgress, setFetchProgress] = useState(true);
    const [credentials, setCredentials] = useState<ICredentialsDto[]>()
    const dispatch = useAlertDispatch();
    const history = useHistory();

    useEffect(() => {
        userService.findAllCredentialsByService(service)
            .then(result => result.json())
            .then((values: ICredentialsDto[]) => values.map(s => ({...s, serviceName: service})))
            .then((values: ICredentialsDto[]) => setCredentials(values))
            .then(() => setFetchProgress(false))
            .catch(console.error)
    }, [])


    const dropService = () => {
        const shouldDelete = window.confirm(`Are you sure you wanna delete credentials for service ${service}`)
        if (!shouldDelete) {
            return
        }
        setFetchProgress(true)
        userService.dropService({serviceName: service})
            .then(result => result.json())
            .then(response => {
                console.log(response)
                if (response.deleted) {
                    dispatch(showSuccessAlert(`Successfully dropped service ${service}`))
                    history.push(Pages.MAIN)
                }
                dispatch(showFailureAlert(`Unable to drop service ${service} :(`))
            })
            .catch(() => dispatch(showFailureAlert(`Unable to drop service ${service} :(`)))
            .finally(() => setFetchProgress(false))

    };


    if (fetchInProgress) {
        return <Loading centered={true}/>
    }

    return (
        <div>
            <AlertComponent/>
            <Button onClick={dropService} color={"error"}>Drop service</Button>
            <CredentialsTable initCredentialsList={credentials!}/>
        </div>
    )
}

export default ServiceCredentialsPage;