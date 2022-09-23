import consts from "./consts";
import UserForm from "../model/IUserForm";
import ITokenInfo from "../model/ITokenInfo";
import ICredentials from "../model/ICredentials";
import IUserForm from "../model/IUserForm";

const Methods = {
    GET: "get",
    POST: "post",
    DELETE: "delete",
    PUT: "put"
}
const AuthorizationHeader = "Authorization";

const Statuses = {
    OK: 200
}

const createAuthorizedRequest = (url: string, method: string): XMLHttpRequest => {
    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open(method, url);
    xmlHttpRequest.setRequestHeader(AuthorizationHeader, consts.tokenId());
    xmlHttpRequest.setRequestHeader("Content-type", "application/json; charset=utf-8");
    return xmlHttpRequest;
}
const createUnAuthorizedRequest = (url: string, method: string): XMLHttpRequest => {
    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open(method, url);
    xmlHttpRequest.setRequestHeader("Content-type", "application/json; charset=utf-8");
    return xmlHttpRequest;
}

export default {
    findAllCredentialsAtAuthenticatedUser: (username: string, callback: (credentials: any) => void): void => {
        const {url} = consts.findAllCredentialsAtAuthenticatedUser(username);
        const xmlHttpRequest = createAuthorizedRequest(url, Methods.GET);
        xmlHttpRequest.responseType = "json";
        try {
            xmlHttpRequest.send();
            xmlHttpRequest.onload = function () {
                if (xmlHttpRequest.status === Statuses.OK) {
                    callback(xmlHttpRequest.response || []);
                    return;
                }
                console.error(`unable to get all users, status=${xmlHttpRequest.status}`);
            };
        } catch (err) {
            console.error(`unable to get all users, error=${err}`);
        }
    },
    findAllCredentialsByService: (serviceName: string, callback: (credentials: any) => void): void => {
        const {url} = consts.findAllCredentialsByService(serviceName);
        const xmlHttpRequest = createAuthorizedRequest(url, Methods.GET);
        xmlHttpRequest.responseType = "json";
        try {
            xmlHttpRequest.send();
            xmlHttpRequest.onload = function () {
                if (xmlHttpRequest.status === Statuses.OK) {
                    callback(xmlHttpRequest.response || null);
                    return;
                }
                console.error(`unable to get user by id, status=${xmlHttpRequest.status}`);
            }
        } catch (err) {
            console.error(`unable to get user by id, error=${err}`);
        }
    },
    putCredentials: (credentials: ICredentials, callback: (user: IUserForm | undefined) => void) => {
        const {url} = consts.putCredentials();
        const xmlHttpRequest = createAuthorizedRequest(url, Methods.POST);
        xmlHttpRequest.responseType = "json";
        try {
            xmlHttpRequest.send(JSON.stringify(credentials));
            xmlHttpRequest.onload = function () {
                callback(xmlHttpRequest.response || null);
            }
            console.error(`unable to get user by login, status=${xmlHttpRequest.status}`);
        } catch (err) {
            console.error(`unable to get user by login, error=${err}`);
        }
    },
    createNewUser: (user: UserForm, callback: (response: any) => void): any | undefined => {
        const {url} = consts.createNewUserUrl();
        const xmlHttpRequest = createUnAuthorizedRequest(url, Methods.POST);
        xmlHttpRequest.responseType = "json";

        try {
            xmlHttpRequest.send(JSON.stringify(user));
            xmlHttpRequest.onload = function () {
                if (xmlHttpRequest.status === Statuses.OK) {
                    console.log(`successfully create new user, status=${xmlHttpRequest.status}`);
                    callback(xmlHttpRequest.response || null);
                    return;
                }
                console.error(`unable to create new user, status=${xmlHttpRequest.status}`);
            }
            return;
        } catch (err) {
            console.error(`unable to create new user, error=${err}`);
        }
    },

    loginUser: (user: UserForm, callback: (token: ITokenInfo) => void): any | undefined => {
        const {url} = consts.loginUserUrl();
        const xmlHttpRequest = createUnAuthorizedRequest(url, Methods.POST);
        xmlHttpRequest.responseType = "json";

        try {
            xmlHttpRequest.send(JSON.stringify(user));
            xmlHttpRequest.onload = function () {
                if (xmlHttpRequest.status === Statuses.OK) {
                    console.log(`successfully log in new user, status=${xmlHttpRequest.status}`);
                    callback(xmlHttpRequest.response || null);
                    return;
                }
                console.error(`unable to log in new user, status=${xmlHttpRequest.status}`);
            }
            return;
        } catch (err) {
            console.error(`unable to log in new user, error=${err}`);
        }
    },

    findUserByUsername: (username: string, callback: (user: any | undefined) => void): any => {
        const {url} = consts.findUserByUsername(username);
        const xmlHttpRequest = createUnAuthorizedRequest(url, Methods.GET);
        xmlHttpRequest.responseType = "json";

        try {
            xmlHttpRequest.send();
            xmlHttpRequest.onload = function () {
                if (xmlHttpRequest.status === Statuses.OK) {
                    console.log(`successfully log in new user, status=${xmlHttpRequest.status}`);
                    callback(xmlHttpRequest.response || null);
                    return;
                }
                console.error(`unable to log in new user, status=${xmlHttpRequest.status}`);
            }
            return;
        } catch (err) {
            console.error(`unable to log in new user, error=${err}`);
        }
    },



}
