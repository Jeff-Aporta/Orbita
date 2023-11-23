/*
    http://localhost:3000/BD?json-query=usuarios/{
        CREAR: {
            login: "alexmacias",
            contraseña: "registel",
            nombre: "alex",
            apellido: "macias",
            "fecha-nacimiento": "1990-01-01"
        }
    }
*/

const memoria = require("../../../app/memoria");
const _fs = require("../../../app/memoria/_fs");

module.exports = ({ query }) => {

  if (!["login", "contraseña"].every((clave) => query[clave])) {
    return {
      error: "Faltan datos para crear el usuario",
    };
  }

  let PK = memoria.tools.Array2Nodo("usuarios/!SISTEMAS/PK.json").cabeza
    .contador;

  if (
    _fs.existe(
      root + "/BD/usuarios/SISTEMAS/ALIAS/LOGIN/" + query.login + ".json"
    )
  ) {
    return {
      error: "El nombre de usuario ya esta en uso",
    };
  }

  memoria.escribir({
    usuarios: {
      [PK]: {
        "usuario.json": {
          PK,
          ...query,
        },
      },
    },
  });

  memoria.escribir({
    usuarios: {
      "!SISTEMAS": {
        ALIAS: {
          LOGIN: {
            [query.login + ".json"]: {
              PK,
            },
          },
        },
      },
    },
  });

  memoria.escribir({
    usuarios: {
      "!SISTEMAS": {
        "PK.json": {
          contador: PK + 1,
        },
      },
    },
  });

  return {
    ok: "Usuario creado",
  };
};
