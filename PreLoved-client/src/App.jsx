import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/home/Home'
import Header from './components/header/Header'
import './app.css'
import Menu from './components/menu/Menu'
import {useState} from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from './components/login/Login'
import RequiredAuth from './components/RequiredAuth'
import AuthRedireact from './components/AuthRedireact'
import PersistLogin from './components/PersistLogin'

function App() {
  return (
    <div className="">
      <Header />
      <Menu />
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/login"
            element={
              <AuthRedireact>
                <Login />
              </AuthRedireact>
            }
          ></Route>
        </Route>
        <Route element={<RequiredAuth />}> </Route>
      </Routes>
    </div>
  )
}

export default App
