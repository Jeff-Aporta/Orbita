crearEstilo({
    "body": {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        "& h1": {
            fontSize: "400%"
        },
    }
})


function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="ta-center">
                <Logo w={150} />
                <h1>
                    404
                </h1>
                <h2>Página no encontrada</h2>
                <Button variant="contained" color="primary" href="/">
                    Volver al inicio
                </Button>
            </div>
        </ThemeProvider>
    );
}

setTimeout(() => {
    window.location.href = "/";
}, 5000);