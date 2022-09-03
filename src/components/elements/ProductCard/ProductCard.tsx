import heart from '../../../images/heart-svg.svg'
import styles from './ProductCard.module.scss'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import React from 'react'
import { addFavItem } from '../../../redux/favorites/slice'
import { Item } from '../../../redux/types'

const ProductCard: React.FC<Item> = item => {
  const dispatch = useDispatch()

  const onClickAddtoFav = () => {
    const product = {
      id: item.id,
      name: item.name,
      description: item.description,
      discount: item.discount,
      price: item.price,
      mainImageURL: item.mainImageURL,
      newProduct: item.newProduct,
      onlyInGA: item.onlyInGA,
      brand: item.brand,
    }

    dispatch(addFavItem(product))
  }

  return (
    <>
      <div className={styles.prCard}>
        <div className={styles.header}>
          <Link to={`/${item.id}`}>
            <img
              className={styles.mainImage}
              alt={item.description}
              src={item.mainImageURL}
            />
          </Link>
          <div className={styles.topleft}>
            <div>
              {!!item.discount && (
                <div className={styles.salebox}>
                  <span className={styles.sale}>{item.discount} %</span>{' '}
                </div>
              )}
            </div>
            <div>
              {!!item.newProduct && (
                <img
                  src='https://goldapple.ru/static/version1659560710/global/images/labels/new.svg'
                  alt='new product'
                />
              )}
            </div>
            <div>
              {!!item.onlyInGA && (
                <img
                  src='https://goldapple.ru/static/version1659560710/global/images/labels/exclusive.svg'
                  alt='exclusive'
                />
              )}
            </div>
          </div>

          <img
            className={styles.topright}
            src={heart}
            alt='heart'
            onClick={onClickAddtoFav}
          ></img>
        </div>
        <Link to={`/${item.id}`}>
          <div className={styles.info}>
            <span className={styles.description}>{item.description}</span>
            <div className={styles.label}>
              <span>{item.name}</span>
            </div>
            <div className={styles.price}>
              {item.discount ? (
                <div>
                  <span className={styles.newprice}>
                    {item.price - Math.ceil((item.price / 100) * item.discount)}
                    ₽
                  </span>
                  <span className={styles.oldprice}>{item.price}₽</span>
                </div>
              ) : (
                <div>
                  <span>от&nbsp;</span>
                  <span>{item.price}₽</span>
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default ProductCard
