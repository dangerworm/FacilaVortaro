import { ThemeProvider } from '@emotion/react';
import { Box, createTheme, CssBaseline } from '@mui/material';
import { WordsContextProvider } from './Contexts/WordsContext';
import './App.css';

const mdTheme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={mdTheme}>
          <WordsContextProvider>
            <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              <p>Hello</p>
            </Box>
          </WordsContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
