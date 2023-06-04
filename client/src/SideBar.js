import { styled } from '@mui/material/styles';
import { Button, List, ListItemButton, Toolbar } from '@mui/material';
import { Loading } from './Loading';
import { Search } from './Search';
import { useWordsContext } from './Contexts/WordsContext';
import MuiDrawer from '@mui/material/Drawer';
import React from 'react';

const drawerWidth = 300;

const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export const SideBar = () => {
  const { loadingWords, searchResults, setWord } = useWordsContext();

  return (
    <StyledDrawer variant="permanent" open={true}>
      <div style={{
        left: "1em",
        fontSize: "120%",
        marginBottom: '1em',
        position: "absolute",
        top: "1em",
        width: "50%"
      }}>
        Facila Vortaro
      </div>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
      </Toolbar>
      {loadingWords && <Loading />}
      {!loadingWords && searchResults &&
        (
          <>
            <Search />
            <List component="nav" style={{ textAlign: 'left', maxHeight: '70vh', overflowY: 'auto', scrollBehavior: 'smooth' }}>
              {searchResults.map(({ vorto }) => (
                <ListItemButton 
                  key={vorto}
                  onClick={() => setWord(vorto)}
                  sx={{ paddingLeft: '2.8em' 
                }}>
                  {vorto}
                </ListItemButton>
              ))}
            </List>
          </>
        )}
    </StyledDrawer>
  );
}
