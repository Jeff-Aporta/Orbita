let elementosOcultosIniciales

async function init({ FadeIn = true } = {}) {
        ReactDOM.render(
                await App(),
                document.body
        );

        let _entrada = FadeIn ? ["animate__animated", "animate__fadeIn", "animate__faster"] : [];

        elementosOcultosIniciales = [".app", ".menu.izquierda", ".menu.superior"].map(element => {
                return document.querySelector(element);
        });

        if (document.querySelector(".menu.superior")) {
                estadoNotificacion();
        }

        elementosOcultosIniciales.forEach(element => {
                if (element) {
                        element.classList.remove("d-none");
                        element.classList.add(..._entrada);
                }
        });

        setTimeout(() => {
                elementosOcultosIniciales.forEach(element => {
                        if (element) {
                                element.classList.remove(..._entrada);
                        }
                });
        }, 500);
}

init();

window.addEventListener("beforeunload", function (e) {
        let _salida = ["animate__animated", "animate__fadeOut", "animate__faster"]
        elementosOcultosIniciales.forEach(element => {
                if (element) {
                        element.classList.add(..._salida);
                }
        });
});

{
    let metas = document.createElement("div");

    ReactDOM.render(
        <React.Fragment>
            <meta property="og:site_name" content="SIPUC" />
            <meta property="og:title" content="SIPUC" />
            <meta property="og:description" content="Social-IPUC" />

            <meta property="og:image" content={URL_LOGO(256)} />

            <link rel="icon" type="image/png" href={URL_LOGO(32)} />
        </React.Fragment>,
        metas
    );
    metas.querySelectorAll("*").forEach((meta) => {
        document.head.appendChild(meta);
    });
}