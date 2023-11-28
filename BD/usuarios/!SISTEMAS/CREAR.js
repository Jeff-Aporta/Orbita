module.exports = ({ query }) => {
  if (!["login", "contraseña"].every((clave) => query[clave])) {
    return {
      error: "Faltan datos para crear el usuario",
    };
  }

  let PK = JSONBD_GET("usuarios/!/PK.json")["contador"]++;

  if (JSONBD_EXISTE({ ruta: `usuarios/!/ALIAS/LOGIN/${query.login}.json` })) {
    return {
      error: "El nombre de usuario ya esta en uso",
    };
  }

  JSONBD_WRITE({
    ruta: `usuarios/${PK}/usuario.json`,
    valor: {
      ...query,
      PK,
    },
  });

  JSONBD_WRITE({
    ruta: `usuarios/!/PK.json`,
    valor: {
      contador: PK + 1,
    },
  });

  JSONBD_WRITE({
    ruta: `usuarios/!/ALIAS/LOGIN/${query.login}.json`,
    valor: {
      PK,
    },
  });

  return {
    ok: "Usuario creado",
  };
};
