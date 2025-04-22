// Variables para tareas.html
export let notesLocal = JSON.parse(localStorage.getItem("notas")) || [];

export const btnSubmit = document.getElementById("submit");

export const form = document.querySelector("form");

export const inputTitulo = document.getElementById("titulo");
export const inputInfo = document.getElementById("info");

export let datosNotas = {
    info: "",
    fecha: "",
    titulo: "",
    id: ""
}

export const listNotes = document.querySelector(".list");

export const editando = {
    value : false
}

// Variables para index.html