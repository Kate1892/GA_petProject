import React, { useEffect } from 'react'

import styles from './LogForm.module.scss'

type FV = {
  phoneNumber: string
}

type Prop = {
  formValues: FV
  setFormValues: Function
}

const FormInput: React.FC<Prop> = props => {
  const { ...inputProps } = props

  const getInputNumbers = input => {
    return input.value.replace(/\D/g, '')
  }

  const onChange = e => {
    let input = e.target
    let numbers = getInputNumbers(input)
    let formattedNumber = ''
    let selectionStart = input.selectionStart

    if (!numbers) {
      // setPhoneNumber('')
      return (input.value = '')
    }
    // } else {
    //   setPhoneNumber(numbers)
    // }

    if (input.value.length != selectionStart) {
      console.log('cередина')
      //редатирование в середине
      if (input.value[0] != '+') {
        // Add "+" if input value startswith not "+"
        var oldSelectionStart = input.selectionStart

        input.value = '+' + input.value

        input.selectionStart = input.selectionEnd = oldSelectionStart + 1
      }

      if (e.nativeEvent.data && /\D/g.test(e.nativeEvent.data)) {
        input.value = numbers
      }

      input.value = formattedNumber
      return
    }

    if (['7', '8', '9'].indexOf(numbers[0]) > -1) {
      if (numbers[0] == '9') numbers = '7' + numbers
      let firstSymbols = numbers[0] == '8' ? '8' : '+7'
      formattedNumber = firstSymbols + ' '
      if (numbers.length > 1) {
        formattedNumber += '(' + numbers.substring(1, 4)
      }
      if (numbers.length >= 5) {
        formattedNumber += ') ' + numbers.substring(4, 7)
      }
      if (numbers.length >= 8) {
        formattedNumber += '-' + numbers.substring(7, 9)
      }
      if (numbers.length >= 10) {
        formattedNumber += '-' + numbers.substring(9, 11)
      }
    } else {
      formattedNumber = '+' + numbers.substring(0, 16)
    }
    input.value = formattedNumber

    // props.setFormValues({
    //   ...props.formValues,
    //   [e.target.name]: e.target.value,
    // })
    //  setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  //удаление последних символов
  const onKeyDown = e => {
    const element = e.target as HTMLInputElement
    let inputValue = e.target.value.replace(/\D/g, '')

    if (e.keyCode === 8 && getInputNumbers(e.target).length == 1) {
      e.target.value = ''
    } else if ([8, 46].indexOf(e.keyCode) > -1 && inputValue.length > 1) {
      // Prevent when removing service symbols
      let symToClear = ''
      switch (e.keyCode) {
        case 8: // BackSpace key
          if (e.target.selectionStart) {
            symToClear = e.target.value[e.target.selectionStart - 1]
          }
          break
        case 46:
          if (e.target.selectionStart) {
            // Delete key
            symToClear = e.target.value[e.target.selectionStart]
          }
          break
      }
      if (symToClear && /\D/.test(symToClear)) e.preventDefault()
    }

    props.setFormValues({
      ...props.formValues,
      [(e.target as HTMLInputElement).name]: e.target.value,
    })
  }

  const onPaste = e => {
    const element = e.target as HTMLInputElement

    let pasted = e?.nativeEvent?.clipboardData?.getData('Text')

    let numbers = getInputNumbers(e.target)

    if (pasted) {
      if (/\D/g.test(pasted)) {
        e.target.value = numbers
        return
      }
    }
    // props.setFormValues({
    //   ...props.formValues,
    //   [e.target.name]: e.target.value,
    // })
  }

  // useEffect(() => {
  //   props.setFormValues(JSON.parse(window.localStorage.getItem('formValues')))
  // }, [])

  // useEffect(() => {
  //   window.localStorage.setItem('formValues', props.formValues)
  // }, [props.formValues])

  return (
    <>
      <input
        className={styles.formInput}
        {...inputProps}
        placeholder={'Введите номер'}
        type='tel'
        maxLength={18}
        onChange={onChange}
        name='phoneNumber'
        value={props.formValues.phoneNumber}
        //value={e.target.value}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
      ></input>
    </>
  )
}

export default FormInput
