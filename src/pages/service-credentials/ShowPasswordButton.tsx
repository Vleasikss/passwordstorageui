import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import userService from "../../service/userService";
import ICredentialsDtoPasswordHidden from "../../model/ICredentialsDtoPasswordHidden";
import Loading from "../../components/loading/Loading";
import base64 from "base-64"
import utf8 from "utf8"

type CardComponentParams = {
    credentials: ICredentialsDtoPasswordHidden,
    service: string,
}

const ShowPasswordButton: React.FC<CardComponentParams> = ({credentials, service}) => {

    const [loading, setLoading] = useState(false)
    const [thisCredentials, setThisCredentials] = useState<ICredentialsDtoPasswordHidden>(credentials)

    const handleShowPasswordButton = () => {
        setLoading(true)
        userService.findPasswordOfCredentials({login: thisCredentials.login, serviceName: service})
            .then(raw => raw.json())
            .then(encryptedData => utf8.decode(base64.decode(base64.decode((encryptedData.password)))))
            .then((password) => setThisCredentials({...thisCredentials, isPasswordHidden: false, password}))
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