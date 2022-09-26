const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

type RequestSettings = {
    url: string,
    method: string
}
const USER_ROLES = {
    ADMIN: "ADMIN",
    USER: "USER",
}

const Methods = {
    GET: "GET",
    POST: "POST",
    DELETE: "DELETE",
    PUT: "PUT"
}

const USER_ROLE_STORAGE_NAME = "USER_ROLE";
const TOKEN_ID_STORAGE_NAME = "TOKEN_ID";
const LOGIN_STORAGE_NAME = "USER_LOGIN";

const userLogin = () => {
    return localStorage.getItem(LOGIN_STORAGE_NAME) || "";
}
const logout = () => {
    localStorage.removeItem(LOGIN_STORAGE_NAME)
    localStorage.removeItem(TOKEN_ID_STORAGE_NAME)
    localStorage.removeItem(USER_ROLE_STORAGE_NAME)
}
const tokenId = () => {
    return "Bearer " + localStorage.getItem(TOKEN_ID_STORAGE_NAME) || "";
}
const setAuthentication = (token: string, username: string) => {
    localStorage.setItem(TOKEN_ID_STORAGE_NAME, token);
    localStorage.setItem(LOGIN_STORAGE_NAME, username)
}
const isRoleAdmin = () => {
    return USER_ROLES.ADMIN === localStorage.getItem(USER_ROLE_STORAGE_NAME);
}
const isUserAuthenticated = (): boolean => {
    return !!userLogin();
}
const userRole = (): string => {
    return localStorage.getItem(USER_ROLE_STORAGE_NAME)!;
}

export default {
    tokenId,
    userLogin,
    userRole,
    logout,
    isRoleAdmin,
    setAuthentication,
    isUserAuthenticated,
    loginUserUrl: (): RequestSettings => {
        return {
            url: `${BACKEND_URL}auth`,
            method: Methods.POST
        }
    },
    createNewUserUrl: (): RequestSettings => {
        return {
            url: `${BACKEND_URL}register`,
            method: Methods.POST
        }
    },
    findAllServices: (): RequestSettings => {
        return {
            url: `${BACKEND_URL}user/storage/services`,
            method: Methods.GET
        }
    },
    findAllCredentialsByService: (serviceName: string): RequestSettings => {
        return {
            url: `${BACKEND_URL}user/storage/${serviceName}`,
            method: Methods.GET
        }
    },
    putCredentials: (): RequestSettings => {
        return {
            url: `${BACKEND_URL}user/storage`,
            method: Methods.POST
        }
    },
    findPasswordOfCredentials(serviceName: string, login: string) {
        return {
            url: `${BACKEND_URL}user/storage/${serviceName}/${login}`,
            method: Methods.GET
        }
    }
}
