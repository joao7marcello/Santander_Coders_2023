function trocarAriaLabel() {
  const sendButton = document.getElementById("btnEnviar");

  sendButton.addEventListener("click", () => {
    const buttonAriaLabel = sendButton.getAttribute("aria-label");
    const newAriaLabel =
      buttonAriaLabel === "Botao para envio do formulario"
        ? "Botao para reenvio de formulario"
        : buttonAriaLabel;
    sendButton.setAttribute("aria-label", newAriaLabel);
  });
}

document.addEventListener("DOMContentLoaded", trocarAriaLabel);
