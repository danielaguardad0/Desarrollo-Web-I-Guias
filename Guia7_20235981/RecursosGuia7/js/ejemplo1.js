// ACCEDIENDO A LA REFERENCIA DEL FORMULARIO QUE
// TENDRÁ LOS NUEVOS ELEMENTOS
const newForm = document.getElementById("idNewForm");

// ACCEDIENDO A LA REFERENCIA DE BOTONES
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");

// ACCEDIENDO AL VALOR DEL SELECT PARA DETERMINAR EL TIPO DE ELEMENTO A CREAR
const cmbElemento = document.getElementById("idCmbElemento");

// ACCEDIENDO A LOS CONTROLES DEL MODAL
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// FUNCIÓN PARA VERIFICAR SI EL ID ES ÚNICO
const esIdUnico = function (id) {
    return !document.getElementById(id);
};

// AGREGANDO FUNCIONES
const verificarTipoElemento = function () {
    let elemento = cmbElemento.value;
    // validando que se haya seleccionado un elemento
    if (elemento != "") {
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creará");
    }
};

const newSelect = function () {
    let elementoId = `id${nombreElemento.value}`;
    
    // Validación de ID único
    if (!esIdUnico(elementoId)) {
        alert("El ID ya existe. Por favor, elija un nombre de control diferente.");
        return;
    }

    let addElemento = document.createElement("select");
    addElemento.setAttribute("id", elementoId);
    addElemento.setAttribute("class", "form-select");

    for (let i = 1; i <= 10; i++) {
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.innerHTML = `Opción ${i}`;
        addElemento.appendChild(addOption);
    }

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", elementoId);
    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);
    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

const newRadioCheckbox = function (newElemento) {
    let elementoId = `id${nombreElemento.value}`;
    
    if (!esIdUnico(elementoId)) {
        alert("El ID ya existe. Por favor, elija un nombre de control diferente.");
        return;
    }

    let addElemento = document.createElement("input");
    addElemento.setAttribute("id", elementoId);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", elementoId);
    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-check");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);
    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

const newInput = function (newElemento) {
    let elementoId = `id${nombreElemento.value}`;
    
    if (!esIdUnico(elementoId)) {
        alert("El ID ya existe. Por favor, elija un nombre de control diferente.");
        return;
    }

    let addElemento = newElemento === "textarea" 
                        ? document.createElement("textarea") 
                        : document.createElement("input");

    addElemento.setAttribute("id", elementoId);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-control");
    addElemento.setAttribute("placeholder", tituloElemento.value);

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", elementoId);

    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");

    labelElemento.textContent = tituloElemento.value;
    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating mb-3");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);
    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};

// FUNCION PARA VALIDAR EL FORMULARIO
const validarFormulario = function () {
    let elementos = newForm.querySelectorAll("input, select, textarea");
    let formularioValido = true;

    elementos.forEach(elemento => {
        if ((elemento.type === "radio" || elemento.type === "checkbox") && !elemento.checked) {
            formularioValido = false;
        } else if (!elemento.value) {
            formularioValido = false;
        }
    });

    if (formularioValido) {
        alert("Formulario válido. Todos los campos están llenos y las opciones están seleccionadas.");
    } else {
        alert("Formulario incompleto. Por favor, llene todos los campos y seleccione las opciones.");
    }
};

// AGREGANDO EVENTO CLIC A LOS BOTONES
buttonCrear.onclick = verificarTipoElemento;

buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != "") {
        let elemento = cmbElemento.value;

        if (elemento == "select") {
            newSelect();
        } else if (elemento == "radio" || elemento == "checkbox") {
            newRadioCheckbox(elemento);
        } else {
            newInput(elemento);
        }
    } else {
        alert("Faltan campos por completar");
    }
};

// CREANDO BOTÓN PARA VALIDAR EL FORMULARIO
const buttonValidarFormulario = document.createElement("button");
buttonValidarFormulario.textContent = "Validar formulario";
buttonValidarFormulario.className = "btn btn-success";
buttonValidarFormulario.onclick = validarFormulario;
newForm.appendChild(buttonValidarFormulario);

// Agregando evento para el modal de bootstrap
document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    tituloElemento.value = "";
    nombreElemento.value = "";
    tituloElemento.focus();
});
