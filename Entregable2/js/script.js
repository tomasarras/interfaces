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

    let radio = 38;
    let imgFicha2 = document.querySelector("#js-ficha-2");

    //let ficha = new Ficha(radio,imgFicha2,0,[800,600]);
    //ficha.dibujar();

});