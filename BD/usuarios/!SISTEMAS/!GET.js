module.exports = ({ json, ruta, seguro = true, context }) => {
  if (!json) {
    return;
  }
  require(root + "/BD/!SISTEMAS/!GET")({
    json,
    ruta,
    context,
  });
  if (seguro) {
    delete json["contraseña"];
  }
  return json;
};
