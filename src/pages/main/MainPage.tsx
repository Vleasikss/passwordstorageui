import React, {useEffect, useState} from "react";
import Loading from "../../components/loading/Loading";

const MainPage:React.FC = () => {

    const [fetchInProgress, setFetchProgress] = useState(true);

    useEffect(() => {
        //fake request
        fetch('https://jsonplaceholder.typicode.com/todos/')
            .then(response => response.json())
            .then(json => console.log(json))
            .then(() => setFetchProgress(false));
    }, [])
    return(
        <div>
            {fetchInProgress ? <Loading/> : <h1>Hello</h1>}
        </div>
    )
}

export default MainPage;