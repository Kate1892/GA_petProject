import { useEffect, useRef } from 'react'
import styles from './Favorites.module.scss'
import { GrClose } from 'react-icons/gr'

import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import { selectFav } from '../../../redux/favorites/selectors'
import { setFavoriteFormOpen } from '../../../redux/favorites/slice'
import { ProductCard } from '../..'

type InputProps = {
  favIconRef: React.RefObject<HTMLLIElement>
}

const Favorites: React.FC<InputProps> = ({ favIconRef }) => {
  const dispatch = useDispatch()
  const { items, favoritesFormOpen } = useSelector(selectFav)
  const favRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (favIconRef.current?.contains(e.target as Node)) {
        dispatch(setFavoriteFormOpen(true))
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = '17px'

        return
      }
      if (!favRef.current?.contains(e.target as Node)) {
        dispatch(setFavoriteFormOpen(false))
        document.body.style.overflow = 'scroll'
        document.body.style.paddingRight = '0px'
        return
      }
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [favoritesFormOpen])

  return (
    <div ref={favRef} className={styles.main}>
      <div className={styles.closeIcon}>
        <GrClose
          size={25}
          onClick={() => {
            dispatch(setFavoriteFormOpen(false))
            document.body.style.overflow = 'scroll'
            document.body.style.paddingRight = '0px'
          }}
        />
      </div>

      <div className={styles.content}>
        <div>
          <div className={styles.header}>Мой лист пожеланий</div>
        </div>
        <div className={styles.parent}>
          {items.map(item => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Favorites
