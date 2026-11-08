(function () {
    function iniciarVariantes() {
        const colorButtons = document.querySelectorAll(".color-circle");

        if (!colorButtons.length) return;

        const disponibilidad = window.disponibilidadColores || {};
        const selectedColorText = document.querySelector(".selected-color");
        const whatsappButton = document.getElementById("whatsapp-product");

        const whatsappNumber = "5355300075";

        let selectedColor = "";

        function actualizarWhatsApp() {
            if (!whatsappButton) return;

            const nombre =
                document.querySelector(".detail-info h1")?.textContent.trim() ||
                "este producto";

            const precio =
                document.querySelector(".detail-price")?.textContent.trim() || "";

            const talla =
                document.querySelector(".size-selected")?.textContent.trim() ||
                "Por confirmar";

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

            button.classList.toggle("is-sold-out", !disponible);
            button.setAttribute("aria-disabled", String(!disponible));
            button.setAttribute("aria-pressed", "false");

            if (!disponible) {
                button.title = color + " - Agotado";
                button.setAttribute("aria-label", color + " - Agotado");
            } else {
                button.title = color;
                button.setAttribute("aria-label", color);
            }

            button.addEventListener("click", () => {
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
                    selectedColorText.textContent =
                        "Color seleccionado: " + color;
                }

                actualizarWhatsApp();
            });
        });

        actualizarWhatsApp();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciarVariantes);
    } else {
        iniciarVariantes();
    }
})();
