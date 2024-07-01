import React from 'react'
import './home.css'
import Sidebar from './Sidebar'
import Content from './Content'
import Login from '../login/Login'

const Home = () => {
  return (
    <div className="mt-3 d-flex">
      <Sidebar />
      <Content />
    </div>
  )
}

export default Home
