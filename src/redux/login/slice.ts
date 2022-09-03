import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  logFormOpen: false,
  phoneNumber: '',
}

export const logSlice = createSlice({
  name: 'logForm',
  initialState,
  reducers: {
    setLogFormOpen(state, action: PayloadAction<boolean>) {
      state.logFormOpen = action.payload
    },
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload
    },
  },
})

export const { setLogFormOpen, setPhoneNumber } = logSlice.actions

export default logSlice.reducer
