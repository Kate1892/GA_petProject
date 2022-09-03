import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useSelector } from 'react-redux'
import styles from './Search.module.scss'
import { AiOutlineSearch } from 'react-icons/ai'
import { GrClose } from 'react-icons/gr'
import debounce from 'lodash.debounce'

import { useAppDispatch } from '../../../redux/store'
import { Item, Status } from '../../../redux/types'
import { selectSearch } from '../../../redux/search/selectors'
import { fetchSearchItems } from '../../../redux/search/asyncAction'
import { setSearchValue } from '../../../redux/search/slice'
import { ProductCard } from '../..'

const Search: React.FC = () => {
  const dispatch = useAppDispatch()

  const { products, searchValue, status } = useSelector(selectSearch)

  const fetchSearchItem = () => {
    dispatch(fetchSearchItems({ searchValue }))
  }

  useEffect(() => {
    fetchSearchItem()
  }, [searchValue])

  const inputRef = useRef<HTMLInputElement>(null)
  const [curValue, setCurValue] = useState('')

  const inputClear = () => {
    dispatch(setSearchValue(''))
    setCurValue('')
    inputRef.current?.focus()
  }

  const sendSearchValue = useCallback(
    debounce(cur => {
      dispatch(setSearchValue(cur))
    }, 150),
    []
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurValue(e.target.value)
    sendSearchValue(e.target.value)
  }

  const uniqueBrands = [...new Set(products.map(product => product.brand))]

  return (
    <div className={styles.main}>
      <div className={styles.inputRoot}>
        <AiOutlineSearch className={styles.icon} />
        <input
          ref={inputRef}
          className={styles.input}
          type='text'
          value={curValue}
          placeholder='Хочу купить'
          onChange={e => handleChange(e)}
        ></input>
        {curValue && (
          <GrClose onClick={() => inputClear()} className={styles.icon} />
        )}
      </div>

      <div>
        {status === Status.ERROR ? (
          <div style={{ width: '100%', height: '300px' }}></div>
        ) : status === Status.LOADING ? (
          <div style={{ height: '100vh' }}></div>
        ) : (
          <div className={styles.content}>
            <div className={styles.productsGrid}>
              {products.map((el: Item) => (
                <ProductCard key={el.id} {...el} />
              ))}
            </div>
            <div className={styles.labelsGrid}>
              <div style={{ fontSize: '10px' }}>
                {products.map((el: Item) => (
                  <div style={{ marginTop: '3px' }} key={el.id}>
                    {el.description}
                  </div>
                ))}
              </div>
              <div>
                {uniqueBrands.map((el: string, index: number) => (
                  <div style={{ marginTop: '3px' }} key={index}>
                    {el}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
