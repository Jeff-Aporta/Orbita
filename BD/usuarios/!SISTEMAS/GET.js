module.exports = ({ json, ruta, seguro = true, context }) => {
  if (!json) {
    return;
  }
  JSONBD_GET({
    ruta,
  });
  if (seguro) {
    delete json["contraseña"];
  }
  return json;
};
