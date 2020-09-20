import Circulo from "./Circulo.js";

class CirculoImagen extends Circulo{
    img;

    constructor(radio,coordenadas,ctx,colorHex,img) {
        super(radio,coordenadas,ctx,colorHex);
        this.img = new Image();
        this.img.src = img.src;
    }

    draw() {
        this.img.onload = this.reDibujar.bind(this);
    }
    
    reDibujar() {
        let canvas = document.querySelector("#js-canvas");
        let ctx = canvas.getContext("2d");
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.coordenadas[0], this.coordenadas[1], this.radio, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        
        ctx.drawImage(this.img, this.coordenadas[0] - this.radio, this.coordenadas[1] - this.radio, this.radio*2, this.radio*2);
    
        ctx.beginPath();
        ctx.arc(this.coordenadas[0] - this.radio, this.coordenadas[1] - this.radio, this.radio, 0, Math.PI * 2, true);
        ctx.clip();
        ctx.closePath();
        ctx.restore();
    }
}

export default CirculoImagen;