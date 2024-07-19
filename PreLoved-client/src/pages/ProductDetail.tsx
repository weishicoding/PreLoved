import React from 'react';
import ProductViewImage from '../components/product/ProductViewImage';
import { Col, Container, Row } from 'react-bootstrap';

const ProductDetail = () => {
  return (
      <Row className='p-5'>
        <Col><ProductViewImage /></Col>
        <Col xs={3}>2 of 3 (wider)</Col>
        <Col>3 of 3</Col>
      </Row>
  );
};

export default ProductDetail;
