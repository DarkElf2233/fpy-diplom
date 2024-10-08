import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    rememberUser: (state, newUser) => {
      state.user = newUser
    },
    forgetUser: (state) => {
      state.user = null
    }
  },
})

export const { rememberUser, forgetUser } = userSlice.reducer

export default userSlice.reducer