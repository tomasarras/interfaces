import Rectangulo from "./Rectangulo.js";

class RectanguloImagen extends Rectangulo{
    img;

    constructor(ancho,alto,coordenadas,ctx,colorHex,img) {
        super(ancho,alto,coordenadas,ctx,colorHex);
        this.img = new Image();
        this.img.src = img.src;
    }

    
    draw() {
        this.img.onload = this.reDibujar.bind(this);
    }

    reDibujar() {
        this.ctx.drawImage(this.img,this.coordenadas[0],this.coordenadas[1],this.ancho,this.alto);
    }

}

export default RectanguloImagen;