import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import userService from "../../service/userService";
import {Buffer} from "buffer";
import ICredentialsDtoPasswordHidden from "../../model/ICredentialsDtoPasswordHidden";
import Loading from "../../components/loading/Loading";

type CardComponentParams = {
    credentials: ICredentialsDtoPasswordHidden,
    service: string,
    onClickCallback: (password: string) => void
}

const ShowPasswordButton: React.FC<CardComponentParams> = ({credentials, service, onClickCallback}) => {

    const [loading, setLoading] = useState(false)
    const [thisCredentials, setThisCredentials] = useState<ICredentialsDtoPasswordHidden>(credentials)

    const handleShowPasswordButton = () => {
        setLoading(true)
        userService.findPasswordOfCredentials({login: thisCredentials.login, serviceName: service})
            .then(raw => raw.json())
            .then(encryptedData => {
                console.log(encryptedData)
                return Buffer.from(encryptedData.password, "base64");
            })
            .then(buffer => buffer.toString("ascii"))
            .then(password => {
                onClickCallback(password)
                setThisCredentials({...thisCredentials, isPasswordHidden: false, password})
            })
            .then(() => setLoading(false))
    }

    if (loading) {
        return <Loading centered={false}/>
    }

    return (
        thisCredentials.isPasswordHidden
            ? <Button onClick={() => handleShowPasswordButton()}>show</Button>
            : <p>{thisCredentials.password}</p>
    )

}

export default ShowPasswordButton;