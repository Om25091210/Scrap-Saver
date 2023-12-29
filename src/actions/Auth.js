const AUTH = "AUTH";

const AuthInfo = (data) => {
    return {
        type: AUTH,
        payload: data
    }
}

export { AUTH, AuthInfo }
