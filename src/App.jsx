// components imports
import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import MenuBar from './components/MenuBar'
import { Container } from 'semantic-ui-react'
import { AuthProvider } from './context/authContext'
// css imports
import 'semantic-ui-css/semantic.min.css'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/home' element={ <Navigate replace to ='/' /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/register' element={ <Register /> } />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
