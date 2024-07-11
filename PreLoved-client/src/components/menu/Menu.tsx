import React, {useEffect, useState} from 'react';
import './Menu.css';
import axios from '../../api/axios';

interface Category {
  id: number;
  name: string;
  categoryChildren?: Category[];
}

interface ItemProps {
  item: Category;
}

const Item: React.FC<ItemProps> = ({item}) => (
  <div
    className={
      item.categoryChildren ? 'category-parent-name' : 'category-child-name'
    }>
    {item.name}
  </div>
);

const CategoryChildrenItems: React.FC<ItemProps> = ({item}) => (
  <div className="px-2 py-3 me-5 on-point">
    <Item item={item}></Item>
    {item.categoryChildren &&
      item.categoryChildren.map(category => (
        <Item key={`${category.id} + ${Math.random()}`} item={category} />
      ))}
  </div>
);

const Menu: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryChildren, setCategoryChildren] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const handlePopEnter = (id: number) => {
    const fetchCategoryById = async () => {
      try {
        const response = await axios.get(
          `/category/getCategoryByMenuId?categoryId=${id}`,
        );
        setCategoryChildren(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryById();
    setOpen(true);
  };

  const handlePopLeave = () => {
    if (!hover) {
      setOpen(false);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get('/category/getCategoryFirst');
        setCategories(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  const CategoryItems = categories.map(category => (
    <div
      key={category.id}
      onMouseEnter={() => handlePopEnter(category.id)}
      onMouseLeave={() => handlePopLeave()}
      className="me-3 py-3 on-point">
      {category.name}
    </div>
  ));

  return (
    <>
      <div className="d-flex px-5 border-bottom category-parent-name">
        {CategoryItems}
      </div>
      <div
        className={`pop-cover ${open || hover ? 'show' : ''} op-cover py-3 px-5 d-flex`}
        onMouseEnter={() => open && setHover(true)}
        onMouseLeave={() => setHover(false)}>
        {categoryChildren &&
          categoryChildren.map(category => (
            <CategoryChildrenItems key={category.id} item={category} />
          ))}
      </div>
    </>
  );
};

export default Menu;
