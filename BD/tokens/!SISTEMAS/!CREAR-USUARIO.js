module.exports = ({ query}) => {
    let { invitador } = query;
    if (!invitador) {
        return {
            error: "Faltan datos para la invitacion",
        };
    }
    let token = Math.random().toString().replace("0.", "");
    JSONBD_EXEC({
        DOC: {
            tokens: {
                [token + ".json"]: {
                    invitador,
                    fecha: Date.now(),
                    tipo: "crear usuario",
                },
            }
        }
    });
    setTimeout(() => {
        JSONBD_EXEC({
            DELETE: {
                tokens: {
                    [token + ".json"]: true,
                }
            }
        });
    }, 1000*30);

    return {
        ok: "Invitacion creada",
        token,
    }
}
