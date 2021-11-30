import { useState, useEffect } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink, useLocation } from 'react-router-dom'
import { useGlobalAuthContext } from '../context/authContext'

export default function MenuBar() {
    const { pathname } = useLocation() // window.location.pathname
    const path = pathname === '/' ? 'home' : pathname.substr(1)
    const [activeItem, setActiveItem] = useState(path)
    const { user, logout } = useGlobalAuthContext()

    const handleItemClick = (e, { name }) => setActiveItem(prev => name)

    useEffect(() => {
        setActiveItem(prev => path)
    }, [path])

    const menuBar = user ? (
        <Menu pointing secondary size='massive' color='teal'>
            <Menu.Item
                name={ user.username }
                as={NavLink}
                to="/"
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='logout'
                    onClick={logout}
                    as={NavLink}
                    to="/login"
                />
            </Menu.Menu>
        </Menu>
    ) : (
        <Menu pointing secondary size='massive' color='teal'>
            <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={handleItemClick}
                as={NavLink}
                to="/"
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='login'
                    active={activeItem === 'login'}
                    onClick={handleItemClick}
                    as={NavLink}
                    to="/login"
                />
                <Menu.Item
                    name='register'
                    active={activeItem === 'register'}
                    onClick={handleItemClick}
                    as={NavLink}
                    to="/register"
                />
            </Menu.Menu>
        </Menu>
    )

    return menuBar
}