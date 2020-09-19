import Contenedor from "./Contenedor.js";
import Ficha from "./Ficha.js";
import CanvasHelper from "./Helper/CanvasHelper.js";
import Tablero from "./Tablero.js";

document.addEventListener("DOMContentLoaded",()=>{
    let filas = 6;
    let columnas = 7;
    CanvasHelper.iniciarCanvas();

    let tablero = new Tablero(filas,columnas);
    tablero.iniciarTablero();

});