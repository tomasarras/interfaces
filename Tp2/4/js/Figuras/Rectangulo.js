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

    seClickeo(coordenadas) {
        let entreEjeX = (coordenadas[0] >= this.coordenadas[0]) &
                        (coordenadas[0] <= (this.coordenadas[0] + this.ancho));
        let entreEjeY = (coordenadas[1] >= this.coordenadas[1]) &
                        (coordenadas[1] <= (this.coordenadas[1] + this.alto));

        return entreEjeX & entreEjeY;
    }
}

export default Rectangulo;