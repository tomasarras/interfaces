import Contenedor from "./Contenedor.js";
import Ficha from "./Ficha.js";
import CanvasHelper from "./Helper/CanvasHelper.js";
import Tablero from "./Tablero.js";

document.addEventListener("DOMContentLoaded",()=>{
    let selectColumnas = document.querySelector("#columnas-tablero");
    selectColumnas.addEventListener("change",iniciarTablero);

    let selectFilas = document.querySelector("#filas-tablero");
    selectFilas.addEventListener("change",iniciarTablero);

    let btnReiniciar = document.querySelector("#btn-reiniciar");
    btnReiniciar.addEventListener("click",iniciarTablero);
    
    iniciarTablero();

    function iniciarTablero() {
        let columnas = parseInt(selectColumnas.value);
        let filas = parseInt(selectFilas.value);
        CanvasHelper.iniciarCanvas();
        let tablero = Tablero.getInstance();
        tablero.crear(filas,columnas);
        tablero.iniciarTablero()
    }
});