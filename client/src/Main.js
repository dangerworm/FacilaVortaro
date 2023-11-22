import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { WordRoot } from "./WordRoot";
import { Admin } from "./Admin";
import { Vortlisto } from "Vortlisto";
import { Facililujo } from "Facililo/Facililo";
import { Footer } from "./Footer";
import Toolbar from "@mui/material/Toolbar";

export const Main = () => {
  const [sideBarOpen, setSideBarOpen] = React.useState(true);

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
            <Route path="/vortlisto" element={<Vortlisto />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/facililo" element={<Facililujo />} />
          </Routes>
          <Footer />
        </Container>
      </Box>
    </>
  )
}
