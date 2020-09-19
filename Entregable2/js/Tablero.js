import Contenedor from "./Contenedor.js";
import { X,Y, AZUL,ROJA } from "./constantes.js";
import CanvasHelper from "./Helper/CanvasHelper.js";
import Ficha from "./Ficha.js";

class Tablero {
    filas;
    columnas;
    contenedores;
    fichas;
    colorFichasJ1;
    colorFichasJ2;

    constructor(filas,columnas) {
        this.filas = filas;
        this.columnas = columnas;
        this.contenedores = new Array();
        this.fichas = new Array();
        this.colorFichasJ1 = "#FF0000";
        this.colorFichasJ2 = "#0000FF";
    }

    iniciarTablero() {
        this.crearTablero();
        this.crearFichas();
    }

    crearTablero() {
        let anchoContenedor = 115;
        let altoContenedor = 75;
        let coordenadas = new Array();
        let contenedor;
        let tableroHeight = altoContenedor * this.filas;
        let tableroWidth = anchoContenedor * this.columnas;
        let desplazamientoX = (CanvasHelper.getWidth() - tableroWidth) / 2;
        let desplazamientoY = CanvasHelper.getHeight() - tableroHeight;

        for (let i = 0; i < this.filas; i++) {
            this.contenedores[i] = new Array();
            for (let j = 0; j < this.columnas; j++) {
                coordenadas[X] = (j * anchoContenedor) + desplazamientoX;
                coordenadas[Y] = (i * altoContenedor) + desplazamientoY;
                contenedor = new Contenedor(coordenadas,anchoContenedor,altoContenedor);
                this.contenedores[i][j] = contenedor;
                contenedor.dibujar();
            }
        }
    }

    crearFichas() {
        let cantidadFichas = this.filas * this.columnas;
        let fichasPorJugador = cantidadFichas / 2;
        let ficha;
        let radio = 25;
        let coordenadas = new Array();
        coordenadas[X] = radio;
        let contadorFicha = 0;
        let imgFicha1 = document.querySelector("#js-ficha-1");
        let imgFicha2 = document.querySelector("#js-ficha-2");

        for (let i = 0; i < cantidadFichas; i++) {
            if (contadorFicha == 11) {
                contadorFicha = 0;
                coordenadas[X] += (radio * 2);
            } else {
                contadorFicha++;
            }
            coordenadas[Y] = (contadorFicha * (radio * 2)) + radio;
            if (i <= fichasPorJugador) {
                ficha = new Ficha(radio,coordenadas,imgFicha1,AZUL);
            } else {
                ficha = new Ficha(radio,coordenadas,imgFicha2,ROJA);
            }
            this.fichas[i] = ficha;
            ficha.dibujar();
        }
    }
}

export default Tablero;