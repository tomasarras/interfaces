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
        if (this.tieneImg){
            this.cargarImagen();
        } else {
            this.ctx.fillRect(this.coordenadas[0], this.coordenadas[1], this.ancho, this.alto); 
        }
    }

    setGradiente(color) {
        let ancho = this.coordenadas[0] + this.ancho;
        let alto = this.coordenadas[1] + this.alto;
        this.grd = this.ctx.createLinearGradient(this.coordenadas[0],this.coordenadas[1],ancho,alto);
        super.setGradiente(color);
    }

    cargarImagen() {
        let image = new Image();
        image.src = this.getImagenRandom().src;
        image.onload = ()=>{
            this.ctx.drawImage(image,this.coordenadas[0],this.coordenadas[1],this.ancho,this.alto);
        }
    }
}

export default Rectangulo;