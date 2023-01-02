import React, {useEffect, useState} from "react";
import Loading from "../../components/loading/Loading";
import userService from "../../service/userService";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import Pages from "../../routing/Pages";
import utf8 from "utf8";
import base64 from "base-64";
import consts from "../../service/consts";

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
        // the filename you want
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    const handleExportClick = () => {
        setFetchProgress(true)
        userService.exportUserData()
            .then(result => result.json())
            .then(s => {
                return downloadByteArray(consts.userLogin() + "-text-credentials", s.bytes, "text/plain")
            })
            .then(() => setFetchProgress(false))
    };
    const handleExcelExportClick = () => {
        setFetchProgress(true)
        userService.exportUserDataExcel()
            .then(response => response.blob())
            .then(s => {
                return downloadReadableStream(s, consts.userLogin() + "-excel-credentials.xlsx")
            })
            .then(() => setFetchProgress(false))
    }

    const handleButtonSubmit = (service: string) => {
        history.push(Pages.SERVICE_CREDENTIALS.replaceAll(":service", service))
    }

    if (fetchInProgress) {
        return (<Loading centered={true}/>)
    }

    return (
        <div>
            <div>
                <Button color={"primary"} onClick={handleExportClick}>Export Text Credentials</Button>
                <Button color={"primary"} onClick={handleExcelExportClick}>Export Excel Credentials</Button>
            </div>
            {services.map(s => <Button onClick={() => handleButtonSubmit(s)} key={s}>{s}</Button>)}
        </div>
    )

}

export default MainPage;