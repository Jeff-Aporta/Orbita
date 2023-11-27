const memoria = require("../../../app/memoria");

module.exports = ({ query }) => {
  let { login } = query;
  if (!login) {
    return {
      error: "Faltan datos para la consulta",
    };
  }
  let { PK } = JSONBD_GET(`usuarios/!SISTEMAS/ALIAS/LOGIN/${login}.json`);

  if (!PK) {
    return {
      error: "El nombre usuario no existe",
    };
  }

  let ruta = `usuarios/${PK}/usuario.json`;

  let usuario = JSONBD_GET(ruta);

  if (!usuario) {
    return {
      error: "El usuario no existe",
    };
  }

  return require("./!GET")({
    json: usuario,
    ruta,
  });
};
