import { styled } from '@mui/material/styles';
import { List, ListItemButton, Toolbar } from '@mui/material';
import { Loading } from './Loading';
import { Search } from './Search';
import { useWordsContext } from './Contexts/WordsContext';
import MuiDrawer from '@mui/material/Drawer';
import React from 'react';
import { Link } from 'react-router-dom';

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
  const { loadingWordRoots, query, searchResults, setWordRoot } = useWordsContext();

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
      <Search />
      {loadingWordRoots && <Loading />}
      {!loadingWordRoots && !query && (
        <p>
          Bonvolu enigi serĉdemandon.
        </p>
      )}
      {!loadingWordRoots && query && searchResults && (
        <List component="nav" style={{ textAlign: 'left', maxHeight: '70vh', overflowY: 'auto', scrollBehavior: 'smooth' }}>
          {searchResults.map(({ radiko }) => (
            <ListItemButton
              component={Link}
              to='/'
              key={radiko}
              onClick={() => setWordRoot(radiko)}
              sx={{
                paddingLeft: '2.8em'
              }}>
              {radiko}{'-'}
            </ListItemButton>
          ))}
        </List>
      )}
    </StyledDrawer>
  );
}
