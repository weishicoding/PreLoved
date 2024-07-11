import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "../../styles/productCard.css";
import { MdFavoriteBorder, MdOutlineShoppingCart } from "react-icons/md";

// Define the type for the product data
interface ProductData {
  url: string;
  name: string;
  type: string;
  size: string;
  price: string;
}

interface ProductCardProps {
  data: ProductData;
}

export const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleFavorite = () => {
    console.log(123);
  };

  return (
    <Card style={{ minWidth: "13rem", border: "none" }}>
      <div className="bg-secondary h-100">
        <div className="d-flex justify-content-between px-3 pt-2 head-div">
          <div className="font-xxs text-light fw-bold bg-thirdary p-1 rounded">
            NEW
          </div>
          <MdFavoriteBorder
            size={22}
            className="on-point"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onClick={handleFavorite}
          />
        </div>
        <div className="card-img-div">
          <Card.Img
            variant="top"
            src={data.url}
            className="on-point pb-2 product-image"
          />
        </div>
      </div>
      {open && (
        <div className="favorite-tip bg-primary rounded font-xs px-2 py-1">
          Add to favorite
        </div>
      )}
      <Card.Body className="text-center px-0 py-2">
        <div className="d-grid">
          <button type="button" className="btn btn-light fill">
            Add to cart
            <span className="ps-2" />
            <MdOutlineShoppingCart size={20} />
          </button>
        </div>
        <div className="mt-2 font-md fw-bold">{data.name}</div>
        <div className="mt-1 font-sm">
          {data.type}, size {data.size}
        </div>
        <div className="mt-1 font-md fw-bold">{data.price}</div>
      </Card.Body>
    </Card>
  );
};
