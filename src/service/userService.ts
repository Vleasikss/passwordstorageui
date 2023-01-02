import consts from "./consts";
import UserForm from "../model/IUserForm";
import ICredentials from "../model/ICredentials";


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

    findPasswordOfCredentials: (credentials: { serviceName: string, login: string }): Promise<any> => {
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

    dropCredentials: (credentials: { serviceName: string, login: string }) => {
        const {url, method} = consts.dropUser(credentials.serviceName, credentials.login)
        const headers = getAuthorizedHeaders();
        return fetch(url, {headers, method})
    },
    dropService: (credentials: { serviceName: string }) => {
        const {url, method} = consts.dropService(credentials.serviceName)
        const headers = getAuthorizedHeaders();
        return fetch(url, {headers, method})
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
    },

    exportUserData() {
        const {url, method} = consts.exportUserCredentials()
        const headers = getAuthorizedHeaders()
        return fetch(url, {headers, method})
    },
    exportUserDataExcel() {
        const {url, method} = consts.exportExcelUserCredentials()
        const headers = getAuthorizedHeaders()
        return fetch(url, {headers, method})
    }
}
