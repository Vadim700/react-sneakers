import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

//===========================================

// const sneak = [
//   {
//     id: '1',
//     title: 'Мужские Кроссовки Nike Blazer Mid Suede',
//     price: 12999,
//     imageUrl: '/img/sneakers/image-1.png',
//   },
//   {
//     id: '2',
//     title: 'Мужские Кроссовки Nike Air Max 270',
//     price: 15699,
//     imageUrl: '/img/sneakers/image-2.png',
//   },
//   {
//     id: '3',
//     title: 'Мужские Кроссовки Nike Blazer Mid Suede',
//     price: 8499,
//     imageUrl: '/img/sneakers/image-3.png',
//   },
//   {
//     id: '4',
//     title: 'Кроссовки Puma X Aka Boku Future Rider',
//     price: 8999,
//     imageUrl: '/img/sneakers/image-4.png',
//   },
//   {
//     id: '5',
//     title: 'Мужские Кроссовки Under Armour Curry 8',
//     price: 15199,
//     imageUrl: '/img/sneakers/image-5.png',
//   },
//   {
//     id: '6',
//     title: 'Мужские Кроссовки Nike Kyrie 7',
//     price: 11299,
//     imageUrl: '/img/sneakers/image-6.png',
//   },
//   {
//     id: '7',
//     title: 'Мужские Кроссовки Jordan Air Jordan 11',
//     price: 10799,
//     imageUrl: '/img/sneakers/image-7.png',
//   },
// ];

//========================================

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setIsFavorite] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios
      .get('https://63c2cc9f8bb1ca34755856cf.mockapi.io/items')
      .then((res) => {
        setItems(res.data);
        window.localStorage.setItem('favorite', JSON.stringify(res.data));
        console.log('Сохранено в localStorege');
      });
    axios
      .get('https://63c2cc9f8bb1ca34755856cf.mockapi.io/cart')
      .then((res) => {
        setCartItems(res.data);
      });
  }, []);

  // Добавить катрочку в корзину
  const onAddToCart = (obj) => {
    axios.post('https://63c2cc9f8bb1ca34755856cf.mockapi.io/cart', obj);
    setCartItems((prev) => [...prev, obj]);
  };

  // delete from cart
  const onRemoveItem = (id) => {
    axios.delete(`https://63c2cc9f8bb1ca34755856cf.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // React.useEffect(() => {}, [items]);

  const onAddToFavorite = (id) => {
    setIsFavorite((prev) => prev.filter((item) => item.id === id));
    console.log(JSON.parse(window.localStorage.getItem('favorite')));
    console.log('Добавлено в избранное');
  };

  // Write down text in the Input to const SetSearchvalue
  const onChangeSeargeInput = (event) => {
    setSearchValue(event.target.value);
  };

  // Delete text from input
  const removeTxt = () => {
    setSearchValue('');
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      {/* <Route path="/test">Это тестовая информация</Route> */}
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>
            {searchValue
              ? `Поиск по запросу: "${searchValue}"`
              : 'Все кросовки'}
          </h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input
              value={searchValue}
              onChange={onChangeSeargeInput}
              placeholder="Поиск..."
            />
            {searchValue && (
              <img
                className="clear cu-p"
                src="/img/btn-remove.svg"
                alt="Remove"
                onClick={removeTxt}
                // или onClick={() => setSearchValue('')}
              />
            )}
          </div>
        </div>
        <div className="sneakers d-flex flex-wrap">
          {items
            .filter((item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item, index) => (
              <Card
                key={index}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavorite={(obj) => onAddToFavorite(obj.id)}
                onPlus={(obj) => onAddToCart(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
