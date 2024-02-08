import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme/theme.js";
import { GlobalStyle } from "./GlobalStyles";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.js";

function App() {
  const { isDarkTheme } = useSelector((state) => state.theme);

  const getCurrentTheme = () => (isDarkTheme ? darkTheme : lightTheme);
  return (
    <ThemeProvider theme={getCurrentTheme()}>
      <React.Fragment>
        <GlobalStyle />
        <Navbar />
        <Outlet />
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
