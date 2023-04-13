import React from 'react';
import styles from './Card.module.scss';

function Card({ title, imageUrl, price, onFavorite, onPlus, id }) {
  // useState
  const [isAded, setIsAded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const onClickPlus = () => {
    onPlus({ title, imageUrl, price });
    setIsAded((isAded) => !isAded);
  };

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // useEffect
  React.useEffect(() => {
    // console.log('Переменная "isAded" изменилась!');
  }, [isAded]);

  return (
    <div id={id} className={styles.card}>
      <div className={styles.favorite} onClick={onFavorite}>
        <img
          onClick={onClickFavorite}
          width={32}
          height="32"
          src={isFavorite ? '/img/heart-liked.svg' : '/img/heart-unliked.svg'}
          alt="Unliked"
        />
      </div>
      <img width={133} height={112} src={imageUrl} alt="" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b> {price} руб. </b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isAded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
          alt="плюс"
        />
      </div>
    </div>
  );
}

export default Card;
