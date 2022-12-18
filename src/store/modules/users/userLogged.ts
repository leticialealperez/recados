import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const userLoggedSlice = createSlice({
  name: 'userLogged',
  initialState,
  reducers: {
    createUserLogged(state, action) {
      localStorage.setItem('userLogged', action.payload)
      return action.payload;
    },
    clearUserLogged() {
      localStorage.clear()
      return initialState;
    },
  },
});

export const { createUserLogged, clearUserLogged } = userLoggedSlice.actions;
export default userLoggedSlice.reducer;
