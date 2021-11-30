import { createContext, useContext, useReducer } from "react";
import authReducer from '../reducer/authReducer'
import jwtDecode from 'jwt-decode'

const initialState = { user: null }

if (localStorage.getItem('token')) {
    const decodedToken = jwtDecode(JSON.parse(localStorage.getItem('token')))

    if (decodedToken.exp * 1000 < Date.now() ) { // if expired
        localStorage.removeItem("token")
    } else {
        initialState.user = decodedToken
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
})

export const AuthProvider = ({ children })  => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    const login = (userData) => {
        localStorage.setItem("token", JSON.stringify(userData.token))
        dispatch({type: "LOGIN", payload: userData})
    }
    const logout = () => {
        localStorage.removeItem("token")
        dispatch({type: "LOGOUT"})
    }

    let value = { login, logout, user: state.user }

    return <AuthContext.Provider value={ value }>{ children }</AuthContext.Provider>
}

export const useGlobalAuthContext = () => useContext(AuthContext)