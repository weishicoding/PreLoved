import React from 'react';

interface DetailInfo {
  brand: string;
  name: string;
  type?: string;
  size: number;
  price: number;
}

interface DetailInfoProps {
  data: DetailInfo;
}

const ProductDetailInfo: React.FC<DetailInfoProps> = ({data}) => {
  return (
    <div className="text-center d-flex flex-column gap-2 ">
      <div className="font-xl fw-bold">{data.brand}</div>
      <div>
        <span className="font-sm">{data.name},</span>
        <span className="font-sm">size {data.size}</span>
      </div>
      <div className="border border-bottom"></div>
      <div className="font-xl fw-bold">${data.price}</div>
    </div>
  );
};

export default ProductDetailInfo;
