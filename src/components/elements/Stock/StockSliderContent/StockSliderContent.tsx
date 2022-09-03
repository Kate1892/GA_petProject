import React from 'react'
import { StockItem } from '../../../../redux/promo/types'

import styles from './StockSliderContent.module.scss'

const StockSliderContent: React.FC<StockItem> = product => {
  return (
    <div className={styles.main}>
      <div>
        <img src={product.mainImageURL} alt={product.name} width={'100%'}></img>
      </div>
      <div className={styles.info}>
        <span className={styles.header}>{product.name}</span>
        <p>{product.description}</p>
      </div>
    </div>
  )
}

export default StockSliderContent
