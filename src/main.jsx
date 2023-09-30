import React from 'react'
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ChakraProvider } from '@chakra-ui/react'

import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const emotionCache = createCache({
  key: 'emotion-css-cache',
  prepend: true, // ensures styles are prepended to the <head>, instead of appended
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CacheProvider value={emotionCache}>

      <ChakraProvider>
        <App />
      </ChakraProvider>
    </CacheProvider>

  </React.StrictMode>,
)
