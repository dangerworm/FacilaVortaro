import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { WordRoot } from "./WordRoot";
import { Admin } from "./Admin";
import { Footer } from "./Footer";

export const Main = () => {
  const [sideBarOpen, setSideBarOpen] = React.useState(false);

  const toggleSideBarOpen = () => {
    setSideBarOpen(!sideBarOpen);
  };

  return (
    <>
      <Header sideBarOpen={sideBarOpen} toggleSideBarOpen={toggleSideBarOpen} />
      <SideBar sideBarOpen={sideBarOpen} toggleSideBarOpen={toggleSideBarOpen} />
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
          <Routes>
            <Route path="/" element={<WordRoot />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Footer />
        </Container>
      </Box>
    </>
  )
}
