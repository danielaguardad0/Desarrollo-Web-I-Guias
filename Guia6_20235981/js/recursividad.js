// Otra forma de acceder a un elemento HTML es utilizando el getElementById del DOM
// Notese que para este caso no se acepta el caracter e
const campo = document.getElementById("idTxtNumero");

// definamos una funcion anonima que permita validar en tiempo real el ingreso de un numero
const validarNumero = function (e) {
    // creamos una expresion regular que valida que sean numeros
    let validar = /[0-9]{1}/;
    let tecla = e.key;

    /*
    test valida que la expresión regular coincida con el valor ingresado
    // Podrá observar que al intentar teclear una letra u otro caracter diferente
    // a un número este no se escribe en el campo
    */
    if (!validar.test(tecla)) e.preventDefault();
};

// definiendo el evento keypress para el campo
campo.addEventListener("keypress", validarNumero);

// Trabajando con el boton Calcular
const boton = document.getElementById("idBtnCalcular");

// Definimos una funcion anonima para calcular el factorial de un numero
function calcularFactorial(numero) {
    return numero < 2 ? 1 : numero * calcularFactorial(numero - 1);
}

// Definamos una funcion de tipo flecha para imprimir el resultado del factorial
const imprimir = (numero, resultado) => {
    const contenedor = document.getElementById("idDivResultado");
    contenedor.innerHTML = `¡El factorial de ${numero} es ${resultado}!`;
};

// Definiendo una funcion tradicional
function calcular() {
    let numero = document.getElementById("idTxtNumero").value;
    if (numero != ""){
        // Llamamos a la funcion anonima para que calcule el factorial
        let resultado = calcularFactorial(numero);
        //Enviando el resultado a una funcion de tipo flecha
        imprimir(numero, resultado);
    }else {
        alert("Debe ingresar un numero válido");
    }
}

// definiendo el evento click para el boton
boton.addEventListener("click", calcular);
