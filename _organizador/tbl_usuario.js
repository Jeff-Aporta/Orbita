let memoria = require(root + "/app/memoria");

async function main() {
  let usuarios = [
    {
      PK: 1,
      NOMBRE: "Jeff",
      APELLIDO: "Agudelo",
      LOGIN: "jeff",
      PASSWORD: "123",
    },
    {
      PK: 2,
      NOMBRE: "Jhon",
      APELLIDO: "Agudelo",
      LOGIN: "jhon",
      PASSWORD: "123",
    },
    {
      PK: 3,
      NOMBRE: "Juan",
      APELLIDO: "Agudelo",
      LOGIN: "juan",
      PASSWORD: "123",
    },
  ];
  for (let i = 0; i < usuarios.length; i++) {
    const usuario = usuarios[i];
    await JSONBD_EXEC({
      DOC: {
        usuarios: {
          [usuario["PK"]]: {
            "user.json": usuario,
          },
        },
      },
    });

    await JSONBD_EXEC({
      DOC: {
        usuarios: {
          SISTEMAS: {
            ALIAS: {
              LOGIN: {
                [`${usuario["LOGIN"]}.json`]: {
                  PK: usuario["PK"],
                },
              },
            },
          },
        },
      },
    });

    setTimeout(() => {
      process.exit();
    }, 1000);
  }
}

main();
