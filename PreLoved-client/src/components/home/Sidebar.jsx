import React from 'react'
import './sidebar.css'

const Sidebar = () => {
  const categories = [
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
  ]

  const Item = ({item}) => (
    <div className="py-3 d-flex on-point">
      <div className={item.children ? 'category-first-name' : 'category-second-name'}>{item.name}</div>
      <div className="category-count">({item.count})</div>
    </div>
  )
  const CategoryItem = ({item}) => (
    <div>
      <Item item={item}></Item>
      {item.children && item.children.map(child => <Item key={child.name} item={child}></Item>)}
    </div>
  )

  return (
    <div className="ps-5 side-bar pt-3 ">
      {categories.map(item => (
        <CategoryItem key={item.name} item={item}></CategoryItem>
      ))}
    </div>
  )
}

export default Sidebar
