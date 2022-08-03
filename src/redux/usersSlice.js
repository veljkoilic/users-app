import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
}
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, actions) => {
     state.users = actions.payload
    },
    addUser: (state, actions) => {
      state.users.push(actions.payload)
    }
  },
})

export const { setUsers, addUser } = usersSlice.actions
export default usersSlice.reducer