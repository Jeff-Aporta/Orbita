module.exports = ({ query}) => {
    let { invitador } = query;
    if (!invitador) {
        return {
            error: "Faltan datos para la invitacion",
        };
    }
    let token = Math.random().toString(36).replace("0.", "");
    JSONBD_MODULE("!/WRITE")({
        ruta: `tokens/${token}.json`,
        valor: {
            invitador,
            fecha: Date.now(),
            tipo: "crear usuario",
        }
    });
    setTimeout(() => {
        JSONBD_MODULE("!/DELETE")({
            ruta: `tokens/${token}.json`,
        });
    }, 1000*60);
    return {
        ok: "Invitacion creada",
        token,
    }
}
