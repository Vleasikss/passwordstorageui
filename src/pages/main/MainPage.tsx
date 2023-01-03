import React, {useEffect, useState} from "react";
import Loading from "../../components/loading/Loading";
import userService from "../../service/userService";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import Pages from "../../routing/Pages";
import utf8 from "utf8";
import base64 from "base-64";
import consts from "../../service/consts";
import {useAlertDispatch} from "../login/provider/reducers/alert/AlertProvider";
import {showSuccessAlert} from "../login/provider/reducers/alert/AlertActions";

const MainPage: React.FC = () => {
    const history = useHistory();

    const [fetchInProgress, setFetchProgress] = useState(true);
    const [exportInProgress, setExportProgress] = useState(false);
    const [services, setServices] = useState<string[]>([])
    const dispatch = useAlertDispatch();

    useEffect(() => {
        userService.findAllServices()
            .then(result => result.json())
            .then(result => setServices(result))
            .then(() => setFetchProgress(false))
            .catch(console.error)
    }, [])


    function downloadByteArray(reportName: string, bytes: any, type: string) {
        const decoded = utf8.decode(base64.decode(bytes))

        const blob = new Blob([decoded], {type});
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = reportName;
        link.click();
    }

    function downloadReadableStream(blob: any, filename: string) {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    const handleExportClick = () => {
        setExportProgress(true)
        const userLogin = consts.userLogin()
        userService.exportUserData()
            .then(result => result.json())
            .then(s => downloadByteArray(userLogin + "-text-credentials", s.bytes, "text/plain"))
            .then(() => setExportProgress(false))
            .then(() => dispatch(showSuccessAlert("Successfully export txt credentials for user: " + userLogin)))
    };
    const handleExcelExportClick = () => {
        setExportProgress(true)
        const userLogin = consts.userLogin()
        userService.exportUserDataExcel()
            .then(response => response.blob())
            .then(s => downloadReadableStream(s, userLogin + "-excel-credentials.xlsx"))
            .then(() => setExportProgress(false))
            .then(() => dispatch(showSuccessAlert("Successfully export excel credentials for user: " + userLogin)))
    }

    const handleButtonSubmit = (service: string) => {
        history.push(Pages.SERVICE_CREDENTIALS.replaceAll(":service", service))
    }

    if (fetchInProgress || exportInProgress) {
        return (<>
                <Loading centered={true}/>
                {exportInProgress && <p style={{border: "1px dotted black", textAlign: "center"}}>This will take some time to export the credentials, please wait</p>}
            </>
        )
    }

    return (
        <div>
            <div>
                <Button color={"primary"} onClick={handleExportClick}>Export Text Credentials</Button>
                <Button color={"primary"} onClick={handleExcelExportClick}>Export Excel Credentials</Button>
            </div>
            {services.map(s => <Button style={{border: "1px dotted black", margin: 10}}
                                       onClick={() => handleButtonSubmit(s)} key={s}>{s}</Button>)}
        </div>
    )

}

export default MainPage;