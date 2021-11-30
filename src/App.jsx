// components imports
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import MenuBar from './components/MenuBar'
import { Container } from 'semantic-ui-react'
// css imports
import 'semantic-ui-css/semantic.min.css'
import './App.css'

function App() {
  return (
    <Router>
      <Container>
        <MenuBar />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/register' element={ <Register /> } />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
