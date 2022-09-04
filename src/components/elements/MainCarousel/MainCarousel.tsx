import styles from './MainCarousel.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useSelector } from 'react-redux'

import Carousel from 'react-bootstrap/Carousel'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { selectStocks } from '../../../redux/promo/selectors'
import { Status } from '../../../redux/types'

const MainCarousel = () => {
  const { stocks, status } = useSelector(selectStocks)

  return (
    <>
      {status === Status.ERROR ? (
        <div style={{ width: '100%', height: '350px' }}></div>
      ) : status === Status.LOADING ? (
        <div style={{ width: '100%', height: '350px' }}></div>
      ) : (
        <div className={styles.main}>
          <Carousel>
            {stocks.map((elem, index) => (
              <Carousel.Item key={elem.id} style={{ height: '510px' }}>
                <img
                  className={styles.mainIMG}
                  src={elem.mainImageURL}
                  alt='Promo'
                />

                <div className={styles.mainContent}>
                  <div style={{ fontSize: '60px', fontWeight: 'bold' }}>
                    {elem.name}
                  </div>
                  <p>{elem.dates}</p>
                  <button className={styles.button}>
                    <span className={styles.buttonContent}>
                      <span>
                        ПЕРЕЙТИ К АКЦИИ <HiOutlineArrowNarrowRight />
                      </span>
                    </span>
                  </button>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}
    </>
  )
}

export default MainCarousel
