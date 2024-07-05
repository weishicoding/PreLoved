import React, {useEffect, useState} from 'react'
import './header.css'
import {Stack} from 'react-bootstrap'
import {MdFavoriteBorder, MdOutlinePerson, MdOutlineSearch, MdOutlineShoppingCart} from 'react-icons/md'
import {PiFireSimpleBold} from 'react-icons/pi'
import logo from '../../assets/images/logo.png'
import useAuth from '../../hooks/useAuth'
import {useNavigate} from 'react-router-dom'
import axios from '../../api/axios'

const Header = () => {
  const {auth, setAuth} = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const handleLoginOpen = () => {
    if (!auth) {
      navigate('/login')
    } else {
      setOpen(open => !open)
    }
  }
  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/auth/logout', {withCredentials: true})
      setAuth(null)
      setOpen(false)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Stack>
        <div className="hearder-title">Your favorite second hand online</div>
        <Stack direction="horizontal" gap={3} className="nav d-flex justify-content-between px-5 py-2">
          <div className="input-div">
            <div className="input-group">
              <input type="text" className="form-control border border-end-0 rounded-start" placeholder="Search for brand or product" />
              <div className="input-group-append border border-start-0 bg-body rounded-end">
                <MdOutlineSearch size={24} className="mt-2 me-2 on-point" />
              </div>
            </div>
          </div>
          <div>
            <img src={logo} className="logo"></img>
          </div>
          <div className="d-flex-end d-flex icon-text">
            <div className="icon-container ">
              <PiFireSimpleBold size={24}></PiFireSimpleBold>
              <span>Sell Now</span>
              <span className="position-absolute top-0 start-100 translate-middle border border-light rounded-pill badge">New!</span>
            </div>
            <div className="icon-container ">
              <MdFavoriteBorder size={24}></MdFavoriteBorder>
              <span>Favorites</span>
            </div>
            <div className="icon-container" onClick={handleLoginOpen}>
              <MdOutlinePerson size={24}></MdOutlinePerson>
              <span>Account</span>
            </div>
            <div className="icon-container">
              <MdOutlineShoppingCart size={24}></MdOutlineShoppingCart>
              <span>Cart</span>
              <span className="position-absolute top-0 start-100 translate-middle border border-light rounded-circle badge">12</span>
            </div>
            {auth && open && (
              <div className="logout">
                <div>{auth?.username}</div>
                <button type="button" className="btn py-2 px-5" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </Stack>
      </Stack>
    </>
  )
}

export default Header
