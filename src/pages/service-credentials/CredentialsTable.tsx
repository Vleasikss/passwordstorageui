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


interface ICredentialsDtoPasswordHidden extends ICredentialsDto {
    isPasswordHidden: boolean,
    password: string
}

type CredentialsTableParams = {
    initCredentialsList: ICredentialsDto[]
}

const CredentialsTable: React.FC<CredentialsTableParams> = ({initCredentialsList}) => {

    const [credentialsList] = useState<ICredentialsDtoPasswordHidden[]>(
        initCredentialsList.map(s => ({...s, isPasswordHidden: true, password: ""}))
    );
    const { service } = useParams<{service: string}>()

    return (
        <TableContainer style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CredentialsTable;