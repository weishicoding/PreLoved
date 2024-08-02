import React from 'react';
import ProductViewImage from '../components/product/ProductViewImage';
import {Col, Container, Row} from 'react-bootstrap';
import ProductDetailInfo from '../components/product/ProductDetailInfo';

const detailInfo = {
  brand: 'Massimo Dutti',
  name: 'Leather jacket',
  size: 36,
  price: 149.9,
};

const ProductDetail = () => {
  return (
    <Row className="p-5">
      <Col>
        <ProductViewImage />
      </Col>
      <Col xs={3}>
        <ProductDetailInfo data={detailInfo} />
      </Col>
      <Col>3 of 3</Col>
    </Row>
  );
};

export default ProductDetail;
