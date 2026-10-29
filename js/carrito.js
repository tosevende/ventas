const CART_KEY = "tosevende_carrito";

function obtenerCarrito() {
    try {
        const datos = JSON.parse(localStorage.getItem(CART_KEY));
        return Array.isArray(datos) ? datos : [];
    } catch {
        return [];
    }
}

function guardarCarrito(carrito) {
    localStorage.setItem(CART_KEY, JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    const cantidad = obtenerCarrito().reduce(
        (total, producto) => total + producto.cantidad,
        0
    );

    document.querySelectorAll("[data-cart-count]").forEach(elemento => {
        elemento.textContent = cantidad;
        elemento.hidden = cantidad === 0;
    });
}

function mostrarAviso(mensaje) {
    let aviso = document.getElementById("cart-notice");

    if (!aviso) {
        aviso = document.createElement("div");
        aviso.id = "cart-notice";
        aviso.className = "cart-notice";
        aviso.setAttribute("role", "status");
        document.body.appendChild(aviso);
    }

    aviso.textContent = mensaje;
    aviso.classList.add("is-visible");

    clearTimeout(aviso._timer);

    aviso._timer = setTimeout(() => {
        aviso.classList.remove("is-visible");
    }, 2500);
}

function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();
    const existente = carrito.find(item => item.id === producto.id);

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    mostrarAviso("¡Producto añadido al carrito!");
}

// Conectar todos los botones de añadir al carrito
document.querySelectorAll("[data-add-to-cart]").forEach(boton => {
    boton.addEventListener("click", () => {
        const producto = {
            id: boton.dataset.id,
            nombre: boton.dataset.name,
            precio: Number(boton.dataset.price)
        };

        if (
            !producto.id ||
            !producto.nombre ||
            !Number.isFinite(producto.precio) ||
            producto.precio < 0
        ) {
            mostrarAviso("No se pudo añadir este producto.");
            return;
        }

        agregarAlCarrito(producto);
    });
});

// Dejar estas funciones disponibles para carrito.html
window.obtenerCarrito = obtenerCarrito;
window.guardarCarrito = guardarCarrito;
window.actualizarContadorCarrito = actualizarContadorCarrito;
window.mostrarAviso = mostrarAviso;

actualizarContadorCarrito();
