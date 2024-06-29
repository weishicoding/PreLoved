import React, {useState} from 'react'
import './Menu.css'
import {Stack} from 'react-bootstrap'

const Menu = () => {
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(false)
  const handlePopEnter = () => {
    setOpen(true)
  }
  const handlePopLeave = () => {
    if (!hover) {
      setOpen(false)
    }
  }
  const categories = ['WOMENS', 'MENS', 'CHILDREN']
  const categoryItems = categories.map(category => (
    <div key={category} onMouseEnter={() => handlePopEnter()} onMouseLeave={() => handlePopLeave()} className="me-3 py-3 on-point">
      {category}
    </div>
  ))
  return (
    <>
      <div className="d-flex px-5 border-bottom">{categoryItems}</div>
      <div className={`pop-cover ${open || hover ? 'show' : ''} op-cover py-3 px-5 `} onMouseEnter={() => open && setHover(true)} onMouseLeave={() => setHover(false)}>
        123123
      </div>
    </>
  )
}

export default Menu
