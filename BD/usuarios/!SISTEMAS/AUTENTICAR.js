const memoria = require("../../../app/memoria");

module.exports = ({ query }) => {
    let { login, contraseña } = query;
    if (!login || !contraseña) {
        return {
            error: "Faltan datos para la autenticacion",
        };
    }
    let LOGIN = JSONBD_GET(`usuarios/!/ALIAS/LOGIN/${login}.json`);

    if (!LOGIN) {
        return {
            error: "El nombre de usuario no existe",
        };
    }    

    let { PK } = LOGIN;

    let usuario = JSONBD_GET(`usuarios/${PK}/usuario.json`);

    let { contraseña: _contraseña_ } = usuario;

    if (_contraseña_ != contraseña) {
        return {
            error: "La contraseña es incorrecta",
        };
    }

    return usuario;
}