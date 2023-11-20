import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Badge, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { useAuthenticationContext } from "./Contexts/AuthenticationContext";
import { AppBar } from "./AppBar";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';

export const Header = ({ sideBarOpen, toggleSideBarOpen }) => {
  const { authenticateUser, user, userIsAdmin, logout } = useAuthenticationContext();

  const [anchorElement, setAnchorElement] = useState();
  const [dialogVisible, setDialogVisible] = useState(false);

  const userMenuOpen = Boolean(anchorElement);

  const handleUserMenuOpen = (event) => {
    setAnchorElement(event.currentTarget);
  }

  const handleUserMenuClose = () => {
    setAnchorElement(undefined);
  }

  const showLoginDialog = () => {
    setDialogVisible(true);
    handleUserMenuClose();
  }

  const onLoginSuccess = (response) => {
    authenticateUser(response.credential)
    setDialogVisible(false);
  }

  const onLoginError = (response) => {
    console.log("An error occurred connecting to the Google API");
    setDialogVisible(false);
  }

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
  }

  return (
    <>
      <AppBar position={'absolute'} open={sideBarOpen}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
            backgroundColor: 'rgb(0,154,43)'
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleSideBarOpen}
            sx={{
              marginLeft: '6px',
              marginRight: '36px',
              ...(sideBarOpen && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            La difinoj de uea.facila
          </Typography>
          <Link to='/facililo' style={{ color: 'inherit', textDecoration: 'none' }}>
            <IconButton color="inherit">
              <EditNoteIcon style={{ fontSize: '40pt' }} />
            </IconButton>
          </Link>
          {userIsAdmin && (
            <Link to='/admin' style={{ color: 'inherit', textDecoration: 'none' }}>
              <IconButton color="inherit">
                <AdminPanelSettingsIcon style={{ fontSize: '40pt' }} />
              </IconButton>
            </Link>
          )}
          <IconButton
            color="inherit"
            onClick={handleUserMenuOpen}
            aria-controls={userMenuOpen ? 'user-menu' : undefined}
            aria-haspopup={true}
            aria-expanded={userMenuOpen ? true : undefined}>
            <Badge badgeContent={0} color="secondary">
              {user?.picture ? (
                <Box
                  component="img"
                  sx={{
                    borderRadius: '50%',
                    height: 50,
                    width: 50,
                    maxHeight: { xs: 50, md: 100 },
                    maxWidth: { xs: 50, md: 100 },
                  }}
                  src={user.picture} />
              ) : (
                <PersonIcon />
              )}
            </Badge>
          </IconButton>
          <Menu
            id='user-menu'
            anchorEl={anchorElement}
            open={userMenuOpen}
            onClose={handleUserMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}>
            {!user && (
              <MenuItem onClick={() => showLoginDialog()}>Ensalutu</MenuItem>
            )}
            {user && (
              <MenuItem component={Link} to='/' onClick={handleLogout}>Elsalutu</MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
      <Dialog
        open={dialogVisible}
        onClose={() => setDialogVisible(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Ensalutu"}</DialogTitle>
        <DialogContent style={{ width: '30em' }}>
          <DialogContentText id="alert-dialog-description">
            Bonvolu ensaluti per via Google-konto.
            <br />
            <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogVisible(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}