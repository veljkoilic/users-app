import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/userSlice'
import usersReducer from '../redux/usersSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
  },
})