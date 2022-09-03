import ProductCard from '../ProductCard/ProductCard'
import styles from './NewProducts.module.scss'

import { useSelector } from 'react-redux'

import React from 'react'

import { selectItems } from '../../../redux/items/selectors'
import { Item, Status } from '../../../redux/types'
import { Pagination, Skeleton } from '../..'

const NewProducts: React.FC = () => {
  const { products, status } = useSelector(selectItems)

  return (
    <>
      <div className={styles.newProduct}>
        <div className={styles.header}>
          <span className={styles.name}>новинки</span>
          <span style={{ marginLeft: '25%' }}>
            <Pagination />
          </span>
        </div>

        <div className={styles.parent}>
          {status === Status.ERROR ? (
            <div style={{ width: '100%', height: '300px' }}></div>
          ) : status === Status.LOADING ? (
            [...new Array(4)].map((_, index) => <Skeleton key={index} />)
          ) : (
            products.map((el: Item) => (
              <div key={el.id} style={{ marginTop: '6px' }}>
                <ProductCard {...el} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default NewProducts
