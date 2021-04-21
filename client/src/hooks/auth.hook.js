import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser, logoutUser } from '../redux/action/index'

const storageName = 'networkData'

export const useAuth = () => {
    const dispatch = useDispatch()

    const login = useCallback((jwtToken, id, firstName, lastname, isAdmin) => {
        dispatch(loginUser(jwtToken, id, firstName, lastname, isAdmin))

        localStorage.setItem(
            storageName,
            JSON.stringify({
                userId: id,
                token: jwtToken,
                firstName,
                lastname,
                isAdmin,
            }),
        )
    }, [])

    const logout = useCallback(() => {
        dispatch(logoutUser())

        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(
                data.token,
                data.userId,
                data.firstName,
                data.lastname,
            )
        }

    }, [login])

    return { login, logout }
}
