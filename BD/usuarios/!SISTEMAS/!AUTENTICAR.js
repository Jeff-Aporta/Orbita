module.exports = ({ query }) => {
    let { login, contraseña } = query;
    if (!login || !contraseña) {
        return {
            error: "Faltan datos para la autenticacion",
        };
    }
    let { PK } = memoria.tools.Array2Nodo(`usuarios/!SISTEMAS/ALIAS/LOGIN/${login}.json`).cabeza;

    if (!PK) {
        return {
            error: "El nombre de usuario no existe",
        };
    }

    let { contraseña: contraseñaUser } = memoria.tools.Array2Nodo(`usuarios/${PK}/user.json`).cabeza;

    if (contraseñaUser !== contraseña) {
        return {
            error: "La contraseña es incorrecta",
        };
    }

    return {
        ok: "Usuario autenticado",
    };
}