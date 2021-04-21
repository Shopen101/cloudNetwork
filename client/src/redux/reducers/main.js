function noop() {}

const initialState = {
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
    firstName: null,
    lastname: null,
}

const main = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                userId: action.payload.userId,
                firstName: action.payload.firstName,
                lastname: action.payload.lastname,
            }
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                userId: null,
                firstName: null,
                lastname: null,
            }
        case 'SETFUNC':
            return {
                ...state,
                login: action.payload.login,
                logout: action.payload.logout,
            }

        default:
            return {
                ...state,
            }
    }
}

export default main
