import React from "react";
import { Backdrop, Box, CircularProgress, Container, Grid, Paper } from "@mui/material";
import { SideBar } from "./SideBar";
import { Footer } from "./Footer";
import { GoogleLogin } from "@react-oauth/google";
import { useAuthenticationContext } from "./Contexts/AuthenticationContext";
import Toolbar from "@mui/material/Toolbar";
import { Word } from "./Word";
import { useWordsContext } from "Contexts/WordsContext";
import { Header } from "./Header";

export const Main = () => {
  const { loading, authenticateUser, user, logout } = useAuthenticationContext();
  const { word } = useWordsContext();

  const responseMessage = (response) => {
    authenticateUser(response.credential);
  };

  const errorMessage = () => {
    console.log("An error occurred connecting to the Google API");
  };

  return (
    <>
      <Header />
      <SideBar />
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
          <Word />
          <Footer />
        </Container>
      </Box>
    </>
  )
}
