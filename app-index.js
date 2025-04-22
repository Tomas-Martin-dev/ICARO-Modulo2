let operacion = "";

const pantalla = document.querySelector(".pantalla p");
const botones = document.querySelectorAll(".boton");
const botonResultado = document.querySelector(".row:last-child button");

botones.forEach((boton) => {
    boton.addEventListener("click", () => {
        const valor = boton.textContent;

        if (valor === "AC") {
            operacion = "";
            pantalla.textContent = "Escriba una operacion...";
            return;
        }

        if (valor === ",") {
            operacion += ".";
        } else if (valor === "x") {
            operacion += "*";
        } else {
            operacion += valor;
        }

        pantalla.textContent = operacion;
    });
});

botonResultado.addEventListener("click", () => {
    try {
        const resultado = eval(operacion);
        pantalla.textContent = resultado;
        operacion = resultado.toString();
    } catch (e) {
        pantalla.textContent = "Error";
        operacion = "";
    }
});