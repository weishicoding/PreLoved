import React from 'react'
import './content.css'
import men from '../../assets/images/men.jpg'

const Content = () => {
  return (
    <>
      <div className="d-flex ps-3 product-head">
        <div className="desc-div">
          <div className="home on-point">Home</div>
          <div className="category-name">Men</div>
          <div className='category-desc'>
            The best fashion hits, design items and high-quality brands from Scandinavia - In the Emmy men's category, you will find thousands of used items: clothes, bags, shoes
            and accessories. Among the most popular brands are Hugo Boss, Calvin Klein, Ralph Lauren, Tommy Hilfiger, Levi's, Adidas and Nike.
          </div>
        </div>
        <div className="img-div">
          <img src={men} className="img"></img>
        </div>
      </div>
    </>
  )
}

export default Content
