import React from 'react';
import './sidebar.css';

// Define the types for the category and item
interface Category {
  name: string;
  count: number;
  children?: Category[];
}

interface ItemProps {
  item: Category;
}

const categories: Category[] = [
  {
    name: 'Accessories',
    count: 1254,
    children: [
      {
        name: 'Sunglass',
        count: 119
      },
      {
        name: 'Ski goggle',
        count: 12
      },
      {
        name: 'Hats',
        count: 1
      },
      {
        name: 'Gloves',
        count: 2
      }
    ]
  },
  {
    name: 'Shoes',
    count: 123,
    children: [
      {
        name: 'Winter shoes',
        count: 23
      },
      {
        name: 'Boots',
        count: 4
      }
    ]
  }
];

const Item: React.FC<ItemProps> = ({ item }) => (
  <div className="py-3 d-flex on-point">
    <div className={item.children ? 'category-first-name' : 'category-second-name'}>{item.name}</div>
    <div className="category-count">({item.count})</div>
  </div>
);

const CategoryItem: React.FC<ItemProps> = ({ item }) => (
  <div>
    <Item item={item} />
    {item.children && item.children.map(child => <Item key={child.name} item={child} />)}
  </div>
);

const Sidebar: React.FC = () => {
  return (
    <div className="ps-5 side-bar pt-3 ">
      {categories.map(item => (
        <CategoryItem key={item.name} item={item} />
      ))}
    </div>
  );
};

export default Sidebar;
