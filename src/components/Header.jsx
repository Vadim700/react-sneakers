function Header(props) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
        <img width={40} height={40} src="/img/logo.png" alt="Логотип" />
        <div className="headerInfo">
          <h3 className="text-uppercase">REACT SNEAKERS</h3>
          <p>Магазин лучших кроссовокК</p>
        </div>
      </div>
      <div>
        <ul className="d-flex">
          <li onClick={props.onClickCart} className="mr-30 cu-p">
            <img width={18} height={18} src="/img/cart.svg" alt="Корзина" />
            <span>1205 руб.</span>
          </li>
          <li className="mr-20 cu-p">
            <img
              width={18}
              height={18}
              src="/img/favorites.svg"
              alt="Избранное"
            />
          </li>
          <li>
            <img
              width={18}
              height={18}
              src="/img/user.svg"
              alt="Пользователь"
            />
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
