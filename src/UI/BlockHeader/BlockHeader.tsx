import styles from './BlockHeader.module.scss'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import React from 'react'
type Prop = {
  name: string
  hLeftArrowClick?: Function
  hRightArrowClick?: Function
}

const BlockHeader: React.FC<Prop> = props => {
  return (
    <div className={styles.main}>
      <span className={styles.name}>{props.name}</span>
      <span className={styles.arrow} onClick={() => props.hLeftArrowClick?.()}>
        <AiOutlineArrowLeft size={20} />
      </span>
      <span className={styles.arrow} onClick={() => props.hRightArrowClick?.()}>
        <AiOutlineArrowRight size={20} />
      </span>
    </div>
  )
}

export default BlockHeader
