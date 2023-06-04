import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { List, Toolbar } from '@mui/material';
import { useWordsContext } from './Contexts/WordsContext';
import MuiDrawer from '@mui/material/Drawer';

const drawerWidth = 240;

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

export const Drawer = () => {
  const { getWordBases } = useWordsContext();

  const [wordBases, setWordBases] = useState([]);

  useEffect(() => {
    getWordBases()
      .then((wordBases) => {
        setWordBases(wordBases);
      });
  }, []);

  return (
    <StyledDrawer variant="permanent" open={true}>
      <div style={{
        left: "1em",
        fontSize: "120%",
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
      <List component="nav">
        {wordBases && wordBases.length > 0 && wordBases.slice(10).map(({ wordBase }) => (
          <p>{wordBase.vorto}</p>
        ))}
      </List>
    </StyledDrawer >
  );
}
