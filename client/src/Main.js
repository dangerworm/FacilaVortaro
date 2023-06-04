import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { Word } from "./Word";
import { Admin } from "./Admin";
import { Footer } from "./Footer";

export const Main = () => {
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
          <Routes>
            <Route path="/" element={<Word />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Footer />
        </Container>
      </Box>
    </>
  )
}
