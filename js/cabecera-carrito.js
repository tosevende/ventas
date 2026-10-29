(function () {
    const rutaScript = document.currentScript
        ? document.currentScript.getAttribute("src")
        : "";

    const rutaCarrito = rutaScript.startsWith("../")
        ? "../carrito.html"
        : "carrito.html";

    function insertarIconoCarrito() {
        const cabecera = document.querySelector(
            ".detail-header-inner, .gym-header-inner, header .container"
        );

        if (!cabecera || cabecera.querySelector(".cart-icon-link")) {
            return;
        }

        const enlace = document.createElement("a");
        enlace.className = "cart-icon-link";
        enlace.href = rutaCarrito;
        enlace.setAttribute("aria-label", "Ver carrito de compras");
        enlace.setAttribute("title", "Ver carrito");

        enlace.innerHTML = `
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span data-cart-count hidden>0</span>
        `;

        const menu = cabecera.querySelector("nav");

        if (menu) {
            menu.appendChild(enlace);
        } else {
            cabecera.appendChild(enlace);
        }
    }

    function iniciar() {
        insertarIconoCarrito();

        if (typeof window.actualizarContadorCarrito === "function") {
            window.actualizarContadorCarrito();
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciar);
    } else {
        iniciar();
    }
})();
