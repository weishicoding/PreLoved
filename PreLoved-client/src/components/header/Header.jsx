import React from 'react'
import './header.css'
import {Form, InputGroup, Stack} from 'react-bootstrap'
import {MdFavoriteBorder, MdOutlinePerson, MdOutlineSearch, MdOutlineShoppingCart} from 'react-icons/md'
import {PiFire, PiFireSimpleBold} from 'react-icons/pi'
import logo from '../../assets/images/second-hand.png'

const Header = () => {
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
            <div className="icon-container ">
              <MdOutlinePerson size={24}></MdOutlinePerson>
              <span>Account</span>
            </div>
            <div className="icon-container">
              <MdOutlineShoppingCart size={24}></MdOutlineShoppingCart>
              <span>Cart</span>
              <span className="position-absolute top-0 start-100 translate-middle border border-light rounded-circle badge">12</span>
            </div>
          </div>
        </Stack>
      </Stack>
    </>
  )
}

export default Header
