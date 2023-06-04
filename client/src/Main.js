import { Backdrop, Box, CircularProgress, Container, Grid, Paper } from "@mui/material";
import { Drawer } from "./Drawer";
import { Footer } from "./Footer";
import { GoogleLogin } from "@react-oauth/google";
import { useAuthenticationContext } from "./Contexts/AuthenticationContext";
import Toolbar from "@mui/material/Toolbar";

export const Main = () => {
  const { loading, authenticateUser, user, logout } = useAuthenticationContext();

  const responseMessage = (response) => {
    authenticateUser(response.credential);
  };

  const errorMessage = () => {
    console.log("An error occurred connecting to the Google API");
  };

  // if (user === undefined) {
  //   return (
  //     <>
  //       <Grid
  //         container
  //         spacing={3}
  //         justifyContent="center"
  //         alignItems="center"
  //         style={{ height: "100vh" }}
  //       >
  //         <Grid item xs={12} md={6} lg={4}>
  //           <Paper
  //             sx={{
  //               p: 2,
  //               display: "flex",
  //               flexDirection: "column",
  //               width: "90%",
  //               maxWidth: 400,
  //             }}
  //           >
  //             <h1>Memory Vault</h1>
  //             <p>
  //               Welcome! Memory Vault is a new kind of password manager. Please
  //               log in with a Google account to continue.
  //             </p>
  //             <hr />
  //             <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
  //           </Paper>
  //         </Grid>
  //       </Grid>
  //       <Backdrop
  //         sx={{
  //           color: '#fff',
  //           zIndex: (theme) => theme.zIndex.drawer + 1
  //         }}
  //         open={loading}
  //       >
  //         <CircularProgress color="inherit" />
  //       </Backdrop>
  //     </>
  //   )
  // } else {
  return (
    <>
      <Drawer drawerOpen={true} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <p>Hello</p>
          <Footer style={{ marginTop: "5em" }} />
        </Container>
      </Box>
    </>
  )
  //}
}
