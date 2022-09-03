import React, { useEffect } from 'react'
import styles from './Pagination.module.scss'
import ReactPaginate from 'react-paginate'
import { useSelector } from 'react-redux'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

import { useAppDispatch } from '../../../redux/store'
import { selectItems } from '../../../redux/items/selectors'
import { setPageNumber } from '../../../redux/items/slice'
import { fetchItems } from '../../../redux/items/asyncAction'

const Pagination = () => {
  const dispatch = useAppDispatch()

  const onChangePage = (num: number) => {
    dispatch(setPageNumber(num))
  }

  const { pageNumber } = useSelector(selectItems)

  const fetchPR = async () => {
    dispatch(
      fetchItems({
        pageNumber,
      })
    )
  }
  useEffect(() => {
    fetchPR()
  }, [pageNumber])

  return (
    <>
      <ReactPaginate
        className={styles.main}
        nextLabel={<AiOutlineArrowRight size={20} />}
        previousLabel={<AiOutlineArrowLeft size={20} />}
        onPageChange={event => onChangePage(event.selected + 1)}
        pageCount={3}
        forcePage={pageNumber - 1}
      />
    </>
  )
}

export default Pagination
