import React from 'react'
import './home.css'
import Sidebar from './Sidebar'
import Content from './Content'

const Home = () => {
  return (
    <div className="d-flex mt-3 ">
      <Sidebar />
      <Content />
    </div>
  )
}

export default Home
