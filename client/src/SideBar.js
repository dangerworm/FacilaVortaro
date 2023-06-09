import React from 'react';
import { styled } from '@mui/material/styles';
import { IconButton, List, ListItemButton, Toolbar } from '@mui/material';
import { Loading } from './Loading';
import { Search } from './Search';
import { useDatabaseContext } from './Contexts/DatabaseContext';
import { Link } from 'react-router-dom';
import { removePunctuation } from 'Helpers/word-display';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import esperantaFlago from './esperanta-flago.png';
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
        width: 0,
        [theme.breakpoints.up('sm')]: {
          width: 0,
        },
      }),
    },
  }),
);

export const SideBar = ({ sideBarOpen, toggleSideBarOpen }) => {
  const { loadingWordRoots, query, searchResults, setWordRoot } = useDatabaseContext();

  return (
    <StyledDrawer variant="permanent" open={sideBarOpen}>
      <div style={{
        fontSize: "120%",
        margin: '0.5em 0 0 -0.7em',
        position: "absolute",
        width: "50%"
      }}>
        <img 
          src={esperantaFlago}
          alt="Esperanta flago"
          style={{ 
            maxWidth: "4em",
            marginRight: "0.5em" }}
        />
      </div>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
          marginTop: '0.8em'
        }}
      >
        <IconButton onClick={toggleSideBarOpen} style={{ marginTop: "-0.75em" }}>
          <ChevronLeftIcon/>
        </IconButton>
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
          {searchResults.map(({ kapvorto }) => (
            <ListItemButton
              component={Link}
              to='/'
              key={kapvorto}
              onClick={() => setWordRoot(kapvorto)}
              sx={{
                paddingLeft: '2.8em'
              }}>
              {removePunctuation(kapvorto)}
            </ListItemButton>
          ))}
        </List>
      )}
    </StyledDrawer>
  );
}
