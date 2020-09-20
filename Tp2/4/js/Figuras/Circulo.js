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

    seClickeo(coordenadas) {
        let entreEjeX = (coordenadas[0] >= (this.coordenadas[0] - this.radio)) &
                        (coordenadas[0] <= (this.coordenadas[0] + this.radio));
        let entreEjeY = (coordenadas[1] >= (this.coordenadas[1] - this.radio)) &
                        (coordenadas[1] <= (this.coordenadas[1] + this.radio));

        return entreEjeX & entreEjeY;
    }
}

export default Circulo;