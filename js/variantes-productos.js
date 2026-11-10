(function () {
    const colorButtons = document.querySelectorAll(".color-circle");

    if (!colorButtons.length) return;

    const disponibilidad = window.disponibilidadColores || {};
    const selectedColorText = document.querySelector(".selected-color");
    const addButton = document.getElementById("add-product-to-cart");

    let selectedColor = "";

    // Configurar colores disponibles y agotados
    colorButtons.forEach(button => {
        const color = button.dataset.color;
        const disponible = disponibilidad[color] === true;

        button.setAttribute("aria-pressed", "false");

        if (!disponible) {
            button.classList.add("is-sold-out");
            button.setAttribute("aria-disabled", "true");
            button.setAttribute("aria-label", color + " - Agotado");
            button.title = color + " - Agotado";
        } else {
            button.classList.remove("is-sold-out");
            button.setAttribute("aria-disabled", "false");
        }

        // Seleccionar color
        button.addEventListener("click", () => {

            // Si el color está agotado
            if (!disponible) {
                selectedColor = "";

                colorButtons.forEach(item => {
                    item.classList.remove("is-selected");
                    item.setAttribute("aria-pressed", "false");
                });

                if (selectedColorText) {
                    selectedColorText.textContent = color + " - Agotado";
                }

                if (addButton) {
                    addButton.disabled = true;
                }

                return;
            }

            // Si el color está disponible
            colorButtons.forEach(item => {
                item.classList.remove("is-selected");
                item.setAttribute("aria-pressed", "false");
            });

            button.classList.add("is-selected");
            button.setAttribute("aria-pressed", "true");

            selectedColor = color;

            if (selectedColorText) {
                selectedColorText.textContent =
                    "Color seleccionado: " + color;
            }

            if (addButton) {
                addButton.disabled = false;
            }
        });

    }); // Cierre correcto del recorrido de colores

    // Conectar el botón de añadir al carrito
    if (addButton) {
        addButton.addEventListener("click", () => {

            if (!selectedColor) {
                window.mostrarAviso("Selecciona un color disponible.");
                return;
            }

            if (typeof window.agregarAlCarrito !== "function") {
                window.mostrarAviso("No se pudo conectar con el carrito.");
                return;
            }

            const nombre = document.querySelector(
                ".detail-info h1"
            ).textContent.trim();

            const precioTexto = document.querySelector(
                ".detail-price"
            ).textContent;

            const precio = Number(
                precioTexto.replace(",", ".").match(/\d+(\.\d+)?/)?.[0]
            );

            const talla = document.querySelector(
                ".size-selected"
            )?.textContent.trim() || "";

            const productoId = addButton.dataset.productId || "producto";

            // Obtener la imagen principal del producto
            const imagenElemento = document.querySelector(".detail-main-image");
            
            const imagen = imagenElemento
                ? new URL(imagenElemento.getAttribute("src"), window.location.href).href
                : "";
            
            if (!nombre || !talla || !Number.isFinite(precio)) {
                window.mostrarAviso("No se pudo añadir este producto.");
                return;
            }
            
            const id = [
                productoId,
                selectedColor,
                talla
            ].join("-").toLowerCase();
            
            window.agregarAlCarrito({
                id: id,
                nombre: nombre,
                precio: precio,
                color: selectedColor,
                talla: talla,
                imagen: imagen
            });
        });
    }

})();
