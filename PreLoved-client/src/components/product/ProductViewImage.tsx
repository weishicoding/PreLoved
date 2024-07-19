import React from 'react';
import '../../styles/prodectViewDetail.css';
import {Image} from 'react-bootstrap';
import img from '../..//assets/images/clothes.png';

const ProductViewImage = () => {
  return (
    <div className="position-relative">
      <div className="font-s p-1 fw-bold bg-thirdary rounded text-light position-absolute">
        NEW
      </div>
      <div className="bg-primary pt-5">
        <Image src={img} rounded />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <Image
          src={img}
          rounded
          className="slideImage mx-3 p-1 border border-secondary"
        />
        <Image src={img} rounded className="slideImage mx-3" />
      </div>
    </div>
  );
};

export default ProductViewImage;
