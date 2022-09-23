const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

type RequestSettings = {
    url: string,
}
const USER_ROLES = {
    ADMIN: "ADMIN",
    USER: "USER",
}

const USER_ROLE_STORAGE_NAME = "USER_ROLE";
const TOKEN_ID_STORAGE_NAME = "TOKEN_ID";
const LOGIN_STORAGE_NAME = "USER_LOGIN";

const userLogin = () => {
    return localStorage.getItem(LOGIN_STORAGE_NAME) || "";
}
const tokenId = () => {
    return localStorage.getItem(TOKEN_ID_STORAGE_NAME) || "";
}
const setAuthentication = (token: string, username: string) => {
    localStorage.setItem(TOKEN_ID_STORAGE_NAME, token);
    localStorage.setItem(LOGIN_STORAGE_NAME, username)
}
const isRoleAdmin = () => {
    return USER_ROLES.ADMIN === localStorage.getItem(USER_ROLE_STORAGE_NAME);
}
const isUserAuthenticated = (): boolean => {
    return !!tokenId();
}
const userRole = (): string => {
    return localStorage.getItem(USER_ROLE_STORAGE_NAME)!;
}

export default {
    tokenId,
    userLogin,
    userRole,
    isRoleAdmin,
    setAuthentication,
    isUserAuthenticated,
    loginUserUrl: (): RequestSettings => {
        return {
            url: `${BACKEND_URL}auth`
        }
    },
    createNewUserUrl: (): RequestSettings => {
        return {
            url: `${BACKEND_URL}register`,
        }
    },
    findAllCredentialsAtAuthenticatedUser: (username: string): RequestSettings => {
        return {
            url: `${BACKEND_URL}user/storage/services`
        }
    },
    findAllCredentialsByService: (serviceName: string): RequestSettings => {
        return {
            url: `${BACKEND_URL}user/storage/${serviceName}`
        }
    },
    putCredentials: (): RequestSettings => {
        return {
            url: `${BACKEND_URL}user/storage`
        }
    },
    findUserByUsername: (username: string): RequestSettings => {
        return {
            url: `${BACKEND_URL}user/${username}`
        }
    }
}
