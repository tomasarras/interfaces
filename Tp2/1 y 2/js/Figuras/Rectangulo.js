import Figura from "./Figura.js";

class Rectangulo extends Figura{
    ancho;
    alto;

    constructor(ancho,alto,coordenadas,ctx,colorHex) {
        super(coordenadas,ctx,colorHex);
        this.ancho = ancho;
        this.alto = alto;
    }

    
    draw() {
        super.draw();
        this.ctx.fillRect(this.coordenadas[0], this.coordenadas[1], this.ancho, this.alto); 
    }
}

export default Rectangulo;