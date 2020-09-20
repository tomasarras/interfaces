import { X,Y,VERDE,ROJA } from "./constantes.js";
import CanvasHelper from "./Helper/CanvasHelper.js";
import Tablero from "./Tablero.js";

class Ficha {
    coordenadas;
    radio;
    img;
    color;
    contenedor;

    constructor(radio,img,color,coordenadas) {
        this.coordenadas = new Array();
        if (coordenadas == undefined) {
            this.coordenadas[X] = 0;
            this.coordenadas[Y] = 0;
        } else {
            this.coordenadas[X] = coordenadas[X];
            this.coordenadas[Y] = coordenadas[Y];
        }
        this.radio = radio;
        this.img = new Image();
        this.img.src = img.src;
        this.color = color;
        this.contenedor = null;
    }

    asignarContenedor(contenedor) {
        this.contenedor = contenedor;
    }

    estaEnContenedor() {
        return this.contenedor != null;
    }

    getContenedor() {
        return this.contenedor;
    }

    getRadio() {
        return this.radio;
    }

    dibujar() {
        this.img.onload = this.reDibujar.bind(this);
    }

    calcularOffset(e) {
        let coordenadasClick = CanvasHelper.getMousePosition(e);
        let coordenadas = new Array();
        coordenadas[X] = coordenadasClick[X] - this.coordenadas[X];
        coordenadas[Y] = coordenadasClick[Y] - this.coordenadas[Y];
        return coordenadas;
    }

    isClickeada(coordenadas) {
        let coincideX = (coordenadas[X] < this.coordenadas[X] + this.radio) &
                    (coordenadas[X] > this.coordenadas[X] - this.radio);

        let coincideY = (coordenadas[Y] < this.coordenadas[Y] + this.radio) &
        (coordenadas[Y] > this.coordenadas[Y] - this.radio);

        return (coincideX & coincideY);
    }

    mover(coordenadas) {
        this.coordenadas[X] = coordenadas[X];
        this.coordenadas[Y] = coordenadas[Y];
    }

    animar(coordenadas,intensidad,orden) {
        let xFijo = false;
        let yFijo = false;
        if (this.coordenadas[Y] < coordenadas[Y]) {
            this.coordenadas[Y] = this.coordenadas[Y] + intensidad;
            if (this.coordenadas[Y] >= coordenadas[Y]) {
                this.coordenadas[Y] = coordenadas[Y];
            }
        } else if (this.coordenadas[Y] > coordenadas[Y]) {
            this.coordenadas[Y] = this.coordenadas[Y] - intensidad;
            if (this.coordenadas[Y] <= coordenadas[Y]) {
                this.coordenadas[Y] = coordenadas[Y];
            }
        } else {
            yFijo = true;
        }

        if (this.coordenadas[X] < coordenadas[X]) {
            this.coordenadas[X] = this.coordenadas[X] + intensidad;
            if (this.coordenadas[X] >= coordenadas[X]) {
                this.coordenadas[X] = coordenadas[X];
            }
        } else if (this.coordenadas[X] > coordenadas[X]) {
            this.coordenadas[X] = this.coordenadas[X] - intensidad;
            if (this.coordenadas[X] <= coordenadas[X]) {
                this.coordenadas[X] = coordenadas[X];
            }
        } else {
            xFijo = true;
        }

        if (!(xFijo & yFijo)) {
            CanvasHelper.limpiarCanvas();
            orden();
            let handler = ()=> this.animar(coordenadas,intensidad,orden);
            setTimeout(handler.bind(this), 10);
        }
    }

    reDibujar() {
        let ctx = CanvasHelper.getCtx();
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.coordenadas[X], this.coordenadas[Y], this.radio, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        
        ctx.drawImage(this.img, this.coordenadas[X] - this.radio, this.coordenadas[Y] - this.radio, this.radio*2, this.radio*2);

        ctx.beginPath();
        ctx.arc(this.coordenadas[X] - this.radio, this.coordenadas[Y] - this.radio, this.radio, 0, Math.PI * 2, true);
        ctx.clip();
        ctx.closePath();
        ctx.restore();
    }

    estaPorEncimaDeColumna(contenedor) {
        let coordenadaXContenedor = contenedor.getCoordenadaX();
        let coordenadaYContenedor = contenedor.getCoordenadaY();
        let anchoContenedor = contenedor.getAncho();
        let coincideX = ((this.coordenadas[X] > coordenadaXContenedor) &
                          (this.coordenadas[X] < coordenadaXContenedor + anchoContenedor));

        let encimaDeY = this.coordenadas[Y] < coordenadaYContenedor;

        if (coincideX & encimaDeY)
            return true;
        else
            return false;
    }

    comparar(ficha) {
        if ( (this.color == VERDE & ficha.getColor() == VERDE) ||
              (this.color == ROJA & ficha.getColor() == ROJA)) {
            return true;
        } else {
            return false;
        }
    }

    getColor() {
        return this.color;
    }

    setGanadora(imagen) {
        this.img = new Image();
        this.img.src = imagen.src;

        let cargarImg = ()=> {
            let ctx = CanvasHelper.getCtx();
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.coordenadas[X], this.coordenadas[Y], this.radio, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            
            ctx.drawImage(this.img, this.coordenadas[X] - this.radio, this.coordenadas[Y] - this.radio, this.radio*2, this.radio*2);

            ctx.beginPath();
            ctx.arc(this.coordenadas[X] - this.radio, this.coordenadas[Y] - this.radio, this.radio, 0, Math.PI * 2, true);
            ctx.clip();
            ctx.closePath();
            ctx.restore();
        }

        this.img.onload = cargarImg.bind(this);
    }
}

export default Ficha;