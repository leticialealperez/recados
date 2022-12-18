import React from 'react';
import { CssBaseline } from "@mui/material";
import AppRoutes from "./router/Router";
import { Provider } from 'react-redux';
import minhaStore from './store';


function App(): JSX.Element {
  return (
    <>
      <Provider store={minhaStore}>
          <CssBaseline />
          <AppRoutes />
      </Provider>
    </>
  );
}

export default App;
