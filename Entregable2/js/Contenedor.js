import { X, Y } from "./constantes.js";
import CanvasHelper from "./Helper/CanvasHelper.js";
import Tablero from "./Tablero.js";

class Contenedor {
    coordenadas;
    ancho;
    alto;
    ficha;
    fila;
    columna;
    static imagen;

    constructor(coordenadas,ancho,alto){ 
        this.coordenadas = new Array();
        this.coordenadas[X] = coordenadas[X];
        this.coordenadas[Y] = coordenadas[Y];
        this.ancho = ancho;
        this.alto = alto;
        Contenedor.imagen = new Image();
        let img  = document.querySelector("#js-contenedor");
        Contenedor.imagen.src = img.src;
        this.ficha = null;
    }

    dibujar() {
        Contenedor.imagen.onload = this.reDibujar.bind(this);
    }

    reDibujar() {
        CanvasHelper.agregarImagen(Contenedor.imagen,this.coordenadas,this.ancho,this.alto);
    }

    getCoordenadaX(){
        return this.coordenadas[X];
    }

    getCoordenadaY(){
        return this.coordenadas[Y];
    }

    getAncho() {
        return this.ancho;
    }

    contieneFicha() {
        return this.ficha != null;
    }

    setFicha(ficha) {
        this.ficha = ficha;
        let coordenadas = new Array();
        coordenadas[X] = this.coordenadas[X] + (this.ancho / 2) +1;
        coordenadas[Y] = this.coordenadas[Y] + (this.alto / 2) +1;
        let intensidadAnimacion = 30;
        let orden = ()=> {
            let tablero = Tablero.getInstance();
            tablero.actualizarFondoMadera();
            tablero.actualizarFichas();
            tablero.actualizarTablero();
            tablero.mostrarTextoJugadores();
        }

        ficha.animar(coordenadas,intensidadAnimacion,orden);
    }

    getFicha() {
        return this.ficha;
    }

    comparar(contenedor) {
        if (contenedor.contieneFicha() & this.contieneFicha()) {
            let fichaContenedor = contenedor.getFicha();
            return this.ficha.comparar(fichaContenedor);
        } else {
            return false;
        }
    }

    setFila(fila) {
        this.fila = fila;
    }

    setColumna(columna) {
        this.columna = columna;
    }

    getFila() {
        return this.fila;
    }

    getColumna() {
        return this.columna;
    }

}

export default Contenedor;