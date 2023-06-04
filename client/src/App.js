import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { Box, createTheme, CssBaseline } from '@mui/material';
import { Main } from './Main';
import { AuthenticationContextProvider } from './Contexts/AuthenticationContext';
import { WordsContextProvider } from './Contexts/WordsContext';
import './App.css';

const mdTheme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={mdTheme}>
        <AuthenticationContextProvider>
          <WordsContextProvider>
            <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              <Main />
            </Box>
          </WordsContextProvider>
        </AuthenticationContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
