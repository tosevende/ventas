(function () {
    const colorButtons = document.querySelectorAll(".color-circle");

    // Si la página no tiene selección de colores, no hacemos nada.
    if (!colorButtons.length) return;

    const disponibilidad = window.disponibilidadColores || {};
    const selectedColorText = document.querySelector(".selected-color");
    const whatsappButton = document.getElementById("whatsapp-product");

    const whatsappNumber = "5355300075";

    let selectedColor = "";

    function actualizarWhatsApp() {
        if (!whatsappButton) return;

        const nombre = document.querySelector(".detail-info h1")?.textContent.trim() || "este producto";
        const precio = document.querySelector(".detail-price")?.textContent.trim() || "";
        const talla = document.querySelector(".size-selected")?.textContent.trim() || "Por confirmar";

        const mensaje =
            "Hola, estoy interesada en " + nombre + ". " +
            "Precio: " + precio + ". " +
            "Talla: " + talla + ". " +
            "Color: " + (selectedColor || "por confirmar") +
            ". ¿Está disponible?";

        whatsappButton.href =
            "https://wa.me/" + whatsappNumber +
            "?text=" + encodeURIComponent(mensaje);
    }

    colorButtons.forEach((button) => {
        const color = button.dataset.color;
        const disponible = disponibilidad[color] === true;

        if (!disponible) {
            button.classList.add("is-sold-out");
            button.setAttribute("aria-disabled", "true");
            button.setAttribute("aria-label", color + " - Agotado");
            button.title = color + " - Agotado";
        } else {
            button.setAttribute("aria-disabled", "false");
        }

        button.setAttribute("aria-pressed", "false");

        button.addEventListener("click", () => {

            // No permitir seleccionar colores agotados.
            if (!disponible) {
                if (selectedColorText) {
                    selectedColorText.textContent = color + " - Agotado";
                }
                return;
            }

            colorButtons.forEach((item) => {
                item.classList.remove("is-selected");
                item.setAttribute("aria-pressed", "false");
            });

            button.classList.add("is-selected");
            button.setAttribute("aria-pressed", "true");

            selectedColor = color;

            if (selectedColorText) {
                selectedColorText.textContent = "Color seleccionado: " + color;
            }

            actualizarWhatsApp();
        });
    });

    actualizarWhatsApp();
})();
