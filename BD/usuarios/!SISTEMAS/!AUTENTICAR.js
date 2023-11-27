const memoria = require("../../../app/memoria");

module.exports = ({ query }) => {
    let { login, contraseña } = query;
    if (!login || !contraseña) {
        return {
            error: "Faltan datos para la autenticacion",
        };
    }
    let { PK } = JSONBD_GET(`usuarios/!SISTEMAS/ALIAS/LOGIN/${login}.json`);

    if (!PK) {
        return {
            error: "El nombre de usuario no existe",
        };
    }

    let usuario = JSONBD_GET(`usuarios/${PK}/usuario.json`);

    let { contraseña: contraseñaUser } = usuario;

    if (contraseñaUser !== contraseña) {
        return {
            error: "La contraseña es incorrecta",
        };
    }

    return usuario;
}