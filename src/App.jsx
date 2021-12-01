// components imports
import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import PostDetails from './pages/PostDetails'
import MenuBar from './components/MenuBar'
import { Container } from 'semantic-ui-react'
import { AuthProvider } from './context/authContext'
import AuthRoute from './utils/AuthRoute'
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
            <Route path='/login' element={ <AuthRoute path='login'/>} />
            <Route path='/register' element={ <AuthRoute path='register' /> } />
            <Route path='/posts/:postId' element={ <PostDetails /> } />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
