import { X,Y,AZUL,ROJA } from "./constantes.js";
import CanvasHelper from "./Helper/CanvasHelper.js";

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
        if ( (this.color == AZUL & ficha.getColor() == AZUL) ||
              (this.color == ROJA & ficha.getColor() == ROJA)) {
            return true;
        } else {
            return false;
        }
    }

    getColor() {
        return this.color;
    }
}

export default Ficha;