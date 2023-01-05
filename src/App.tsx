import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Main from './Main';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </>
  );
}
