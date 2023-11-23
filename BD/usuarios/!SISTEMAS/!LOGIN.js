const memoria = require("../../../app/memoria");

module.exports = ({ query }) => {
  let { login } = query;
  if (!login) {
    return {
      error: "Faltan datos para la consulta",
    };
  }
  let { PK } = memoria.tools.Array2Nodo(
    `usuarios/!SISTEMAS/ALIAS/LOGIN/${login}.json`
  ).cabeza;

  if (!PK) {
    return {
      error: "El nombre usuario no existe",
    };
  }

  let ruta = `usuarios/${PK}/usuario.json`;

  let usuario = memoria.tools.Array2Nodo(ruta).cabeza;

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
