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
                        "background-image": "linear-gradient(to right, darkblue, dodgerblue, rgb(0, 56, 139))",
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
                        filter: "drop-shadow(3px 3px 0px rgba(0, 0, 0, 1))",
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

function App() {
        return (
                <AppTheme>
                        <div className="app-capas">
                                <Fondo />
                                <div className="app">
                                        <BannerIzquierda />
                                        <Paper elevation={3} className="d-inline-block pad-20" style={{ width: "400px" }}>
                                                <Formulario />
                                        </Paper>
                                </div>
                        </div>
                </AppTheme>
        );


        function Fondo() {
                return (
                        <div className="background-container">
                                <div className="background" />
                                <img src="img/svg/back1.svg" className="background2" />
                        </div>
                );
        }

        function BannerIzquierda() {
                return <div className="banner-izquierda">
                        <h1 className="berlow"                        >
                                <Logo w={200} />
                                &nbsp;&nbsp;
                                SIPUC
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
                        return (
                                <Button variant="contained" color="secondary" href="/unlogged/crear-cuenta">
                                        Tengo un token de invitación
                                </Button>
                        )
                }
        }
};