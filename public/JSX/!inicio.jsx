addLink('/JSX/abrevs.css');

Object.assign(window, window['MaterialUI']);

const darkTheme = createTheme({
  typography: {
    button: {
      textTransform: 'none'
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#1E90FF',
    },
    secondary: {
      main: '#363636',
      color: '#FFFFFF',
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    secondary: {
      main: '#363636',
      color: '#FFFFFF',
    },
  },
});

if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "dark");
}

let theme = localStorage.getItem("theme") == "dark" ? darkTheme : lightTheme;

let styleBasic = document.createElement("style");
styleBasic.innerHTML = `
      body {
          background: ${theme == darkTheme ? "#121212" : "#FFFFFF"};
      }
`;

document.head.appendChild(styleBasic);

let colorTheme = {
  fuente: {
    clase: theme == darkTheme ? "c-white" : "c-black",
    codigo: theme == darkTheme ? "white" : "black",
  }
}

function AppSimple({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        {children}
      </div>
    </ThemeProvider>
  );
}

function AppLogged({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="menu-superior">
        <MenuSuperior />
      </div>
      <div className="menu-izquierda">
        <MenuIzquierda />
      </div>
      <div className="app">
        {children}
      </div>
    </ThemeProvider>
  );
}

function AppRender({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <div className="render">
        {children}
      </div>
    </ThemeProvider>
  );
}

function IconButtonContador({ children, contador, title }) {
  return (
    <Tooltip title={title} arrow>
      <span style={{ position: "relative" }}>
        <IconButton>
          {children}
        </IconButton>
        <span style={{
          position: "absolute",
          top: "-10px",
          right: 0,
          padding: 2,
          minWidth: 20,
          background: "tomato",
          borderRadius: 10,
          textAlign: "center",
          color: "white",
          fontSize: "10px",
          fontWeight: "bold",
        }}>
          {contador}
        </span>
      </span>
    </Tooltip>
  )
}