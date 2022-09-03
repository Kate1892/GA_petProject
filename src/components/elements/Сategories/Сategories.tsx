import React, { useState, useEffect, useRef } from 'react'
import styles from './Categories.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import { BsSquareFill } from 'react-icons/bs'
import { SORT } from '../../../redux/sortnew/types'
import { selectNewItems } from '../../../redux/sortnew/selectors'
import { setBrand, setOnlyGA, setSortID } from '../../../redux/sortnew/slice'

const sortOptions = [
  {
    name: 'по возрастанию цены',
    sortID: SORT.PRICE_ASC,
  },
  {
    name: 'по убыванию цены',
    sortID: SORT.PRICE_DESC,
  },
  {
    name: 'по величине скидки',
    sortID: SORT.DISCOUNT_DESC,
  },
]

const Сategories = () => {
  const dispatch = useDispatch()

  const [sortOpen, setSortOpen] = useState(false)
  const [brandOpen, setBrandOpen] = useState(false)
  const [onlyInGA, setOnlyInGA] = useState(false)

  const { items } = useSelector(selectNewItems)
  const uniqueBrands = [...new Set(items.map(product => product.brand))]

  const brand = useRef<HTMLLIElement>(null)
  const sort = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        !brand.current?.contains(e.target as Node) &&
        !sort.current?.contains(e.target as Node)
      ) {
        setSortOpen(false)
        setBrandOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  const onClickSortID = (name: SORT) => {
    dispatch(setSortID(name))
  }

  const onClickBrand = (name: string) => {
    dispatch(setBrand(name))
  }

  const onClickOnlyGA = () => {
    setOnlyInGA(!onlyInGA)
    if (!onlyInGA) {
      dispatch(setOnlyGA('1'))
    } else {
      dispatch(setOnlyGA(''))
    }
  }

  return (
    <div className={styles.main}>
      <ul>
        <li ref={sort} onClick={() => setSortOpen(!sortOpen)}>
          <span>Cортировать {'  '}</span>
          {sortOpen && (
            <ul className={styles.dropdwn}>
              {sortOptions.map((obj, index) => (
                <li key={index} onClick={() => onClickSortID(obj.sortID)}>
                  <span className={styles.dropdwnItem}>{obj.name}</span>
                </li>
              ))}
            </ul>
          )}
        </li>

        <li ref={brand} onClick={() => setBrandOpen(!brandOpen)}>
          <span>Бренд</span>
          {brandOpen && (
            <ul className={styles.dropdwn} style={{ marginLeft: '190px' }}>
              {uniqueBrands.map((obj: string, index: number) => (
                <li key={index} onClick={() => onClickBrand(obj)}>
                  <span className={styles.dropdwnItem}>{obj}</span>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li
          className={onlyInGA ? styles.active : ''}
          onClick={() => onClickOnlyGA()}
        >
          <BsSquareFill size={5} /> Только в ЗЯ
        </li>
      </ul>
    </div>
  )
}

export default Сategories
