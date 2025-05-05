import { iterarArray, validarForm } from "./funciones-tareas.js";
import { datosNotas, editando, form } from "./varibles.js";

// eventos
form.addEventListener("submit", (e)=> validarForm(e) )

// itero notas guardadas
document.addEventListener("DOMContentLoaded", ()=>{
    let arrayLocal = JSON.parse(localStorage.getItem("notas"));
    if (arrayLocal) {
        iterarArray(arrayLocal)
    }
})