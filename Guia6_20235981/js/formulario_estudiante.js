document.addEventListener("DOMContentLoaded", function () {
    const titulo = document.querySelector("h2");
    titulo.style.textAlign = "center";
    
    const inputs = document.querySelectorAll("#formulario_estudiante input");

    inputs.forEach(input => {
      input.style.border = "1px solid #ccc";
      input.style.padding = "8px";
      input.style.marginBottom = "10px";
      input.style.width = "100%";
    });

    const labels = document.querySelectorAll("#formulario_estudiante label");
    labels.forEach(label => {
      label.style.fontWeight = "bold";
      label.style.marginTop = "10px";
      label.style.display = "block";
    });

    const form = document.getElementById("formulario_estudiante");
    form.style.width = "300px";
    form.style.margin = "auto";
    form.style.backgroundColor = "#f9f9f9";
    form.style.padding = "20px";
    form.style.borderRadius = "8px";
    form.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
});

function formatearDUI() {
    const duiInput = document.getElementById("dui");
    let dui = duiInput.value.replace(/\D/g, ''); 
    if (dui.length > 8) dui = dui.slice(0, 8) + '-' + dui.slice(8, 9);
    duiInput.value = dui;
}

function formatearNIT() {
    const nitInput = document.getElementById("nit");
    let nit = nitInput.value.replace(/\D/g, ''); 
    if (nit.length > 4 && nit.length <= 10) nit = nit.slice(0, 4) + '-' + nit.slice(4);
    else if (nit.length > 10 && nit.length <= 13) nit = nit.slice(0, 4) + '-' + nit.slice(4, 10) + '-' + nit.slice(10);
    else if (nit.length > 13) nit = nit.slice(0, 4) + '-' + nit.slice(4, 10) + '-' + nit.slice(10, 13) + '-' + nit.slice(13, 14);
    nitInput.value = nit;
}

function formatearFecha() {
    const fechaInput = document.getElementById("fechaNacimiento");
    let fecha = fechaInput.value.replace(/\D/g, ''); 
    if (fecha.length > 2 && fecha.length <= 4) fecha = fecha.slice(0, 2) + '/' + fecha.slice(2);
    else if (fecha.length > 4) fecha = fecha.slice(0, 2) + '/' + fecha.slice(2, 4) + '/' + fecha.slice(4, 8);
    fechaInput.value = fecha;
}

function validarFormulario() {
    const carnetRegex = /^[A-Za-z]{2}\d{3}$/;
    const carnet = document.getElementById("carnet").value;
    if (!carnetRegex.test(carnet)) {
      alert("Carnet inválido. Debe seguir el formato: dos letras y tres números (Ej: AB001).");
      return false;
    }

    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const nombre = document.getElementById("nombre").value;
    if (!nombreRegex.test(nombre)) {
      alert("Nombre inválido. Debe contener solo letras y espacios.");
      return false;
    }

    const duiRegex = /^\d{8}-\d$/;
    const dui = document.getElementById("dui").value;
    if (!duiRegex.test(dui)) {
      alert("DUI inválido. Debe seguir el formato ########-#.");
      return false;
    }

    const nitRegex = /^\d{4}-\d{6}-\d{3}-\d$/;
    const nit = document.getElementById("nit").value;
    if (!nitRegex.test(nit)) {
      alert("NIT inválido. Debe seguir el formato ####-######-###-#.");
      return false;
    }

    const fechaRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    if (!fechaRegex.test(fechaNacimiento)) {
      alert("Fecha de nacimiento inválida. Debe seguir el formato dd/mm/yyyy.");
      return false;
    }

    const edad = document.getElementById("edad").value;
    if (isNaN(edad) || edad <= 0) {
      alert("Edad inválida. Debe ser un número mayor a cero.");
      return false;
    }

    alert("Formulario enviado correctamente.");
    return true;
}



  