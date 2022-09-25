import React, {useEffect, useState} from "react";
import Loading from "../../components/loading/Loading";
import userService from "../../service/userService";
import CardComponent from "./CardComponent";

const MainPage:React.FC = () => {

    const [fetchInProgress, setFetchProgress] = useState(true);
    const [services, setServices] = useState<string[]>([])


    useEffect(() => {
        userService.findAllServices()
            .then(result => result.json())
            .then(result => setServices(result))
            .then(() => setFetchProgress(false))
            .catch(console.error)
    }, [])

    if (fetchInProgress) {
        return <Loading/>
    }

    return (
        <div>
            {services.map(s => <CardComponent key={s} value={s}/>)}
        </div>
    )

}

export default MainPage;