import { X,Y,AZUL,ROJA } from "./constantes.js";
import CanvasHelper from "./Helper/CanvasHelper.js";

class Ficha {
    coordenadas;
    radio;
    img;
    color;

    constructor(radio,coordenadas,img,color) {
        this.coordenadas = new Array();
        this.coordenadas[X] = coordenadas[X];
        this.coordenadas[Y] = coordenadas[Y];
        this.radio = radio;
        this.img = new Image();
        this.img.src = img.src;
        this.color = color;
    }

    dibujar() {
        this.img.onload = ()=> {
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
        };
        
    }
}

export default Ficha;