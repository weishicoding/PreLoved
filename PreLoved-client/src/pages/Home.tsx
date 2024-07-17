import React from 'react';
import img1 from '../assets/images/men.jpg';
import '../styles/home.css';
import {ProductCard} from '../components/product/ProductCard';
import img from '../assets/images/clothes.png';

// Define the Product type
interface Product {
  id: number;
  name: string;
  type: string;
  size: string;
  price: string;
  url: string;
}

// Define the props for ProductList
interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({products}) => (
  <div className="product-list gap-4 px-5">
    {products &&
      products.map(product => <ProductCard key={product.id} data={product} />)}
  </div>
);

const Home: React.FC = () => {
  const arrivalProducts: Product[] = [
    {
      id: 1,
      name: 'Sand',
      type: 'Blouse',
      size: '38',
      price: '$79',
      url: img,
    },
    {
      id: 2,
      name: 'Marimekko',
      type: 'Schiffon dress',
      size: '46',
      price: '$159',
      url: img,
    },
    {
      id: 1,
      name: 'Sand',
      type: 'Blouse',
      size: '38',
      price: '$79',
      url: img,
    },
    {
      id: 2,
      name: 'Marimekko',
      type: 'Schiffon dress',
      size: '46',
      price: '$159',
      url: img,
    },
    {
      id: 1,
      name: 'Sand',
      type: 'Blouse',
      size: '38',
      price: '$79',
      url: img,
    },
    {
      id: 2,
      name: 'Marimekko',
      type: 'Schiffon dress',
      size: '46',
      price: '$159',
      url: img,
    },
    {
      id: 1,
      name: 'Sand',
      type: 'Blouse',
      size: '38',
      price: '$79',
      url: img,
    },
    // more products...
  ];

  return (
    <>
      <div className="text-center font-xxl fw-bold py-4 mt-3">
        The leading Nordic online store for second hand brand apparel
      </div>
      <div className="d-flex product-head mt-3">
        <div className="home-img-div pe-1">
          <img src={img1} className="home-img" />
        </div>
        <div className="home-img-div ps-1">
          <img src={img1} className="home-img" />
        </div>
      </div>
      <div>
        <div className="ps-4 py-3 font-xl fw-bold" style={{marginTop: '-7rem'}}>
          New arrivals
        </div>
        <ProductList products={arrivalProducts} />
      </div>
    </>
  );
};

export default Home;
