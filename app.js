const calculadora = {
    valorMostrado: '0',
    primerNumero: null,
    esperarNuevoNumero: false,
    operador: null,
  };

const realizarOperacion = {
    '+': (primerNumero, segundoNumero) => primerNumero + segundoNumero,
    '-': (primerNumero, segundoNumero) => primerNumero - segundoNumero,
    'x': (primerNumero, segundoNumero) => primerNumero * segundoNumero,
    '/': (primerNumero, segundoNumero) => primerNumero / segundoNumero,
    '=': (primerNumero, segundoNumero) => segundoNumero
}

function ingresarNumero(numero){
    const {valorMostrado,esperarNuevoNumero} = calculadora;
    if(esperarNuevoNumero===true){
        calculadora.valorMostrado = numero;
        calculadora.esperarNuevoNumero = false
    }
    else{
        calculadora.valorMostrado = valorMostrado === '0' ? numero : valorMostrado + numero;
    }
}

function ingresarPunto(punto){
    if(!calculadora.valorMostrado.includes(punto)){
        calculadora.valorMostrado+=punto;
    }
}

function ingresarOperador(nuevoOperador){
    const {primerNumero, valorMostrado, operador} = calculadora;
    const valor = parseFloat(valorMostrado);
    if(operador && calculadora.esperarNuevoNumero){
        calculadora.operador=nuevoOperador;
        return
    }
    if(primerNumero==null){
        calculadora.primerNumero=valor;
    }
    else if(operador){
        const valorActual = primerNumero || 0;
        const resultado = realizarOperacion[operador](valorActual,valor);

        calculadora.valorMostrado=resultado;
        calculadora.primerNumero=resultado;
    }
    calculadora.esperarNuevoNumero = true;
    calculadora.operador=nuevoOperador;
}

function actualizarPantalla() {
    const pantalla = document.querySelector('.resultado');
    pantalla.value = calculadora.valorMostrado;

    if (calculadora.esperarNuevoNumero) {
        calculadora.valorMostrado = '0';
    }
}


actualizarPantalla();

function limpiarPantalla() {
    calculadora.valorMostrado = '0';
    calculadora.primerNumero = null;
    calculadora.esperarNuevoNumero = false;
    calculadora.operador = null;
}


function borrarDigito() {
    const { valorMostrado } = calculadora;
    calculadora.valorMostrado = valorMostrado.length > 1 ? valorMostrado.slice(0, -1) : '0';
}


const botones = document.querySelector('.botones');
botones.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }
    if (target.classList.contains('operador')) {
        ingresarOperador(target.value);
    } else if (target.classList.contains('decimal')) {
        ingresarPunto(target.value);
    } else if (target.classList.contains('function')) {
        if (target.value === 'AC') {
            limpiarPantalla();
        } else if (target.value === 'DEL') {
            borrarDigito();
        }
    } else {
        ingresarNumero(target.value);
    }
    actualizarPantalla();
});