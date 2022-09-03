import React from 'react'
import styles from './Header.module.scss'

const Header: React.FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.mainImage}>
        <div className={styles.mainContent}></div>
      </div>
      <span className={styles.header}>новинки</span>
    </div>
  )
}

export default Header
