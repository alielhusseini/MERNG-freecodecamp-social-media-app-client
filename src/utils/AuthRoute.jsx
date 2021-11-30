import React from 'react'
import { useGlobalAuthContext } from '../context/authContext'
import { Route, Navigate } from 'react-router-dom'

export default function AuthRoute({ component: Component, ...rest }) {
    const { user } = useGlobalAuthContext()

    return (
        <Route 
            {...rest} 
            render={props =>
                user ? <Navigate replace to='/' /> : <Component {...props} />
            }
        />
    )
}
