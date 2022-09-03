import React, { useEffect, useRef } from 'react'
import styles from './NavBar.module.scss'
import { NavLink } from 'react-router-dom'
import { BiCircle, BiSquare } from 'react-icons/bi'
import { TbTriangleInverted } from 'react-icons/tb'

type InputProps = {
  sideIconRef: React.RefObject<HTMLSpanElement>
  sideBarOpen: boolean
  setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SideNavBar: React.FC<InputProps> = ({
  sideIconRef,
  sideBarOpen,
  setSideBarOpen,
}) => {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        !mainRef.current?.contains(e.target as Node) &&
        !sideIconRef.current?.contains(e.target as Node)
      ) {
        setSideBarOpen(false)

        document.body.style.overflow = 'scroll'
        document.body.style.paddingRight = '0px'

        // document.getElementById('sideOpenbtn').style.color = 'black'
        document
          .getElementById('sideOpenbtn')
          ?.setAttribute('style', 'color: black')

        return
      }
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [sideBarOpen])
  return (
    <div ref={mainRef} className={styles.SideBarMain}>
      <ul>
        <li>
          <NavLink to='#'>
            <span
              style={{
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                margin: '20px 0px',
              }}
            >
              Новосибирск
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to='#'>
            <span>каталог</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='#'>бренды</NavLink>
        </li>
        <li>
          <NavLink to='/novinki'>новинки</NavLink>
        </li>
        <li>
          <NavLink to='#'>акции</NavLink>
        </li>
        <li>
          <NavLink to='#'>клиентские дни</NavLink>
        </li>
        <li>
          <NavLink to='#'>магазины</NavLink>
        </li>
        <li>
          <NavLink to='#'>подарочные карты</NavLink>
        </li>
        <li>
          <NavLink to='#'>стримы</NavLink>
        </li>
        <li>
          <NavLink to='#'>
            <span className={styles.sale}>скидки до -50%</span>
          </NavLink>
        </li>
      </ul>
      <ul
        style={{
          marginTop: '20px',
          marginBottom: '150px',
        }}
      >
        <li style={{ fontSize: '18px', marginTop: '20px', fontWeight: '500' }}>
          <BiCircle size={10} /> доставка и возврат
        </li>
        <li style={{ fontSize: '18px', marginTop: '20px', fontWeight: '500' }}>
          <BiSquare size={10} /> контакты
        </li>
        <li style={{ fontSize: '18px', marginTop: '20px', fontWeight: '500' }}>
          <TbTriangleInverted size={10} /> наши магазины
        </li>
      </ul>
    </div>
  )
}

export default SideNavBar
