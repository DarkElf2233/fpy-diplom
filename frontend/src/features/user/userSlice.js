import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: null,
  },
  reducers: {
    rememberUser: (state, newUser) => {
      state.value = newUser
    },
    forgetUser: (state) => {
      state.value = null
    }
  }
})

export const { rememberUser, forgetUser } = userSlice.actions

export default userSlice.reducer