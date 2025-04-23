let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto){
    let titulo = document.querySelector(elemento);
    titulo.innerHTML = texto;
    return;
}

function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1 ) ? 'vez.' : 'veces.'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        //el usuario no acertó
        if (numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p','El número secreto es menor.');
        } else{
            asignarTextoElemento('p','El número secreto es mayor.');
        }
        intentos++; 
        limpiarCaja();
    }
    return;
}

function limpiarCaja(){
    document.querySelector('#valorUsuario').value = '';
}

function reiniciarJuego(){
    //Limpiar caja 
    limpiarCaja();
    //Indicar mensaje de intervalo de números
    condicionesInicales();
    //Deshabilitar el botón de nuevo juego 
    document.querySelector('#reiniciar').setAttribute('disabled', true);

}

function condicionesInicales(){
    asignarTextoElemento('h1', 'Juego del número secreto.');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}.`);
    //Generar el número aleatorio
    numeroSecreto = generarNumeroSecreto();
    //Inicializar el numero de intentos
    intentos = 1;
}

function generarNumeroSecreto() {
/**
 * La implementación del profesor usa recursión cuando el número generado ya está en la lista de números sorteados.
 * Esto puede causar problemas cuando el rango de números es pequeño y muchos ya han sido sorteados,
 * haciendo que la recursión se llame múltiples veces innecesariamente.
 * 
 * En esta versión, se usa un bucle `while` en lugar de recursión para evitar llamadas innecesarias a la función.
 * De esta forma, garantizamos que siempre se genera un número único de manera eficiente sin riesgo de loops infinitos.
 */

    if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
        return null; // Evita devolver un número inválido
    }

    let numeroGenerado;

    // Asegurar que el número generado NO esté en la lista
    do {
        numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    } while (listaNumerosSorteados.includes(numeroGenerado));

    listaNumerosSorteados.push(numeroGenerado);

    console.log("Número generado:", numeroGenerado);
    console.log("Lista actualizada:", listaNumerosSorteados);

    return numeroGenerado;
}
/*function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles')
    } else {
        //Si el número generado esta incluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}
*/
condicionesInicales();