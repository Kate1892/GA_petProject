import { useEffect, useState, Children, cloneElement } from 'react'
import styles from './Stock.module.scss'
import BlockHeader from '../../../UI/BlockHeader/BlockHeader'
import React from 'react'

import { useSelector } from 'react-redux'
import { selectStocks } from '../../../redux/promo/selectors'

const PAGE_WIDTH = 1000

interface Props {
  children: React.ReactNode
}

const Stock: React.FC<Props> = ({ children }) => {
  const [pages, setPages] = useState<any>([])
  const [offset, setOffset] = useState(0)

  const hLeftArrowClick = () => {
    setOffset(currentOffset => {
      const newOffset = currentOffset + PAGE_WIDTH

      return Math.min(newOffset, 0)
    })
  }

  const hRightArrowClick = () => {
    setOffset(currentOffset => {
      const newOffset = currentOffset - PAGE_WIDTH
      const maxOffset = -(PAGE_WIDTH * (pages.length - 1))
      return Math.max(newOffset, maxOffset)
    })
  }

  const { stocks } = useSelector(selectStocks)

  useEffect(() => {
    setPages(
      Children.map(children, child => {
        if (React.isValidElement(child)) {
          return cloneElement(child, {
            style: {
              maxWidth: `${PAGE_WIDTH}px`,
              minWidth: `${PAGE_WIDTH}px`,
              display: 'flex',
              justifyContent: 'center',
            },
          })
        }
      })
    )
  }, [stocks])

  return (
    <>
      <BlockHeader
        name={'акции'}
        hRightArrowClick={hRightArrowClick}
        hLeftArrowClick={hLeftArrowClick}
      />
      <div className={styles.main}>
        <div className={styles.window}>
          <div
            className={styles.pagesContainer}
            style={{
              transform: `translateX(${offset}px)`,
            }}
          >
            {pages}
          </div>
        </div>
      </div>
    </>
  )
}

export default Stock
