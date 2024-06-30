import React from 'react'
import './home.css'
import Sidebar from './Sidebar'
import Content from './Content'
import Login from '../login/Login'

const Home = ({nav}) => {
  return (
    <div className="mt-3">
      {nav == 'home' ? (
        <div className="d-flex">
          <Sidebar />
          <Content />
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default Home
