import React from 'react'
import { useGlobalAuthContext } from '../context/authContext'
import { Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'

export default function AuthRoute({ path }) {
    const { user } = useGlobalAuthContext()
    if (user) return <Navigate replace to="/" />
    else return ( path === 'login' ? <Login /> : <Register /> )
}
