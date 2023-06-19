import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { Box, createTheme, CssBaseline } from '@mui/material';
import { Main } from './Main';
import { AuthenticationContextProvider } from './Contexts/AuthenticationContext';
import { DatabaseContextProvider } from './Contexts/DatabaseContext';
import { FacililoContextProvider } from 'Contexts/FacililoContext';
import './App.css';

const mdTheme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={mdTheme}>
        <AuthenticationContextProvider>
          <DatabaseContextProvider>
            <FacililoContextProvider>
              <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Main />
              </Box>
            </FacililoContextProvider>
          </DatabaseContextProvider>
        </AuthenticationContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
