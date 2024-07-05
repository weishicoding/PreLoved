import React, {useState} from 'react'
import {Button, Card} from 'react-bootstrap'
import img from '../../assets/images/clothes.png'
import '../../styles/productCard.css'
import {MdFavoriteBorder, MdOutlineShoppingCart} from 'react-icons/md'

export const ProductCard = () => {
  const [open, setOpen] = useState(false)
  const handleFavorite = () => {
    console.log(123)
  }
  return (
    <Card style={{width: '13rem', border: 'none'}}>
      <div className="bg-secondary h-100">
        <div className="d-flex justify-content-between px-3 pt-2 head-div">
          <div className="font-xxs text-light fw-bold bg-thirdary p-1 rounded">NEW</div>
          <MdFavoriteBorder size={20} className="on-point" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onClick={handleFavorite}></MdFavoriteBorder>
        </div>
        <Card.Img variant="top" src={img} className="on-point pb-2" />
      </div>
      {open && <div className="favorite-tip bg-primary rounded font-xs px-2 py-1">Add to favorite</div>}
      <Card.Body className="text-center px-0 py-2">
        <div className="d-grid">
          <button type="button" className="btn btn-light fill">
            Add to cart
            <span className="ps-2" />
            <MdOutlineShoppingCart size={20}></MdOutlineShoppingCart>
          </button>
        </div>
        <div className="mt-2 font-md fw-bold">Sand</div>
        <div className="mt-1 font-sm">Blouse, size 38</div>
        <div className="mt-1 font-md fw-bold">$79</div>
      </Card.Body>
    </Card>
  )
}
