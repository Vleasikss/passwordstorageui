import consts from "./consts";
import UserForm from "../model/IUserForm";
import ICredentials from "../model/ICredentials";
import ICredentialsDto from "../model/ICredentialsDto";


const AuthorizationHeader = "Authorization";

const getAuthorizedHeaders = (): {} => {
    return {
        "Authorization": consts.tokenId(),
        "Content-Type": "application/json; charset=utf-8"
    }
}
const getHeaders = (): {} => {
    return {
        "Content-Type": "application/json; charset=utf-8"
    }
}

export default {

    findAllServices: (): Promise<any> => {
        const {url, method} = consts.findAllServices()
        const headers = getAuthorizedHeaders()
        return fetch(url, {headers, method})
    },

    findPasswordOfCredentials: (credentials: {serviceName: string, login: string}): Promise<any> => {
        console.log(credentials)
        const {url, method} = consts.findPasswordOfCredentials(credentials.serviceName, credentials.login)
        const headers = getAuthorizedHeaders();
        return fetch(url, {headers, method})
    },

    findAllCredentialsByService: (serviceName: string): Promise<any> => {
        const {url, method} = consts.findAllCredentialsByService(serviceName)
        const headers = getAuthorizedHeaders()
        return fetch(url, {headers, method})
    },

    putCredentials: (credentials: ICredentials) => {
        const {url, method} = consts.putCredentials();
        const headers = getAuthorizedHeaders();
        console.log(consts.tokenId())
        return fetch(url, {headers, method, body: JSON.stringify(credentials)})
    },

    createNewUser: (user: UserForm): Promise<any> => {
        const {url, method} = consts.createNewUserUrl();
        const headers = getHeaders();
        return fetch(url, {headers, method, body: JSON.stringify(user)})
    },

    loginUser: (user: UserForm): Promise<any> => {
        const {url, method} = consts.loginUserUrl()
        const headers = getHeaders();
        return fetch(url, {headers, method, body: JSON.stringify(user)})
    }


}
