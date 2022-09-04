import { iteratorSymbol } from 'immer/dist/internal'
import React from 'react'
import { useDispatch } from 'react-redux'

import styles from './CartItem.module.scss'
import { GrClose } from 'react-icons/gr'
import { BiRuble } from 'react-icons/bi'
import {
  addItem,
  minusItem,
  removeItem,
  setItemDel,
} from '../../../redux/cart/slice'
import { CartItem } from '../../../redux/cart/types'

type ItemProps = {
  id: string
  name: string
  description: string
  price: number
  mainImageURL: string
  count: number
  discount: number
}

const CartItemBlock: React.FC<ItemProps> = ({
  id,
  name,
  description,
  price,
  mainImageURL,
  count,
  discount,
}) => {
  const dispatch = useDispatch()

  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
      } as CartItem)
    )
  }

  const onClickMinus = () => {
    if (count > 1) {
      dispatch(minusItem(id))
    } else {
      dispatch(setItemDel(true))

      dispatch(removeItem(id))
    }
  }

  const onClickRemove = () => {
    dispatch(setItemDel(true))
    dispatch(removeItem(id))
  }

  return (
    <div>
      <div className={styles.main}>
        <div>
          <img width={150} height={100} src={mainImageURL}></img>
        </div>
        <div className={styles.itemDescription}>
          <p style={{ fontSize: '12px' }}>{description}</p>
          <h6>{name}</h6>
        </div>
        <div className={styles.info}>
          <div>
            <span className={styles.actions}>
              <div className={styles.items} onClick={onClickMinus}>
                <span>-</span>
              </div>

              <span style={{ fontWeight: 'bold' }}>{count}</span>

              <div className={styles.items} onClick={onClickPlus}>
                <span>+</span>
              </div>
              <div onClick={onClickRemove} className={styles.close}>
                <GrClose size={14} />
              </div>
            </span>
            <div className={styles.priceBlock}>
              {discount ? (
                <div>
                  <p style={{ fontSize: '12px', color: 'grey' }}>
                    со скидкой {discount}%
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <span className={styles.newprice}>
                      {price - Math.ceil((price / 100) * discount)} <BiRuble />
                    </span>

                    <span
                      style={{
                        color: 'grey',
                        opacity: '0.7',
                        textDecoration: 'line-through',
                        marginLeft: '10px',
                      }}
                    >
                      {price} <BiRuble />
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <span>
                    {price} <BiRuble />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItemBlock
