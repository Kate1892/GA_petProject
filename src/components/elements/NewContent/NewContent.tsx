import styles from './NewContent.module.scss'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../redux/store'
import { Item, Status } from '../../../redux/types'
import { selectNewItems } from '../../../redux/sortnew/selectors'
import { setFilters } from '../../../redux/sortnew/slice'
import { Filters } from '../../../redux/sortnew/types'
import { fetchItems } from '../../../redux/sortnew/asyncAction'
import { ProductCard, Skeleton } from '../..'

const NewContent = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const withParams = useRef(false)
  const isMounted = useRef(false)

  const { items, status, sortBy, brand, onlyInGA } = useSelector(selectNewItems)

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as Filters

      dispatch(
        setFilters({
          ...params,
        })
      )
      withParams.current = true
    }
  }, [])

  useEffect(() => {
    if (isMounted.current) {
      const queryStr = qs.stringify({
        sortBy: sortBy,
        brand,
        onlyInGA: onlyInGA,
      })
      navigate(`?${queryStr}`)
    }
    isMounted.current = true
  }, [sortBy, brand, onlyInGA])

  const fetchPR = async () => {
    dispatch(fetchItems({ sortBy, brand, onlyInGA }))
  }

  useEffect(() => {
    if (!withParams.current) {
      fetchPR()
    }
    withParams.current = false
  }, [sortBy, brand, onlyInGA])

  return (
    <div className={styles.main}>
      {status === Status.ERROR ? (
        <div style={{ width: '100%', height: '300px' }}></div>
      ) : status === Status.LOADING ? (
        [...new Array(4)].map((_, index) => <Skeleton key={index} />)
      ) : (
        items.map((el: Item, index: number) =>
          //2 5 12 15 20 ..
          index === 2 ? (
            <div
              key={el.id}
              className={styles.div1}
              style={{ marginTop: '6px' }}
            >
              <ProductCard {...el} />
            </div>
          ) : index === 5 ? (
            <div
              key={el.id}
              className={styles.div2}
              style={{ marginTop: '6px' }}
            >
              <ProductCard {...el} />
            </div>
          ) : (
            <div key={el.id} style={{ marginTop: '6px' }}>
              <ProductCard {...el} />
            </div>
          )
        )
      )}
    </div>
  )
}

export default NewContent
