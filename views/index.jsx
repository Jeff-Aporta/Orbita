if (user) {
        window.location.href = '/logged';
}

crearEstilo({
        ".background-container": {
                position: "absolute",
                overflow: "hidden",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",

                ".background, .background2": {
                        "min-height": "100vh",
                        "min-width": "100vw",
                        position: "absolute",
                        top: 0,
                        left: 0,
                },

                ".background": {
                        "background-image": "linear-gradient(to right, darkblue, black, rgb(0, 56, 139))",
                        "background-size": "400% 100%",
                        animation: "gradient 15s ease infinite alternate",
                        "z-index": 1,
                },

                ".background2": {
                        "object-fit": "cover",
                        "z-index": 2,
                },
        },

        "@keyframes gradient": {
                "0%": {
                        "background-position": "0% 0%",
                },
                "100%": {
                        "background-position": "100% 0%",
                }
        },

        ".app": {
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                height: "100vh",
                width: "100vw",

                ".banner-izquierda": {
                        width: "500px",

                        "& h1": {
                                fontSize: "80px",
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center",
                        },
                },
        }
})

const App = () => {
        return (
                <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Fondo />
                        <div className="app">
                                <BannerIzquierda />
                                <Paper elevation={3} className="d-inline-block pad-20" style={{ width: "400px" }}>
                                        <Formulario />
                                </Paper>
                        </div>
                </ThemeProvider>
        );


        function Fondo() {
                return <div className="background-container">
                        <div className="background" />
                        <img src="img/svg/back1.svg" className="background2" />
                </div>;
        }

        function BannerIzquierda() {
                return <div className="banner-izquierda">
                        <h1 className="berlow"                        >
                                <Logo w={100} />
                                &nbsp;&nbsp;
                                Orbita
                        </h1>
                        <h2>
                                Te ayuda a comunicarte y compartir con las personas que forman parte de tu vida.
                        </h2>
                </div>;
        }

        function Formulario() {
                return (
                        <React.Fragment>
                                <form action="/login-verify" method="POST">
                                        <TextField className="usuario" name="usuario" label="Usuario" fullWidth />
                                        <br />
                                        <br />
                                        <TextField className="contraseña" name="contraseña" label="Contraseña" type="password" fullWidth onKeyUp={(evt) => {
                                                if (evt.keyCode === 13) {
                                                        document.querySelector("form").submit();
                                                }
                                        }} />
                                        <br />
                                        <br />
                                        <Opciones />
                                </form>
                        </React.Fragment>
                );

                function Opciones() {
                        return <div className="ta-right">
                                <BotonIniciarSesion />
                                <br />
                                <br />
                                <Link rel="stylesheet" href="#">
                                        ¿Olvidaste tu contraseña?
                                </Link>
                                <br />
                                <br />
                                <hr />
                                <br />
                                <BotonCrearNuevaCuenta />
                        </div>;
                }

                function BotonIniciarSesion() {
                        return (
                                <Button variant="contained" color="primary" onClick={() => document.querySelector("form").submit()}>
                                        Ingresar
                                </Button>
                        );
                }

                function BotonCrearNuevaCuenta() {
                        return <Button variant="contained" color="secondary" onClick={() => {
                                swal.fire({
                                        title: "Registro",
                                        html: `<div class="ta-left App-registro"></div>`,
                                        showCloseButton: true,
                                        showConfirmButton: false,
                                        showCancelButton: false,
                                        willOpen: () => {
                                                /*
                                                        http://localhost:3000/BD?json-query=usuarios/{
                                                                CREAR: {
                                                                        login: "alexmacias",
                                                                        contraseña: "registel",
                                                                        nombre: "alex",
                                                                        apellido: "macias",
                                                                        "fecha-nacimiento": "1990-01-01"
                                                                }
                                                        }
                                                */
                                                ReactDOM.render(
                                                        <AppRender>
                                                                <div style={{
                                                                        display: "flex",
                                                                        justifyContent: "space-between",
                                                                }}>
                                                                        <TextField id="nombre" label="Nombre" />
                                                                        <TextField id="apellido" label="Apellido" />
                                                                </div>
                                                                <br />
                                                                <TextField id="login" label="Usuario" fullWidth />
                                                                <br />
                                                                <br />
                                                                <div style={{
                                                                        display: "flex",
                                                                        justifyContent: "space-between",
                                                                }}>
                                                                        <TextField id="contraseña1" label="Contraseña" type="password" />
                                                                        <TextField id="contraseña2" label="Repetir contraseña" type="password" />
                                                                </div>
                                                                <br />
                                                                <TextField
                                                                        id="fecha-nacimiento"
                                                                        label="Fecha de nacimiento"
                                                                        type="date"
                                                                        InputLabelProps={{
                                                                                shrink: true,
                                                                        }}
                                                                        fullWidth
                                                                />
                                                                <br />
                                                                <br />
                                                                <Button variant="contained" color="primary" onClick={async () => {
                                                                        if (document.querySelector(".App-registro #contraseña1").value !== document.querySelector(".App-registro #contraseña2").value) {
                                                                                swal.fire({
                                                                                        title: "Error",
                                                                                        text: "Las contraseñas no coinciden",
                                                                                        icon: "error",
                                                                                        confirmButtonText: "Cerrar",
                                                                                });
                                                                                return;
                                                                        }
                                                                        let res = await (await fetch(`/BD?json-query=usuarios/${JSON.stringify({
                                                                                CREAR: {
                                                                                        login: document.querySelector(".App-registro #login").value,
                                                                                        contraseña: document.querySelector(".App-registro #contraseña1").value,
                                                                                        nombre: document.querySelector(".App-registro #nombre").value,
                                                                                        apellido: document.querySelector(".App-registro #apellido").value,
                                                                                        "fecha-nacimiento": document.querySelector(".App-registro #fecha-nacimiento").value,
                                                                                },
                                                                        })}`)).json();

                                                                        console.log("res", res);

                                                                        if (res["error"]) {
                                                                                swal.fire({
                                                                                        title: "Error",
                                                                                        text: res["error"],
                                                                                        icon: "error",
                                                                                        confirmButtonText: "Cerrar",
                                                                                });
                                                                                return;
                                                                        } else if (res["ok"]) {
                                                                                swal.fire({
                                                                                        title: "Usuario creado",
                                                                                        text: "Usuario creado con éxito",
                                                                                        icon: "success",
                                                                                        confirmButtonText: "Cerrar",
                                                                                });
                                                                        } else {
                                                                                swal.fire({
                                                                                        title: "Error",
                                                                                        text: "Error desconocido",
                                                                                        icon: "error",
                                                                                        confirmButtonText: "Cerrar",
                                                                                });
                                                                        }
                                                                }}>

                                                                        Crear cuenta
                                                                </Button>
                                                        </AppRender>,
                                                        document.querySelector(".App-registro")
                                                );
                                        },
                                });
                        }}>
                                Crea una cuenta
                        </Button>;
                }
        }
};