import styles from './Cart.module.scss'
import React, { useEffect, useRef } from 'react'
import { GrClose } from 'react-icons/gr'
import { useSelector, useDispatch } from 'react-redux'

import { BiRuble } from 'react-icons/bi'
import { selectCart } from '../../../redux/cart/selectors'
import { setCartFormOpen, setItemDel } from '../../../redux/cart/slice'
import { CartItem } from '../../../redux/cart/types'
import { setSearchFormOpen } from '../../../redux/search/slice'
import { CartItemBlock } from '../..'

type InputProps = {
  cartIconRef: React.RefObject<HTMLLIElement>
}
const Cart: React.FC<InputProps> = ({ cartIconRef }) => {
  const mainRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const { items, totalPrice, cartFormOpen, itemDel } = useSelector(selectCart)

  const onClickSearch = () => {
    dispatch(setCartFormOpen(false))
    dispatch(setSearchFormOpen(true))
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (cartIconRef.current?.contains(e.target as Node)) {
        dispatch(setCartFormOpen(true))

        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = '17px'

        return
      }
      if (!mainRef.current?.contains(e.target as Node) && !itemDel) {
        // formRef.current.classList.toggle(styles.closeDrawer)
        dispatch(setCartFormOpen(false))

        document.body.style.overflow = 'scroll'
        document.body.style.paddingRight = '0px'
        return
      }
      dispatch(setItemDel(false))
    }
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [cartFormOpen, itemDel])

  return (
    <div ref={mainRef} className={styles.main}>
      <div className={styles.closeIcon}>
        <GrClose
          size={25}
          onClick={() => {
            dispatch(setCartFormOpen(false))
            document.body.style.overflow = 'scroll'
            document.body.style.paddingRight = '0px'

            //  document
            //    .getElementById('lowerFooter')
            //    ?.setAttribute('style', 'paddingRight: hidden')
          }}
        />
      </div>
      <div className={styles.content}>
        {!!items.length ? (
          <>
            <div className={styles.header}>
              Корзина{' '}
              <span style={{ fontSize: '25px' }}>
                /{' '}
                {items.reduce((count: number, obj: CartItem) => {
                  return obj.count + count
                }, 0)}{' '}
                шт.
              </span>
            </div>
            <p className={styles.promo}>бесплатная доставка</p>
            <div>
              {items.map(item => (
                <CartItemBlock key={item.id} {...item} />
              ))}
            </div>
            <div className={styles.totalPrice}>
              <p>к оплате</p>{' '}
              <span style={{ fontSize: '30px' }}>
                {totalPrice} <BiRuble />
              </span>
            </div>
            <button className={styles.button}>
              <span className={styles.buttonContent}>Оформить заказ</span>
            </button>
          </>
        ) : (
          <div>
            <div className={styles.header}>в корзине ничего нет...</div>
            <p style={{ marginTop: '20px' }}>
              посмотрите наши{' '}
              <button className={styles.searchOpen}>новинки</button> или
              воспользуйтесь{' '}
              <button
                className={styles.searchOpen}
                onClick={() => onClickSearch()}
              >
                поиском
              </button>
              , если ищете что-то конкретное
            </p>
          </div>
        )}

        {/* {totalPrice} */}
      </div>
    </div>
  )
}

export default Cart
