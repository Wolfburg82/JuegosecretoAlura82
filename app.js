let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 8;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        if (numeroDeUsuario === numeroSecreto) {
            asignarTextoElemento('p',`Adivinaste el número secreto en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}.`);
            asignarTextoElemento('p2','Ya se usaron todos los números posibles.');
            document.querySelector('#reiniciar').setAttribute('disabled','true');
        } else {
            //El usuario no acertó.
            if (numeroDeUsuario > numeroSecreto) {
                asignarTextoElemento('p','El número secreto es menor');
            } else {
                asignarTextoElemento('p','El número secreto es mayor');
            }
            intentos++;
            limpiarCaja();
        }    
        return;
    } else {
        if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Adivinaste el número secreto en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}.`);
        asignarTextoElemento('p2',`${(numeroMaximo-listaNumerosSorteados.length === 1) ? 'Queda' : 'Quedan'} ${numeroMaximo-listaNumerosSorteados.length} ${(numeroMaximo-listaNumerosSorteados.length === 1) ? 'número secreto' : 'números secretos'} por descubrir.`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acertó.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }    
    return;
}
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    
        //Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
}

function condicionesIniciales() {
    asignarTextoElemento('h1','¡Juego del número secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    asignarTextoElemento('p2','');
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    console.log(numeroSecreto);
}

function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números 
    //Generar el número aleatorio
    //Inicializar el número intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    
}

condicionesIniciales();