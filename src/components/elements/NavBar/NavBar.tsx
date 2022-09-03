import React, { useState, useRef, useEffect } from 'react'
import styles from './NavBar.module.scss'
import './animations.css'
import { NavLink } from 'react-router-dom'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { CSSTransition } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'

import { GrClose } from 'react-icons/gr'
import {
  AiOutlineShopping,
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineMenu,
} from 'react-icons/ai'

import GA_logo from '../../../images/GA_logo.svg'
import location from '../../../images/location.svg'

import { selectCart } from '../../../redux/cart/selectors'
import { setCartFormOpen } from '../../../redux/cart/slice'
import { CartItem } from '../../../redux/cart/types'
import { selectLog } from '../../../redux/login/selectors'
import { setLogFormOpen } from '../../../redux/login/slice'
import { selectSearch } from '../../../redux/search/selectors'
import { selectFav } from '../../../redux/favorites/selectors'
import { setSearchFormOpen } from '../../../redux/search/slice'
import { Cart, Favorites, LogForm, Search, SideNavBar } from '../..'
import { setFavoriteFormOpen } from '../../../redux/favorites/slice'

const NavBar: React.FC = React.memo(() => {
  const { searchFormOpen } = useSelector(selectSearch)
  const { items, cartFormOpen } = useSelector(selectCart)
  const { logFormOpen } = useSelector(selectLog)
  const { favoritesFormOpen } = useSelector(selectFav)
  const dispatch = useDispatch()

  const accIconRef = useRef<HTMLLIElement>(null)
  const cartIconRef = useRef<HTMLLIElement>(null)
  const favIconRef = useRef<HTMLLIElement>(null)
  const sideIconRef = useRef<HTMLSpanElement>(null)

  const [color, setColor] = useState(false)
  const [sideBarOpen, setSideBarOpen] = useState(false)

  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current === true) {
      const json = JSON.stringify(items)
      localStorage.setItem('cart', json)
    }
    isMounted.current = true
  }, [items])

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 120) {
        setColor(true)
      } else {
        setColor(false)
      }
    }
    window.addEventListener('scroll', changeColor)
    return () => {
      window.removeEventListener('scroll', changeColor)
    }
  }, [])
  document.body.style.overflowX = 'hidden'
  const FO = () => {
    dispatch(setLogFormOpen(true))
  }

  const onClickSearchOpen = () => {
    window.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = '17px'
    document
      .getElementById('lowerFooter')
      ?.setAttribute('style', 'visibility: hidden')

    dispatch(setSearchFormOpen(true))
  }

  const onClickSearchClose = () => {
    document.body.style.overflow = 'scroll'
    document.body.style.paddingRight = '0px'
    document
      .getElementById('lowerFooter')
      ?.setAttribute('style', 'visibility: visible')

    dispatch(setSearchFormOpen(false))
  }

  const onClickOpenSideBar = () => {
    if (!!sideBarOpen) {
      document
        .getElementById('sideOpenbtn')
        ?.setAttribute('style', 'color: black')
      setSideBarOpen(false)
      document.body.style.overflow = 'scroll'
      document.body.style.paddingRight = '0px'
    } else {
      document
        .getElementById('sideOpenbtn')
        ?.classList.add(styles.humburgerActive)
      setSideBarOpen(true)
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '17px'
    }
  }

  return (
    <>
      <div>
        <CSSTransition
          in={logFormOpen}
          timeout={1000}
          classNames='slideInRight'
          mountOnEnter
          unmountOnExit
        >
          <LogForm accIconRef={accIconRef} />
        </CSSTransition>

        <CSSTransition
          in={cartFormOpen}
          timeout={1000}
          classNames='slideInRight'
          mountOnEnter
          unmountOnExit
        >
          <Cart cartIconRef={cartIconRef} />
        </CSSTransition>
        <CSSTransition
          in={favoritesFormOpen}
          timeout={1000}
          classNames='slideInRight'
          mountOnEnter
          unmountOnExit
        >
          <Favorites favIconRef={favIconRef} />
        </CSSTransition>
      </div>
      <div id='overlay'>
        <div className={styles.header}>
          <div className={color ? styles['scroll'] : ''}>
            <div className={color ? styles['slideInDown'] : ''}>
              {/* <div className={styles.header}> */}
              <div className={styles.parent}>
                <div
                  style={{
                    marginLeft: '50px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  <span className={styles.location}>
                    <img
                      src={location}
                      alt='location icon'
                      width='15px'
                      style={{ paddingRight: '5px' }}
                    ></img>
                    Новосибирск
                  </span>
                  <span
                    ref={sideIconRef}
                    id='sideOpenbtn'
                    className={styles.humburger}
                  >
                    <AiOutlineMenu
                      onClick={() => onClickOpenSideBar()}
                      size={25}
                    />
                  </span>
                </div>
                <div
                  style={{
                    marginLeft: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <NavLink className={styles.navLink} to='/'>
                    <img
                      style={{
                        paddingTop: '15px',
                        width: '60px',
                        height: '60px',
                      }}
                      src={GA_logo}
                      alt='gold apple logo'
                    ></img>
                  </NavLink>
                </div>
                <div
                  style={{
                    marginRight: '50px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <ul className={styles.icons}>
                    <li>
                      {searchFormOpen ? (
                        <GrClose
                          size={23}
                          onClick={() => onClickSearchClose()}
                        />
                      ) : (
                        <AiOutlineSearch
                          size={25}
                          onClick={() => onClickSearchOpen()}
                        />
                      )}
                    </li>
                    <li
                      ref={favIconRef}
                      onClick={() => dispatch(setFavoriteFormOpen(true))}
                    >
                      <AiOutlineHeart size={25} />
                    </li>
                    <li ref={accIconRef} onClick={() => FO()}>
                      <MdOutlineAccountCircle size={25} />
                    </li>
                    <li
                      ref={cartIconRef}
                      onClick={() => dispatch(setCartFormOpen(true))}
                    >
                      <AiOutlineShopping size={28} />
                      <div style={{ width: '3px', display: 'inline-flex' }}>
                        {!!items.length
                          ? items.reduce((count: number, obj: CartItem) => {
                              return obj.count + count
                            }, 0)
                          : ' '}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <ul className={styles.underline}>
                <li>
                  <NavLink className={styles.navLink} to='#'>
                    каталог
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.navLink} to='#'>
                    бренды
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.navLink} to='/novinki'>
                    новинки
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.navLink} to='#'>
                    акции
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.navLink} to='#'>
                    клиентские дни
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.navLink} to='#'>
                    магазины
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.navLink} to='#'>
                    подарочные карты
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.navLink} to='#'>
                    стримы
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.sale} to='#'>
                    <span>скидки до -50%</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <CSSTransition
        in={sideBarOpen}
        timeout={1000}
        classNames='slideInLeft'
        mountOnEnter
        unmountOnExit
      >
        <SideNavBar
          sideIconRef={sideIconRef}
          sideBarOpen={sideBarOpen}
          setSideBarOpen={setSideBarOpen}
        />
      </CSSTransition>
      <div style={{ position: 'relative' }}>
        <CSSTransition
          in={searchFormOpen}
          timeout={1000}
          classNames='slideInDown'
          mountOnEnter
          unmountOnExit
        >
          <Search />
        </CSSTransition>
      </div>
    </>
  )
})

export default NavBar
