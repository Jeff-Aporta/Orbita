function MenuSuperior() {
        return (
                <AppRender className="menu superior">
                        <Paper
                                style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        width: "100%",
                                        padding: "10px",
                                }}
                        >
                                <div>
                                        <Button variant="contained" color="secondary" startIcon={<i className="fa-solid fa-users" />} >
                                                Amigos
                                        </Button>
                                        &nbsp;
                                        &nbsp;
                                        {
                                                user["login"]
                                        }
                                </div>

                                <div>
                                        <IconButtonContador contador={1} title="Mensajes">
                                                <i className="fa-solid fa-message" />
                                        </IconButtonContador>
                                        <IconButtonContador contador={1} title="Notificaciones">
                                                <i className="fa-solid fa-bell" />
                                        </IconButtonContador>
                                </div>

                                <FormControl component="fieldset">
                                        <FormGroup style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                        }}>
                                                <TextField label="Buscar usuario" variant="outlined" />
                                                <Button variant="contained" color="secondary">
                                                        <i className="fa-solid fa-search" />
                                                </Button>
                                        </FormGroup>
                                </FormControl>
                        </Paper>
                </AppRender>
        );
}