import React from 'react'
import { useGlobalAuthContext } from '../context/authContext'
import { Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'

export default function AuthRoute({ path }) {
    const { user } = useGlobalAuthContext()
    if (user) return <Navigate replace to="/" />
    return ( path === 'login' ? <Login /> : <Register /> )
}
