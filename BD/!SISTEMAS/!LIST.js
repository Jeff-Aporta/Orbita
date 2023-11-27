const _fs = require("../../app/memoria/_fs");

module.exports = ({ carpeta }) => {
    if (carpeta == undefined) {
        return {
            error: "No se ha especificado una ruta",
        };
    }
    if (_fs.esCarpeta(carpeta)) {
        return JSONBD_LIST(carpeta).map((archivo) => archivo.name).filter((archivo) => !archivo.startsWith("!"));
    }
    return {
        error: "Solo se puede listar una carpeta",
    }
}