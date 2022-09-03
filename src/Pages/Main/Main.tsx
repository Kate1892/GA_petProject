import React, { useEffect } from 'react'
import styles from './Main.module.scss'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../redux/store'
import { selectStocks } from '../../redux/promo/selectors'
import { fetchPromos } from '../../redux/promo/asyncAction'
import {
  MainCarousel,
  NewProducts,
  Stock,
  StockSkeleton,
  StockSliderContent,
} from '../../components'
import { Status } from '../../redux/types'

const Main: React.FC = () => {
  const dispatch = useAppDispatch()

  const { stocks, status } = useSelector(selectStocks)

  useEffect(() => {
    dispatch(fetchPromos())
  }, [])

  return (
    <div className={styles.main}>
      <MainCarousel />

      <NewProducts />

      <Stock>
        {status === Status.ERROR ? (
          <div style={{ width: '100%', height: '300px' }}></div>
        ) : status === Status.LOADING ? (
          <StockSkeleton />
        ) : (
          stocks.map((el: any) => (
            <div key={el.id}>
              <StockSliderContent {...el} />
            </div>
          ))
        )}
      </Stock>
    </div>
  )
}

export default Main
