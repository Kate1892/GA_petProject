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

  const getInputNumbers = (input: EventTarget) => {
    return (input as HTMLInputElement).value.replace(/\D/g, '')
  }

  const onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    console.log('CHANGE')
    let input = e.currentTarget
    let numbers = getInputNumbers(input)
    let formattedNumber = ''
    let selectionStart = input.selectionStart

    if (!numbers) {
      return (input.value = '')
    }

    if (input.value.length != selectionStart) {
      // if (input.value[0] != '+') {
      //   var oldSelectionStart = input.selectionStart
      //   input.value = '+' + input.value
      //   input.selectionStart = input.selectionEnd = oldSelectionStart + 1
      // }

      if (
        (e.nativeEvent as any).data &&
        /\D/g.test((e.nativeEvent as any).data)
      ) {
        input.value = numbers
      }

      props.setFormValues({
        ...props.formValues,
        [input.name]: input.value,
      })
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

    props.setFormValues({
      ...props.formValues,
      [input.name]: input.value,
    })
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('KEYDOWN')
    const element = e.target as HTMLInputElement
    let inputValue = element.value.replace(/\D/g, '')

    if (e.keyCode === 8 && getInputNumbers(element).length == 1) {
      element.value = ''
    } else if ([8, 46].indexOf(e.keyCode) > -1 && inputValue.length > 1) {
      let symToClear = ''
      switch (e.keyCode) {
        case 8: // BackSpace key
          if (element.selectionStart) {
            symToClear = element.value[element.selectionStart - 1]
          }
          break
        case 46: // Delete key
          if (element.selectionStart) {
            symToClear = element.value[element.selectionStart]
          }
          break
      }
      if (symToClear && /\D/.test(symToClear)) e.preventDefault()
    }

    props.setFormValues({
      ...props.formValues,
      [element.name]: element.value,
    })
  }

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    console.log('PASTE')
    const element = e.target as HTMLInputElement

    let pasted = e?.nativeEvent?.clipboardData?.getData('Text')

    let numbers = getInputNumbers(e.target)

    if (pasted) {
      if (/\D/g.test(pasted)) {
        element.value = numbers
        props.setFormValues({
          ...props.formValues,
          [element.name]: element.value,
        })
        return
      }
    }
    props.setFormValues({
      ...props.formValues,
      [element.name]: element.value,
    })
  }

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
        onKeyDown={onKeyDown}
        onPaste={onPaste}
      ></input>
    </>
  )
}

export default FormInput
