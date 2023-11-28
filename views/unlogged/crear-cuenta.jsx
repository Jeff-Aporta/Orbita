let token = search.get('token');

async function App() {
    if (!token) {
        return <UsarToken />;
    }
    let tokenInfo = JSONBD({
        ruta: `tokens/${token}.json`,
    })
    if (tokenInfo["tipo"] != "crear usuario") {
        return <AppErrorToken
            titulo="Token inválido"
            mensaje="El token no es válido para crear una cuenta."
        />
    }
    if (tokenInfo["expiracion"]) {
        return <AppErrorToken
            titulo="Token expirado"
            mensaje="El token ha expirado."
        />
    }
    return (
        <AppSimpleCentred>
            <h1>
                <Logo w={100} />
                Crear cuenta
            </h1>
            <div className="d-flex-jc-space-between-ai-center">
                <Button variant="contained" color="error" href="/">
                    Rechazar token
                </Button>
                <Button variant="contained" color="primary">
                    Crear
                </Button>
            </div>
        </AppSimpleCentred>
    )

    function AppErrorToken({ titulo, mensaje }) {
        return <AppSimpleCentred>
            <h1>
                <Logo w={100} />
                {titulo}
            </h1>
            {mensaje}
            <hr />
            <div className="d-flex-jc-space-between-ai-center">
                <Button variant="contained" color="error" href="/">
                    Cerrar
                </Button>
            </div>
        </AppSimpleCentred>;
    }

    function UsarToken() {
        return <AppSimpleCentred>
            <h1 style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <Logo w={100} />
                <span>
                    Token
                    <br />
                    de invitación
                </span>
            </h1>
            <br />
            <TextField
                label="Código"
                className="token-de-invitacion"
                variant="outlined"
                fullWidth />
            <br />
            <br />
            <div className="d-flex-jc-space-between-ai-center">
                <Button variant="contained" color="error" href="/">
                    Cancelar
                </Button>

                <Button variant="contained" color="primary" onClick={() => {
                    let token = document.querySelector(".token-de-invitacion input").value;
                    window.location.href = `/unlogged/crear-cuenta?token=${token}`;
                }}
                    size="large"
                    endIcon={<i className="fa-solid fa-arrow-right" />}
                >
                    Usar
                </Button>
            </div>
            &nbsp;
            <br />
            <hr />
            <br />
            <BotonCrearToken />
        </AppSimpleCentred>;
    }

    function BotonCrearToken() {
        return <Button variant="contained" color="primary" onClick={async () => {
            let json = await JSONBD({
                ruta: `tokens/`,
                query: {
                    "CREAR-USUARIO": {
                        invitador: -1,
                    }
                }
            });
            console.log(json);
            if (json["ok"]) {
                swal.fire({
                    title: "Token creado",
                    html: `
                                <div class="swal-react"></div>
                            `,
                    willOpen: () => {
                        let copiar = () => {
                            navigator.clipboard.writeText(document.querySelector(".swal-react input").value);
                        };
                        ReactDOM.render(
                            <AppTheme>
                                <b>Token:</b> {json["token"]}
                                <p>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">
                                            URL de registro
                                        </FormLabel>
                                        <FormGroup style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                        }}>
                                            <Tooltip title="Clic sobre el texto para copiar" arrow placement="bottom">
                                                <TextField value={`${window.location.origin}/unlogged/crear-cuenta?token=${json["token"]}`} readOnly onClick={copiar} />
                                            </Tooltip>
                                            <Tooltip title="Copiar" arrow placement="bottom">
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={copiar}>
                                                    <i className="fa-solid fa-copy" />
                                                </Button>
                                            </Tooltip>
                                        </FormGroup>
                                        <FormHelperText></FormHelperText>
                                    </FormControl>
                                </p>
                            </AppTheme>,
                            document.querySelector(".swal-react")
                        );
                    },
                    icon: "success",
                });
            }
        }}>

            Crear token
        </Button>;
    }
}
