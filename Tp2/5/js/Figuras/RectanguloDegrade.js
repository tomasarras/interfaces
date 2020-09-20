import Rectangulo from "./Rectangulo.js";

class RectanguloDegrade extends Rectangulo{
    grd;
    colorFin;

    constructor(ancho,alto,coordenadas,ctx,colorHex,colorFin) {
        super(ancho,alto,coordenadas,ctx,colorHex);
        this.colorFin = colorFin;
        this.setGradiente();
    }

    
    draw() {
        this.ctx.fillRect(this.coordenadas[0], this.coordenadas[1], this.ancho, this.alto);
    }

    reDibujar() {
        this.setGradiente();
        this.draw();
    }

    setGradiente() {
        let ancho = this.coordenadas[0] + this.ancho;
        let alto = this.coordenadas[1] + this.alto;
        this.grd = this.ctx.createLinearGradient(this.coordenadas[0],this.coordenadas[1],ancho,alto);
        super.setGradiente();
    }
}

export default RectanguloDegrade;