import React, {useState} from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ICredentialsDto from "../../model/ICredentialsDto";
import {Button} from "@mui/material";
import userService from "../../service/userService";
import {Buffer} from "buffer"
import {useParams} from "react-router-dom";
import ShowPasswordButton from "./ShowPasswordButton";


interface ICredentialsDtoPasswordHidden extends ICredentialsDto {
    isPasswordHidden: boolean,
    password: string
}

type CredentialsTableParams = {
    initCredentialsList: ICredentialsDto[]
}

const CredentialsTable: React.FC<CredentialsTableParams> = ({initCredentialsList}) => {

    const [credentialsList, setCredentialsList] = useState<ICredentialsDtoPasswordHidden[]>(initCredentialsList.map(s => ({...s, isPasswordHidden: true, password: ""})));
    const { service } = useParams<{service: string}>()
    const findElemCondition = (credentials: ICredentialsDto, s: ICredentialsDto) =>
        s.login == credentials.login && s.serviceName == credentials.serviceName && s.description == credentials.description


    const thisCredentials = (password: string, credentials: ICredentialsDto) => credentialsList
        .map(s => {
            if (findElemCondition(s, credentials)) {
                return {...s, password: password, isPasswordHidden: false}
            }
            return s
        })

    return (
        <TableContainer style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '90vh',
            border: "1px solid black"
        }} component={Paper}>
            <Table sx={{maxWidth: 500}} color={"black"} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Login</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Password</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {credentialsList.map((row) => (
                        <TableRow
                            key={row.serviceName}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.login}
                            </TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="right">
                                {row.isPasswordHidden
                                    ? <ShowPasswordButton credentials={row} service={service} onClickCallback={(password) => thisCredentials(password, row)}/>
                                    : row.password
                                }
                                </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CredentialsTable;