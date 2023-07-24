import React from 'react'
// Components
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import { Loading } from './components'
import { createTheme, ThemeProvider } from '@mui/material';
// Pages
const Home = React.lazy(() => import('./pages/Home'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#f5f5f5', 
    },
    secondary: {
      main: '#242424',
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: '#f5f5f5',
          '&::placeholder': {
            color: '#f5f5f5',
          },
        },
      },
    },
  }
})

export default function App() {
  return <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drink" element={<div>Element</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </ThemeProvider>
}

