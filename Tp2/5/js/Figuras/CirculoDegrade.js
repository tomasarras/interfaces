import Circulo from "./Circulo.js";

class CirculoDegrade extends Circulo{
    grd;
    colorFin;
    constructor(radio,coordenadas,ctx,colorInicio,colorFin) {
        super(radio,coordenadas,ctx,colorInicio);
        this.colorFin = colorFin;
        this.setGradiente();
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.coordenadas[0],this.coordenadas[1],this.radio,0,2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    reDibujar() {
        this.setGradiente();
        this.draw();
    }

    setGradiente() {
        let inicioX = this.coordenadas[0] - this.radio;
        let inicioY = this.coordenadas[1] - this.radio;
        let finX = this.coordenadas[1] + this.radio;
        let finY = this.coordenadas[1] + this.radio;
        this.grd = this.ctx.createLinearGradient(inicioX,inicioY,finX,finY);
        super.setGradiente();
    }
}

export default CirculoDegrade;