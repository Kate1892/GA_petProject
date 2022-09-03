import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from './FullProductInfo.module.scss'
import { BiRuble } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'

import { useDispatch } from 'react-redux'
import FullPSkeleton from './FullPSkeleton'
import { CartItem } from '../../redux/cart/types'
import { addItem } from '../../redux/cart/slice'
import { Item } from '../../redux/types'
import { addFavItem } from '../../redux/favorites/slice'

const FullProductInfo: React.FC = () => {
  const dispatch = useDispatch()

  const onClickAddtoCart = () => {
    if (item) {
      const product: CartItem = {
        id: item.id,
        name: item.name,
        description: item.description,
        discount: item.discount,
        price: item.price,
        mainImageURL: item.mainImageURL,
        count: item.count,
      }
      dispatch(addItem(product))
    }
  }

  const onClickAddtoFav = () => {
    if (item) {
      const product: Item = {
        id: item.id,
        name: item.name,
        description: item.description,
        discount: item.discount,
        price: item.price,
        mainImageURL: item.mainImageURL,
        brand: item.brand,
        newProduct: item.newProduct,
        onlyInGA: item.onlyInGA,
      }
      dispatch(addFavItem(product))
    }
  }

  type curItem = {
    id: string
    name: string
    description: string
    discount: number
    price: number
    mainImageURL: string
    brand: string
    newProduct: number
    onlyInGA: number
    count: number
  }
  const { id } = useParams()
  const [item, setItem] = useState<curItem>()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchItem() {
      try {
        const { data } = await axios.get(
          `https://62f8bcb83eab3503d1da6b9a.mockapi.io/items/${id}`
        )
        setItem(data)
      } catch (err) {
        navigate('/')
      }
    }
    fetchItem()
  }, [])

  if (!item) {
    return <FullPSkeleton />
  }

  return (
    <>
      <header style={{ position: 'relative' }}>
        <div
          style={{
            marginLeft: '50%',
            marginTop: '60px',
            position: 'absolute',
            zIndex: '5',
          }}
        >
          <p>{item.description}</p>
          <span
            style={{ marginTop: '15px', fontSize: '50px', fontWeight: 'bold' }}
          >
            <span>{item.name}</span>
          </span>
        </div>
      </header>

      <div className={styles.block} style={{ marginTop: '130px' }}>
        <div>
          <div className={styles.imageSlide}>
            {[...new Array(4)].map((_, index) => (
              <div
                key={index}
                className={styles.images}
                style={{
                  background: `url(${item.mainImageURL}) center center/cover no-repeat`,
                }}
              ></div>
            ))}
          </div>
          <img width={1000} src={item.mainImageURL}></img>

          <div className={styles.topleft}>
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
        </div>
        <div style={{ marginTop: '150px', marginLeft: '100px' }}>
          <span style={{ color: 'grey' }}>артикул: {item.id}</span>
          <div style={{ marginTop: '50px' }}>
            <span style={{ padding: '15px', border: '1px black solid' }}></span>
            <span
              style={{
                marginLeft: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                fontSize: '12px',
              }}
            >
              объём/мл
            </span>
          </div>
          <div style={{ marginTop: '50px', fontSize: '30px' }}>
            <span className={styles.price}>
              {item.discount ? (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <span className={styles.newprice}>
                    {item.price - Math.ceil((item.price / 100) * item.discount)}{' '}
                    <BiRuble />
                    <p style={{ fontSize: '12px', color: 'grey' }}>
                      со скидкой {item.discount}%
                    </p>
                  </span>

                  <span className={styles.oldprice}>
                    {item.price} <BiRuble />
                    <p
                      style={{
                        fontSize: '12px',
                        color: 'grey',
                        opacity: '0.7',
                        textDecoration: 'none',
                      }}
                    >
                      без скидки
                    </p>
                  </span>
                </div>
              ) : (
                <div>
                  <span>{item.price}</span>
                  <BiRuble />
                </div>
              )}
            </span>
          </div>
          <div style={{ marginTop: '50px', fontSize: '14px' }}>
            <button onClick={onClickAddtoCart} className={styles.button}>
              <span className={styles.buttonContent}>Добавить в корзину</span>
            </button>

            <button
              onClick={onClickAddtoFav}
              className={styles.button}
              style={{ width: '50px', marginLeft: '10px' }}
            >
              <span className={styles.buttonContent}>
                <AiOutlineHeart size={16} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <img />
      <div></div>
    </>
  )
}

export default FullProductInfo
