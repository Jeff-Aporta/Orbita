module.exports = ({ json, ruta, seguro = true, context }) => {
  if (!json) {
    return;
  }
  JSONBD_MODULE("!SISTEMAS/!GET")({
    json,
    ruta,
    context,
  });
  json["expiracion"] = Date.now() > json["fecha"] + 30 * 60 * 1000;
  if (seguro) {
    delete json["contraseña"];
  }
  return json;
};
