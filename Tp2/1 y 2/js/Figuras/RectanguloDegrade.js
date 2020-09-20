import Rectangulo from "./Rectangulo.js";

class RectanguloDegrade extends Rectangulo{
    grd;

    constructor(ancho,alto,coordenadas,ctx,colorHex,colorFin) {
        super(ancho,alto,coordenadas,ctx,colorHex);
        this.setGradiente(colorFin);
    }

    
    draw() {
        this.ctx.fillRect(this.coordenadas[0], this.coordenadas[1], this.ancho, this.alto);
    }

    setGradiente(colorFin) {
        let ancho = this.coordenadas[0] + this.ancho;
        let alto = this.coordenadas[1] + this.alto;
        this.grd = this.ctx.createLinearGradient(this.coordenadas[0],this.coordenadas[1],ancho,alto);
        super.setGradiente(colorFin);
    }
}

export default RectanguloDegrade;