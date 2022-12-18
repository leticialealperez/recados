import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';


const store = configureStore({
  reducer: rootReducer,
});

// captura dos tipos das entidades salvas na nossa store
export type RootState = ReturnType<typeof store.getState>;

// captura do tipo da função dispatch do toolkit - tipo de todas as actions disponiveis a partir dos nossos reducers
export type AppDispatch = typeof store.dispatch;

export default store;

