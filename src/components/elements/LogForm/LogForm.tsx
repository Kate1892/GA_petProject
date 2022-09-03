import styles from './LogForm.module.scss'
import { GrClose } from 'react-icons/gr'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectLog } from '../../../redux/login/selectors'
import { setLogFormOpen } from '../../../redux/login/slice'
import { FormInput } from '../..'

type InputProps = {
  accIconRef: React.RefObject<HTMLLIElement>
}

const LogForm: React.FC<InputProps> = ({ accIconRef }) => {
  const formRef = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch()
  const { logFormOpen, phoneNumber } = useSelector(selectLog)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (accIconRef.current?.contains(e.target as Node)) {
        dispatch(setLogFormOpen(true))

        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = '17px'

        return
      }
      if (!formRef.current?.contains(e.target as Node)) {
        // formRef.current.classList.toggle(styles.closeDrawer)
        dispatch(setLogFormOpen(false))
        document.body.style.overflow = 'scroll'
        document.body.style.paddingRight = '0px'
        return
      }
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [logFormOpen])

  const [formValues, setFormValues] = useState({
    phoneNumber: '',
  })

  const inputs = [
    {
      id: 1,
      name: 'phoneNumber',
      type: 'string',
    },
    // {
    //   id: 2,
    //   name: 'phoneNumber',
    //   type: 'number',
    // },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div ref={formRef} className={styles.main}>
      <div className={styles.closeIcon}>
        <GrClose
          size={25}
          onClick={() => {
            dispatch(setLogFormOpen(false))
            document.body.style.overflow = 'scroll'
            document.body.style.paddingRight = '0px'
          }}
        />
      </div>
      <div className={styles.content}>
        <div style={{ marginBottom: '50px' }}>
          <span className={styles.header}>войти или зарегистрироваться</span>
          <p style={{ marginTop: '10px' }}>
            Мы отправим на номер SMS-сообщение с кодом подтверждения.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          {inputs.map(input => (
            <FormInput
              key={input.id}
              {...input}
              // value={formValues[input.name]}
              formValues={formValues}
              setFormValues={setFormValues}
              // onChange={onChange}
              // onKeyDown={onKeyDown}
              // onPaste={onPaste}
            />
          ))}

          <button className={styles.button}>получить код</button>
        </form>
        <p className={styles.footer}>
          Сайт использует reCAPTCHA согласно{' '}
          <a href='https://policies.google.com/privacy'>
            Политике конфиденциальности
          </a>{' '}
          и{' '}
          <a href='https://policies.google.com/terms'>Условиям обслуживания</a>{' '}
          Google.
        </p>
      </div>
    </div>
  )
}

export default LogForm
