export const loginUser = (jwtToken, id, firstName, lastname) => ({
    type: 'LOGIN',
    payload: {
        userId: id,
        firstName,
        lastname,
        token: jwtToken,
    },
})

export const logoutUser = () => ({
    type: 'LOGOUT',
})

export const setFuncLogInOut = (login, logout) => ({
    type: 'SETFUNC',
    payload: { login, logout },
})

export const loadSelectedSchema = (schema) => ({
    type: 'LOADSELECTEDSCHEMA',
    payload: schema
})

export const setSchema = schema => ({
    type: 'SETSCHEMA',
    payload: schema,
})

export const setIsAuth = () => ({
    type: 'SETISAUTH',
})

export const setAllSchemes = (schemes) => ({
    type: 'SETALLSCHEMES',
    payload: schemes
})

export const clearCurrentSchema = () => ({
    type: 'CLEARCURRENTSCHEMA'
})

export const setSimular = simular => ({
    type: 'SETSIMULAR',
    payload: simular,
})
