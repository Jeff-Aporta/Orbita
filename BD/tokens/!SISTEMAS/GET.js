module.exports = ({ token }) => {
  let ruta = `tokens/${token}.json`;
  let json = JSONBD_MODULE("!/GET")({
    ruta,
  });
  let CONFIG = JSONBD_MODULE("tokens/!/CONFIG");
  let COTA_SUPERIOR = json["fecha"] + CONFIG["tiempo-expiracion"];
  json["expiracion"] = Date.now() > COTA_SUPERIOR;
  JSONBD_MODULE("!/DELETE")({
    ruta,
  });
  return json;
};
