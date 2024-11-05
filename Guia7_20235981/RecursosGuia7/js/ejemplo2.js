// Obteniendo la referencia de los elementos
// por medio de arreglos asociativos
// aqui se esta utilizando el atributo name de cada elemento
const formulario = document.forms["frmRegistro"];
const button = formulario.elements["btnRegistro"];

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// OBTENIENDO LA REFERENCIA DEL CUERPO DE MODAL
// PARA IMPRIMIR EL RESULTADO
const bodyModal = document.getElementById("idBodyModal");

function validarFormulario() {
    let isValid = true;
    const mensajes = [];

    // a. Validar campos vacíos
    const camposTexto = ["idNombre", "idApellidos", "idFechaNac", "idCorreo", "idPassword", "idPasswordRepetir"];
    camposTexto.forEach(id => {
        const campo = document.getElementById(id);
        if (campo.value.trim() === "") {
            mensajes.push(`El campo ${campo.labels[0].textContent} no puede estar vacío.`);
            isValid = false;
        }
    });

    // b. Validar que la fecha de nacimiento no supere la fecha actual
    const fechaNac = document.getElementById("idFechaNac");
    if (new Date(fechaNac.value) > new Date()) {
        mensajes.push("La fecha de nacimiento no puede ser mayor a la fecha actual.");
        isValid = false;
    }

    // c. Validar el correo electrónico 
    const email = document.getElementById("idCorreo");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        mensajes.push("El correo electrónico no es válido.");
        isValid = false;
    }

    // d. Validar que las contraseñas sean iguales
    const password = document.getElementById("idPassword");
    const passwordRepetir = document.getElementById("idPasswordRepetir");
    if (password.value !== passwordRepetir.value) {
        mensajes.push("Las contraseñas no coinciden.");
        isValid = false;
    }

    // e. Verificar seleccion de una opcion en "algunos intereses"
    const intereses = ["idCkProgramacion", "idCkBD", "idCkRedes", "idCkSeguridad"];
    const interesSeleccionado = intereses.some(id => document.getElementById(id).checked);
    if (!interesSeleccionado) {
        mensajes.push("Debe seleccionar al menos un interés.");
        isValid = false;
    }

    // f. Verificar seleccion de una carrera
    const carreras = formulario.elements["idRdCarrera"];
    const carreraSeleccionada = Array.from(carreras).some(radio => radio.checked);
    if (!carreraSeleccionada) {
        mensajes.push("Debe seleccionar una carrera.");
        isValid = false;
    }

    // g. Verificar slecion de un país de origen
    const pais = document.getElementById("idCmPais");
    if (pais.value === "Seleccione una opcion") {
        mensajes.push("Debe seleccionar un país de origen.");
        isValid = false;
    }

    if (!isValid) {
        mostrarErrores(mensajes);
    }

    return isValid;
}

function mostrarErrores(mensajes) {
    
    while (bodyModal.firstChild) {
        bodyModal.removeChild(bodyModal.firstChild);
    }
    const ul = document.createElement("ul");
    mensajes.forEach(mensaje => {
        const li = document.createElement("li");
        li.textContent = mensaje;
        ul.appendChild(li);
    });
    bodyModal.appendChild(ul);
    modal.show();
}

// Recorrer el formulario
const recorrerFormulario = function () {
    if (!validarFormulario()) return;

    let totText = 0;
    let totRadio = 0;
    let totCheck = 0;
    let totDate = 0;
    let totSelect = 0;
    let totFile = 0;
    let totPass = 0;
    let totEmail = 0;

    // Recorriendo elementos del formulario
    let elementos = formulario.elements;
    let totalElementos = elementos.length;

    for(let index = 0; index < totalElementos; index++){
        // Accediendo a cada hijo del formulario
        let elemento = elementos[index];

        // verificando el tipo de control en el formulario
        let tipoElemento = elemento.type;
        // verificando el tipo de nodo
        let tipoNode = elemento.nodeName;

        // Contabilizando el total de cada tipo de input
        if (tipoElemento === "text" && tipoNode === "INPUT") {
            totText++;
        } else if (tipoElemento === "password" && tipoNode === "INPUT") {
            totPass++;
        } else if (tipoElemento === "email" && tipoNode === "INPUT") {
            totEmail++;
        } else if (tipoElemento === "radio" && tipoNode === "INPUT") {
            totRadio++;
        } else if (tipoElemento === "checkbox" && tipoNode === "INPUT") {
            totCheck++;
        } else if (tipoElemento === "file" && tipoNode === "INPUT") {
            totFile++;
        } else if (tipoElemento === "date" && tipoNode === "INPUT") {
            totDate++;
        } else if (tipoNode === "SELECT") {
            totSelect++;
        }
    }

    // Creación de la tabla en el modal usando métodos del DOM
    const table = document.createElement("table");
    table.classList.add("table", "table-bordered");

    const tbody = document.createElement("tbody");

    // Función auxiliar para agregar una fila a la tabla
    function addRow(label, value) {
        const row = document.createElement("tr");
        const cellLabel = document.createElement("td");
        const cellValue = document.createElement("td");

        cellLabel.textContent = label;
        cellValue.textContent = value;

        row.appendChild(cellLabel); 
        row.appendChild(cellValue);
        tbody.appendChild(row);
    }

    
    addRow("Total de input[type='text']", totText);
    addRow("Total de input[type='password']", totPass);
    addRow("Total de input[type='email']", totEmail);
    addRow("Total de input[type='radio']", totRadio);
    addRow("Total de input[type='checkbox']", totCheck);
    addRow("Total de input[type='file']", totFile);
    addRow("Total de input[type='date']", totDate);
    addRow("Total de select", totSelect);

    table.appendChild(tbody);


    while (bodyModal.firstChild) {
        bodyModal.removeChild(bodyModal.firstChild);
    }
    bodyModal.appendChild(table);

    modal.show();
};

// agregando eventos al botón
button.onclick = () => {
    recorrerFormulario();
};
