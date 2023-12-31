if (!localStorage.getItem("theme") || !user) {
  localStorage.setItem("theme", "dark");
}

function JS2CSS(estilo) {
  const estiloConvertido = {};

  for (const [key, value] of Object.entries(estilo)) {
    const kebabCaseKey = key.replace(
      /[A-Z]/g,
      (match) => `-${match.toLowerCase()}`
    );
    estiloConvertido[kebabCaseKey] =
      typeof value === "object"
        ? JS2CSS(value)
        : typeof value === "number" && kebabCaseKey != "z-index"
        ? `${value}px`
        : value;
  }

  return estiloConvertido;
}

function crearEstilo(estilo) {
  const estiloConvertido = JS2CSS(estilo);

  let estiloCSS = JSON.stringify(estiloConvertido, null, "\t");
  estiloCSS = estiloCSS.replaceAll("},", "}");
  estiloCSS = estiloCSS.replace(/,\n/g, ";\n");
  estiloCSS = estiloCSS.replaceAll(":{", "{");
  estiloCSS = estiloCSS.replaceAll(": {", "{");
  estiloCSS = estiloCSS.replaceAll(":", ":");
  estiloCSS = estiloCSS.replaceAll('"', "");

  estiloCSS = estiloCSS.substring(1, estiloCSS.length - 1);

  let style = document.createElement("style");
  style.innerHTML = estiloCSS;
  document.head.appendChild(style);

  console.log(style);

  return estiloCSS;
}

const addScript = ({
  src,
  type = "text/javascript",
  defer = false,
  onload,
}) => {
  console.log("addScript", src);
  var script = document.createElement("script");
  script.setAttribute("src", src);
  script.setAttribute("type", type);
  script.setAttribute("defer", defer);
  script.onload = onload;
  document.head.appendChild(script);
};

const addLink = (href, rel = "stylesheet") => {
  console.log("addLink", href);
  var link = document.createElement("link");
  link.setAttribute("href", href);
  link.setAttribute("rel", rel);
  document.head.appendChild(link);
};

addScript({ src: "/JS/ventana-flotante/index.js" });

Iconos_fa_bs();
SweetAlert2();

function SweetAlert2() {
  setTimeout(() => {
    addScript({
      src: "https://cdn.jsdelivr.net/npm/sweetalert2@11.7.27/dist/sweetalert2.all.min.js",
    });
    if (localStorage.getItem("theme") == "dark") {
      addLink("https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark/dark.css");
    } else {
      addLink(
        "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-material-ui/material-ui.css"
      );
    }
  }, 100);
}

function Iconos_fa_bs() {
  addLink(
    "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
  );
  addLink(
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
  );
}

async function JSONBD({
  ruta = "/",
  query = "",
  async = false,
  some,
  every,
  find,
  filter,
  map,
  COL,
  NCOL,
}) {
  if (!ruta && !query) {
    return {
      error: "No se especificó ruta ni query",
    };
  }

  async function fetchAsync() {
    let $user = user ? `&user=${JSON.stringify({ PK: user["PK"] })}` : "";
    let $filter = filter ? `&filter=${JSON.stringify(filter + "")}` : "";
    let $map = map ? `&map=${JSON.stringify(map + "")}` : "";
    let $some = some ? `&some=${JSON.stringify(some + "")}` : "";
    let $every = every ? `&every=${JSON.stringify(every + "")}` : "";
    let $find = find ? `&find=${JSON.stringify(find + "")}` : "";
    let $COL = COL
      ? `&COL=${JSON.stringify(COL)}`
      : "";
    let $NCOL = NCOL
      ? `&NCOL=${JSON.stringify(NCOL)}`
      : "";

    let URLQUERY = `/BD?json-query=${ruta}${JSON.stringify(query)}${
      $user + $filter + $some + $every + $find + $COL + $NCOL + $map
    }`;
    let respuesta = await (await fetch(URLQUERY)).json();
    console.log("URLQUERY", URLQUERY, respuesta, "async", async);
    return respuesta;
  }

  if (async) {
    return await fetchAsync();
  }

  return new Promise(async (resolve) => {
    resolve(await fetchAsync());
  });
}
