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

function AppTheme({ children }) {
  console.log("AppTheme", theme)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

function AppSimple({ children }) {
  return (
    <AppTheme>
      <div className="app">
        {children}
      </div>
    </AppTheme>
  );
}

function AppSimpleCentred({ children }) {
  crearEstilo({
    ".app": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }
  })
  return (
    <AppTheme>
      <div className="app">
        <Paper elevation={3} style={{ padding: 15 }}>
          {children}
        </Paper>
      </div>
    </AppTheme>
  );
}

function AppLogged({ children }) {
  return (
    <AppTheme>
      <MenuSuperior />
      <MenuIzquierda />
      <div className="app">
        {children}
      </div>
    </AppTheme>
  );
}

function AppRender({ children, className }) {
  return (
    <ThemeProvider theme={theme}>
      <div className={"render" + className}>
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