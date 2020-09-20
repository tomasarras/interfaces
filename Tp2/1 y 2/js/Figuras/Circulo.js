import Figura from "./Figura.js";

class Circulo extends Figura{
    radio;

    constructor(radio,coordenadas,ctx,colorHex) {
        super(coordenadas,ctx,colorHex);
        this.radio = radio;
    }

    draw() {
        super.draw();
        this.ctx.beginPath();
        this.ctx.arc(this.coordenadas[0],this.coordenadas[1],this.radio,0,2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }
}

export default Circulo;