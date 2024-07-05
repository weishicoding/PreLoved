import React from 'react'
import img1 from '../assets/images/men.jpg'
import '../styles/home.css'
import {ProductCard} from '../components/product/ProductCard'

const Home = () => {
  return (
    <>
      <div className="text-center font-xxl fw-bold py-4 mt-3">The leading Nordic online store for second hand brand apparel</div>
      <div className="d-flex product-head mt-3">
        <div className="home-img-div pe-1">
          <img src={img1} className="home-img"></img>
        </div>
        <div className="home-img-div ps-1">
          <img src={img1} className="home-img"></img>
        </div>
      </div>
      <div>
        <ProductCard></ProductCard>
      </div>
    </>
  )
}

export default Home
