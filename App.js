import React from 'react';

import {StoreProvider} from './src/store';
import reducers from './src/reducers';
import initialState from './src/store/initialState';

import Home from './src/pages/Home';

export default function App() {
  return (
    <StoreProvider initialState={initialState} reducer={reducers}>
      <Home />
    </StoreProvider>
  );
}
