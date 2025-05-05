import { datosNotas, editando, form, inputInfo, inputTitulo, listNotes, notesLocal } from "./varibles.js";

export const validarForm = (e) => {
    e.preventDefault()

    if (inputTitulo.value.trim() === "" | inputInfo.value.trim() === "") {
        mostrarAlerta("Campos Incompletos", "error");
        return
    }

    if (editando.value) {
        datosNotas.info = inputInfo.value;
        datosNotas.titulo = inputTitulo.value;
        datosNotas.fecha = fechaFormateada();
        editarCita(datosNotas); // funcion editar una cita creada
    } else {
        datosNotas.id = generarID();
        datosNotas.info = inputInfo.value;
        datosNotas.titulo = inputTitulo.value;
        datosNotas.fecha = fechaFormateada();
        iterarArray([datosNotas]); // funcion para mostrar las notas nuevas o almacenadas en local
        notesLocal.push({ ...datosNotas });
        gaurdarEnLocal();
    }
    resetForm();
}

const mostrarAlerta = (mensaje, tipo) => {
    const alertaPrevia = document.querySelector(".alerta");
    alertaPrevia?.remove();

    const container = document.createElement("div");
    container.classList.add("alerta", "w-full", "p-2", "border", "text-center", "rounded-md", "mt-3")

    const p = document.createElement("p");
    p.textContent = mensaje;

    if (tipo === "error") {
        container.classList.add("text-red-800", "font-semibold");
    } else {
        container.classList.add("text-white", "font-semibold");
    }

    container.appendChild(p);
    form.appendChild(container);

    setTimeout(() => {
        container.remove();
    }, 3500);
}

const resetForm = () => {
    inputTitulo.value = "";
    inputInfo.value = "";
}

const gaurdarEnLocal = () => {
    let arrayLocal = JSON.parse(localStorage.getItem("notas"));
    arrayLocal = notesLocal;    
    localStorage.setItem("notas", JSON.stringify(arrayLocal));
}

export const iterarArray = (array) => {

    array.forEach(note => {
        const {fecha, titulo, info, id } = note;

        // creo html
        const container = document.createElement("div");
        container.classList.add("card", "bg-note");

        const f = document.createElement("p");
        f.classList.add("fecha");
        f.textContent = fecha;
        
        const t = document.createElement("h4");
        t.classList.add("titulo");
        t.textContent = titulo;

        const i = document.createElement("p");
        i.classList.add("info");
        i.textContent = info

        const containerBotones = document.createElement("div");
        containerBotones.classList.add("conteinerBtn");

        const btnEditar = document.createElement("button");
        btnEditar.classList.add("btn", "editar");
        btnEditar.textContent = "Editar";
        btnEditar.onclick = () => {
            inputInfo.value = info;
            inputTitulo.value = titulo;

            datosNotas.id = id;
            editando.value = true;
        }

        const btnBorrar = document.createElement("button");
        btnBorrar.classList.add("btn", "borrar");
        btnBorrar.textContent = "Borrar";
        btnBorrar.onclick = () => {
            let question = window.confirm("¿Seguro que quieres eliminar esta Nota?")
            if (question) {
                btnBorrar.parentElement.parentElement.remove();
                eliminarNote(id)
            }
            return
        }

        containerBotones.appendChild(btnEditar);
        containerBotones.appendChild(btnBorrar);

        container.appendChild(f);
        container.appendChild(t);
        container.appendChild(i);
        container.appendChild(containerBotones);

        listNotes.appendChild(container)
    })
}

const generarID = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

const eliminarNote = (id) => {
    let arrayLocal = JSON.parse(localStorage.getItem("notas"));
    let filtradoc = arrayLocal.filter(note => note.id !== id);
    localStorage.setItem("notas", JSON.stringify(filtradoc));

    notesLocal.length = 0;
    notesLocal.push(...filtradoc)
}

const editarCita = (datosNotas) => {
    notesLocal.forEach(e => {
        if (e.id === datosNotas.id) {
            e.info = datosNotas.info;
            e.titulo = datosNotas.titulo;
            e.fecha = fechaFormateada();
        }
    }); // itero el array con las notas y modifico la que quiero

    limpiarList(); // limpio todas las notes
    iterarArray(notesLocal); // itero todas las notes ya con los cambios
    gaurdarEnLocal(); // guardo los cambios al local

    editando.value = false;
}

const limpiarList = () => {
    while (listNotes.firstElementChild) {
        listNotes.firstElementChild.remove()
    }
}

const fechaFormateada = () => {
    const fechaa = new Date();

    const dia = String(fechaa.getDate()).padStart(2, '0');
    const mes = String(fechaa.getMonth() + 1).padStart(2, '0'); 
    const año = fechaa.getFullYear();
    
    return `${dia}-${mes}-${año}`;
};