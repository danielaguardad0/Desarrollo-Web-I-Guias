// Accedemos al contenedor donde se mostrara los estudiantes
const containerEstudiantes = document.querySelector("#idContainerEstudiantes");

// Accedemos a cada boton por medio de la API DOM
const btnPromedio = document.querySelector("#idBtnPromedio");

// Agregamos el evento click a los botones, adicionalmente
// se le asigna la funcion que realiza la operacion
btnPromedio.addEventListener("click", generarEstudiantes);

function generarEstudiantes() {
    // utilizaremos un arreglo para guardar la informacion del estudiante
    let arrayEstudiante = new Array();

    let totalEstudiantes = document.querySelector(
        "#inputNumeroEstudiantes"
    ).value;
    let contador = 1;
    let estudiante, 
    calificacion, 
    convertir = 0;


    while (contador <= totalEstudiantes) {
        estudiante = prompt(`Ingrese el nombre del estudiante ${contador}`);

        // verificando que sea un valor entero positivo
        //y que se encuentre en el rango de 0-10
        if (estudiante === null) {
            alert("Ingreso de estudiantes cancelado.");
            return;  
        }
        
        do {
            calificacion = prompt(`Ingrese la calificación del estudiante ${contador}`
            );

            if (calificacion === null) {
                alert("Ingreso de calificaciones cancelado.");
                return;  
            }

            convertir = parseFloat(calificacion);
        } while (isNaN(convertir) || convertir < 0 || convertir > 10);

        arrayEstudiante[contador - 1] = new Array(
            estudiante, 
            convertir.toFixed(2)
        );
        contador++;
    }

    // Recorriendo el arreglo con for..of
    //Verificaremos cual es el promedio de las calificaciones
    // y cual de los estudiantes posee la calificacion mas alta
    let calificacionAlta = 0, 
    promedio = 0, 
    posicion = 0;

    let listado = "<h3>Listado de estudiantes registrados</h3>";
    listado += "<ol>";
    for (let indice of arrayEstudiante) {
        let nombre = indice[0];
        let nota = indice[1];
        // imprimiendo lista de estudiantes
        listado += `<li><b>Nombre:</b> ${nombre} - <b>Calificación:</b> ${nota}</li>`;

        // verificación de calificación más alta
        if (nota > calificacionAlta) {
            calificacionAlta = nota;
            posicion = indice;
        }

        // calculando el promedio
        promedio += parseFloat(nota);
    }
    listado += "</ol>";
    promedio = parseFloat(promedio / arrayEstudiante.length).toFixed(2);
    listado += `<p><b>Promedio de calificaciones:</b> ${promedio}</p>`;
    listado += `<p><b>Estudiante con mejor calificación:</b> ${posicion[0]}</p>`;

    // Imprimiendo resultado
    containerEstudiantes.innerHTML = listado;
}
