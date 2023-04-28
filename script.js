// Baraja
const contenedorBaraja = document.getElementById('contenedor-baraja');
// Iconos de las cartas
let iconoDuda = `<i class="bi bi-question-lg"></i>`;
let iconoDiamantes = `<i class='bi bi-suit-diamond'></i>`;
let iconoPicas = `<i class="bi bi-suit-spade"></i>`;
let iconoCorazones = `<i class="bi bi-suit-heart"></i>`;
let iconoTreboles = `<i class="bi bi-suit-club"></i>`;

function crearBaraja() {
    let baraja = new Array();
    let palos = {
        "T": "Tréboles",
        "D": "Diamantes",
        "P": "Picas",
        "C": "Corazones"
    }
    let rangos = new Array("A", 2, 3, 4, 5, 6, 7, 8, 9, 0, "J", "Q", "K");

    Object.keys(palos).forEach(function (value) {
        for (let i = 0; i < rangos.length; i++) {

            baraja.push(rangos[i] + value);
        }
    })
    console.log(baraja);

    for (let i = 0; i < baraja.length; i++) {
        let valor = baraja[i].charAt(0);
        if (valor == 0) valor = 10;
        let palo = baraja[i].charAt(1);
        let print = '';
        let color = '';
        switch (palo) {
            case 'T':
                print = iconoTreboles;
                color = 'carta-negra';
                break;
            case 'D':
                print = iconoDiamantes;
                color = 'carta-roja';
                break;
            case 'C':
                print = iconoCorazones;
                color = 'carta-roja';
                break;
            case 'P':
                print = iconoPicas;
                color = 'carta-negra';
                break;

            default:
                break;
        }

        contenedorBaraja.innerHTML +=
            "<div id='" + baraja[i] + "' class='carta baraja'>"
            + "<div class='carta-contenedor'>"

            + "<div class='frontal " + color + "'>"
            + "<div class='num top'>" + valor + "</div>"
            + "<div class='palo'>" + print + "</div>"
            + "<div class='num bot'>" + valor + "</div>"
            + "</div>"

            + "<div class='duda trasera'><div class='palo'>" + iconoDuda + "</div></div>"
            + "</div>"
            + "</div>";

        let cartaTop = document.querySelectorAll('.baraja');
        cartaTop[cartaTop.length - 1].style.zIndex = i;
        // cartaTop[cartaTop.length - 1].style.boxShadow = "0 0 2px 1px #eff";

    }
}
crearBaraja();
let baraja = document.querySelectorAll('.baraja');
let caraCartas = document.querySelectorAll('.baraja .carta-contenedor');
let barajaTrasera = document.querySelectorAll('.trasera');
let num = document.querySelectorAll('.baraja .num');
let palos = document.querySelectorAll('.baraja .palo');

function voltearBaraja() {

    if (caraCartas[0].classList.contains('voltear')) {
        for (let i = 0; i < caraCartas.length; i++) {
            caraCartas[i].classList.remove('voltear');
        }
    } else {
        for (let i = 0; i < caraCartas.length; i++) {
            caraCartas[i].classList.add('voltear');
        }
    }
}

function juntar() {
    for (let i = 0; i < baraja.length; i++) {
        baraja[i].style.marginLeft = '-59.85px';

    }
}
function separar() {
    for (let i = 0; i < baraja.length; i++) {
        baraja[i].style.marginLeft = '0';

    }
}
function mezclar() {
    let listado = [];
    for (let i = 0; i < baraja.length; i++) {
        listado[i] = i;
    }
    let currentIndex = listado.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [listado[currentIndex], listado[randomIndex]] = [
            listado[randomIndex], listado[currentIndex]];
    }

    for (let i = 0; i < baraja.length; i++) {
        setTimeout(() => {
            baraja[listado[i]].style.left = '170px';
            baraja[listado[i]].style.zIndex = i;
            baraja[listado[i]].style.order = i;
            setTimeout(() => {
                baraja[listado[i]].style.left = '0px';
            }, 400);
        }, 50 * i);
    }
}

// El juego de la casa
let puntosCasa = 0;
let jugadaCasa = [];
let cartasCasa = [
    "A",
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    "J",
    "Q",
    "K"
];


// El juego del jugador
let puntosJugador = 0;
let jugadaJugador = [];
let cartasJugador = [
    "A",
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    "J",
    "Q",
    "K"
];

// Identificamos los elementos de HTML
const manoCasa = document.getElementById('mano-casa');
const manoJugador = document.getElementById('mano-jugador');
const displayCasa = document.getElementById('puntos-casa');
const displayJugador = document.getElementById('puntos-jugador');
const resultado = document.getElementById('resultado');
const btnIniciar = document.getElementById('btn-iniciar');
const btnPedir = document.getElementById('btn-pedir');
const btnPlantarse = document.getElementById('btn-plantarse');


// let jugadorPlantado = false;
// let fin = false;
let temporizador = 0;

function empezarJuego() {
    // Se resetean las cartas
    jugadaCasa = [];
    jugadaJugador = [];
    // fin = false;
    activarBotones();


    // Recogemos la dos cartas iniciales del jugador:
    darCarta();
    darCarta();

    // Recogemos la dos cartas iniciales de la casa:
    darCarta("casa");
    manoCasa.innerHTML += "<div id='girar' class='carta duda'>"
        + "<div class='palo'>" + iconoDuda + "</div>"
        + "</div>";

    // Cada segundo los tiempos de la animación del parpadeo se randomizan
    let tempParp = setInterval(parpadeo, 1000);
}

function activarBotones() {
    btnPedir.style['pointer-events'] = 'auto';
    btnPedir.style['opacity'] = 1;
    btnPlantarse.style['pointer-events'] = 'auto';
    btnPlantarse.style['opacity'] = 1;
}

function desactivarBotones() {
    btnPedir.style['pointer-events'] = 'none';
    btnPedir.style['opacity'] = 0.7;
    btnPlantarse.style['pointer-events'] = 'none';
    btnPlantarse.style['opacity'] = 0.7;
}

function calcularPuntos() {
    puntosCasa = 0;
    puntosJugador = 0;
    for (let i = 0; i < jugadaCasa.length; i++) {
        let as = false;
        switch (jugadaCasa[i]) {
            case "A":
                puntosCasa += 11;
                as = true;
                break;
            case "J":
            case "Q":
            case "K":
                puntosCasa += 10;
                break;

            default:
                puntosCasa += jugadaCasa[i];
                break;
        }
        if (puntosCasa > 21 && as) {
            puntosCasa -= 10;
        }
    }
    for (let i = 0; i < jugadaJugador.length; i++) {
        let as = false;
        switch (jugadaJugador[i]) {
            case "A":
                puntosJugador += 11;
                as = true;
                break;
            case "J":
            case "Q":
            case "K":
                puntosJugador += 10;
                break;

            default:
                puntosJugador += jugadaJugador[i];
                break;
        }
        if (puntosJugador > 21 && as) {
            puntosJugador -= 10;
        }
    }
    // Se imprime el estado de la partida por consola
    console.log("Cartas de la casa: " + jugadaCasa.join());
    console.log("puntuación de la casa: " + puntosCasa);
    console.log("Cartas del jugador: " + jugadaJugador.join());
    console.log("puntuación del jugador: " + puntosJugador);

    // Se imprime en pantalla
    // manoCasa.innerHTML = jugadaCasa.join();
    // manoJugador.innerHTML = jugadaJugador.join();
    mostrarCartas();
    displayCasa.innerHTML = puntosCasa;
    displayJugador.innerHTML = puntosJugador;
    ganador();
}




function mostrarCartas() {
    manoCasa.innerHTML = '';
    manoJugador.innerHTML = '';
    for (let i = 0; i < jugadaCasa.length; i++) {
        manoCasa.innerHTML += "<div class='carta'>"
            + "<div class='num top'>" + jugadaCasa[i] + "</div>"
            + "<div class='palo'>" + iconoDiamantes + "</div>"
            + "<div class='num bot'>" + jugadaCasa[i] + "</div>"
            + "</div>";
    }
    for (let i = 0; i < jugadaJugador.length; i++) {
        manoJugador.innerHTML += "<div class='carta'>"
            + "<div class='num top'>" + jugadaJugador[i] + "</div>"
            + "<div class='palo'>" + iconoPicas + "</div>"
            + "<div class='num bot'>" + jugadaJugador[i] + "</div>"
            + "</div>";
    }
}

function ganador() {

    // Switch para comentar el estado actual del juego
    switch (true) {
        case puntosJugador > puntosCasa:
            resultado.innerHTML = "Va ganando el jugador";
            break;

        case puntosCasa > puntosJugador:
            resultado.innerHTML = "Va ganando la casa";
            break;

        case puntosCasa === puntosJugador:
            resultado.innerHTML = "Hay empate";
            break;

        default:
            console.log("default switch 1");
            break;
    }

    desactivarBotones();

    // Switch para determinar si ha finalizado la partida
    switch (true) {
        case (puntosCasa === 21 && puntosJugador === 21):
            resultado.innerHTML = "Ambas partes tienen 21, la apuesta se recupera."
            break;

        case (puntosCasa === 21 && puntosJugador != 21):
            resultado.innerHTML = "La casa tiene un Blackjack. El jugador pierde la apuesta";
            break;

        case (puntosCasa != 21 && puntosJugador === 21):
            resultado.innerHTML = "El jugador tiene un Blackjack. Ha ganado!";
            break;

        case puntosJugador > 21:
            resultado.innerHTML = "El jugador se ha pasado de 21. Gana la casa";
            break;

        case puntosCasa > 21:
            resultado.innerHTML = "La casa se ha pasado de 21. Gana el jugador";
            break;

        default:
            console.log("default switch 2");
            activarBotones();
            break;
    }
}

function darCarta(jugada) {
    switch (jugada) {
        case "casa":
            jugadaCasa.push(cartasCasa[Math.floor(Math.random() * cartasCasa.length)]);
            break;
        default:
            jugadaJugador.push(cartasJugador[Math.floor(Math.random() * cartasJugador.length)]);
            break;
    }

    if (jugadaCasa.length >= 1 && jugadaJugador.length >= 2) calcularPuntos();
}

function plantarse() {
    // jugadorPlantado = true;

    if (puntosJugador > puntosCasa) {
        darCarta('casa');

        temporizador = setTimeout(() => {
            plantarse();
        }, 1000);
    } else {
        clearTimeout(temporizador);
        temporizador = 0;
    }

}

// Animación del parpadeo de la luz de neón
function parpadeo() {
    let luces = document.querySelectorAll('.carta:hover div');
    for (let i = 0; i < luces.length; i++) {
        luces[i].style.animationDuration = Math.floor(Math.random() * 10 + 1) + "s";

    }
}




// empezarJuego();

// Event listener
btnIniciar.addEventListener('click', empezarJuego);
btnPedir.addEventListener('click', darCarta);
btnPlantarse.addEventListener('click', plantarse);
btnPlantarse.addEventListener('click', desactivarBotones);

// let arrayCartas = [];
// for (let i = 0; i < arrayCartas.length; i++) {
//     arrayCartas[i].style.zIndex = i;

// }


// German

let cartas = document.querySelectorAll('.card');

for (let i = 0; i < cartas.length; i++) {
    cartas[i].classList.remove('card');

}

