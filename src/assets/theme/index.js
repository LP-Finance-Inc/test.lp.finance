import React, { useState } from "react";
import { darkTheme, lightTheme, GlobalStyle } from "./Config";
import { ThemeProvider } from "styled-components";

const ModeProvider = ({ children }) => {
  const [theme, setTheme] = useState(false);

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const mode = localStorage.getItem("Mode");
    if (mode) {
      setTheme(mode);
    }
  }, []);

  const body = (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{body}</div>;
  }

  return body;
};

export default ModeProvider;
