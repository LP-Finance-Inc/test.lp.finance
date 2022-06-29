import React, { useState, useEffect } from "react";
import { darkTheme, lightTheme, GlobalStyle } from "./Config";
import { ThemeProvider } from "styled-components";

const ModeProvider = ({ children }) => {
  const [theme, setTheme] = useState("");

  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    const mode = "DARK_MODE";
    setTheme(mode);
  }, []);

  const body = (
    <ThemeProvider theme={theme === "LIGHT_MODE" ? lightTheme : darkTheme}>
      <GlobalStyle Mode={theme} />
      {children}
    </ThemeProvider>
  );

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{body}</div>;
  }

  return body;
};

export default ModeProvider;
