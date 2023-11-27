const memoria = require("./app/memoria");
const _fs = require("./app/memoria/_fs");

global.JSONBD_ROOT = memoria.config.RAIZ;

global.JSONBD_PATH = (carpeta) => `${JSONBD_ROOT}/${carpeta}`;

global.JSONBD_LIST = (carpeta) => _fs.carpeta.listar(`${JSONBD_PATH(carpeta)}`);

global.JSONBD_MODULE = (carpeta) => require(root + `/${JSONBD_PATH(carpeta)}`);

global.JSONBD_EXEC = memoria.EXEC;

global.JSONBD_GET = (rutaJSONBD, extra) => {
  return memoria.tools.Array2Nodo(rutaJSONBD, extra).cabeza;
};

module.exports = (pack_app) => {
  pack_app.app.get("/BD", async (req, res) => {
    let URL = req.protocol + "://" + req.get("host") + req.originalUrl;
    if (!URL.includes("?")) {
      return res
        .json({
          error: "No se ha especificado una consulta",
        })
        .end();
    }

    let URLParams = new URLSearchParams(URL.substring(URL.indexOf("?")));

    let json_query = URLParams.get("json-query");

    let user = JSON.parse(URLParams.get("user"));

    let Tparam = (e) =>
      e
        .map((clave) => {
          let valor = JSON.parse(URLParams.get(clave));
          if (valor) {
            let tryCartchEvaluador = (obj, index, array) => {
              try {
                return new Function(`return ${valor}`)()(obj, index, array);
              } catch (error) {}
            };
            return { [clave]: tryCartchEvaluador };
          }
        })
        .filter(Boolean)
        .reduce((a, b) => ({ ...a, ...b }), {});

    let arrayTransform = Tparam(["map", "filter", "find", "some", "every"]);

    let find = arrayTransform["find"];
    let some = arrayTransform["some"];

    let objTransform = ["COL", "NCOL"]
      .map((clave) => {
        let valor = URLParams.get(clave);
        if (valor) {
          valor = JSON.parse(valor);
          if (Array.isArray(valor)) {
            return { [clave]: valor };
          }
        }
        return { [clave]: [] };
      })
      .reduce((a, b) => ({ ...a, ...b }), {});

    if (json_query) {
      return QUERY2JSON();
    }

    function QUERY2JSON() {
      let partesQuery;
      let cabeza;

      if (!json_query.includes("/{") && !json_query.startsWith("{")) {
        partesQuery = json_query.split("/");
        cabeza = partesQuery.at(-1);
      } else {
        partesQuery = json_query
          .substring(0, json_query.indexOf("/{"))
          .split("/");
        cabeza = json_query.substring(json_query.indexOf("/{"));
      }

      if (cabeza.startsWith("/{") || cabeza.startsWith("{")) {
        let query;
        if (cabeza.startsWith("{")) {
          query = JSON.parse(cabeza);
        } else {
          query = JSON.parse(cabeza.substring(1));
        }

        let instruccion = Object.keys(query)[0];

        if (instruccion == "DOC" || instruccion == "DELETE") {
          return res.json(JSONBD_EXEC(query)).end();
        }

        let MACRO;

        let carpetaMacro = [...partesQuery];

        do {
          let rutaSinCabeza = JSONBD_PATH(carpetaMacro.join("/"));

          MACRO = `${rutaSinCabeza}${
            rutaSinCabeza.endsWith("/") ? "" : "/"
          }!SISTEMAS/!${instruccion + ".js"}`;
        } while (!_fs.existe(MACRO) && carpetaMacro.pop());

        MACRO = MACRO.replaceAll("//", "/");

        if (_fs.existe(MACRO)) {
          let retorno = require("./" + MACRO)({
            URL,
            instruccion,
            query: query[instruccion],
            user,
            cabeza,
            find, //puede reducir complejidad en algunos casos
            some, //puede reducir complejidad en algunos casos
            carpeta: partesQuery.join("/"),
            context: {
              pack_app,
            },
          });

          let TOBJ = (e) =>
            typeof e == "object"
              ? Object.keys(e).forEach((clave) => {
                  if (
                    objTransform.COL.length &&
                    !objTransform.COL.includes(clave)
                  ) {
                    delete e[clave];
                  }
                  objTransform.NCOL.forEach((clave) => {
                    delete e[clave];
                  });
                })
              : e;

          if (Array.isArray(retorno)) {
            Object.entries(arrayTransform).forEach(([clave, valor]) => {
              retorno = retorno[clave](valor);
            });
          }
          if (typeof retorno == "object") {
            TOBJ(retorno);
          }
          if (Array.isArray(retorno)) {
            retorno.forEach(TOBJ);
          }

          return res.json(retorno).end();
        } else {
          return res
            .json({
              error: "No se ha encontrado la instruccion",
            })
            .end();
        }
      }
      return res.json(JSONBD_GET(partesQuery, { context: { pack_app } })).end();
    }

    res.json(JSONBD_GET(partesQuery, { context: { pack_app } })).end();
  });
};
