import React, {useState} from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ICredentialsDto from "../../model/ICredentialsDto";
import {useParams} from "react-router-dom";
import ShowPasswordButton from "./ShowPasswordButton";
import Button from "@mui/material/Button";
import userService from "../../service/userService";
import {showFailureAlert, showSuccessAlert} from "../login/provider/reducers/alert/AlertActions";
import {useAlertDispatch} from "../login/provider/reducers/alert/AlertProvider";
import Loading from "../../components/loading/Loading";


interface ICredentialsDtoPasswordHidden extends ICredentialsDto {
    isPasswordHidden: boolean,
    password: string
}

type CredentialsTableParams = {
    initCredentialsList: ICredentialsDto[]
}

const CredentialsTable: React.FC<CredentialsTableParams> = ({initCredentialsList}) => {
    const dispatch = useAlertDispatch();

    const [credentialsList, setCredentialsList] = useState<ICredentialsDtoPasswordHidden[]>(
        initCredentialsList.map(s => ({...s, isPasswordHidden: true, password: ""}))
    );
    const [loading, setLoading] = useState<boolean>()
    const {service} = useParams<{ service: string }>()


    const dropPassword = (credentials: ICredentialsDtoPasswordHidden) => {
        const shouldDelete = window.confirm(`Are you sure you wanna delete credentials for login ${credentials.login}`)
        if (!shouldDelete) {
            return
        }
        setLoading(true)
        userService
            .dropCredentials({serviceName: service, login: credentials.login})
            .then(raw => raw.json())
            .then(response => {
                if (response.deleted) {
                    dispatch(showSuccessAlert("Successfully removed credentials"));
                    setCredentialsList(credentialsList.filter(s => s.login != credentials.login))
                    return
                }
                dispatch(showFailureAlert("Unable to remove credentials :("));
            })
            .catch(() => dispatch(showFailureAlert("Unable to remove credentials :(")))
            .finally(() => setLoading(false))
    }


    if (loading) {
        return <Loading/>
    }

    return (
        <TableContainer style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }} component={Paper}>
            <Table sx={{maxWidth: 500}} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Login</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Password</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {credentialsList.map((row) => (
                        <TableRow
                            key={row.login}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">{row.login}</TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="right">
                                {row.isPasswordHidden
                                    ? <ShowPasswordButton credentials={row} service={service}/>
                                    : row.password
                                }
                            </TableCell>
                            <TableCell><Button onClick={() => dropPassword(row)}>Drop</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CredentialsTable;