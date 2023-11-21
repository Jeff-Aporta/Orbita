module.exports = ({ json, ruta, seguro = true, context }) => {
  require(root + "/BD/!SISTEMAS/!GET")({
    json,
    ruta,
    context,
  });
  if (seguro) {
    delete json["CONTRASENA"];
  }
  return json;
};
