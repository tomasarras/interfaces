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
    imgGanadora;

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
        this.imgGanadora = null;
    }

    dibujar() {
        if (Contenedor.imagen.complete) {
            this.cargarImg();
        } else {
            Contenedor.imagen.onload = this.cargarImg.bind(this);
        }
    }

    cargarImg() {
        if (this.imgGanadora == null)
            CanvasHelper.agregarImagen(Contenedor.imagen,this.coordenadas,this.ancho,this.alto);
        else
            CanvasHelper.agregarImagen(this.imgGanadora,this.coordenadas,this.ancho,this.alto);
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
            tablero.mostrarFondoMadera();
            tablero.mostrarFichas();
            tablero.mostrarTablero();
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

    setGanador(imagen) {
        this.imgGanadora = new Image();
        this.imgGanadora.src = imagen.src;
        let cargarImg = ()=> {
            CanvasHelper.agregarImagen(this.imgGanadora,this.coordenadas,this.ancho,this.alto);
        };
        this.imgGanadora.onload = cargarImg.bind(this);
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