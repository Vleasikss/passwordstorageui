import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Loading from "../../components/loading/Loading";
import userService from "../../service/userService";
import CredentialsTable from "./CredentialsTable";
import ICredentialsDto from "../../model/ICredentialsDto";

const ServiceCredentialsPage: React.FC = () => {
    const { service } = useParams<{service: string}>();
    const [fetchInProgress, setFetchProgress] = useState(true);
    const [credentials, setCredentials] = useState<ICredentialsDto[]>()

    useEffect(() => {
        userService.findAllCredentialsByService(service)
            .then(result => result.json())
            .then(setCredentials)
            .then(() => setFetchProgress(false))
            .catch(console.error)
    }, [])

    if (fetchInProgress) {
        return <Loading centered={false}/>
    }

    return (<CredentialsTable initCredentialsList={credentials!}/>)
}

export default ServiceCredentialsPage;