import Figura from "./Figura.js";

class Circulo extends Figura{
    radio;

    constructor(radio,coordenadas,ctx,colorHex) {
        super(coordenadas,ctx,colorHex);
        this.radio = radio;
    }

    draw() {
        super.draw();
        if (this.tieneImg) {
            this.cargarImagen();
        } else {
            this.ctx.beginPath();
            this.ctx.arc(this.coordenadas[0],this.coordenadas[1],this.radio,0,2 * Math.PI);
            this.ctx.fill();
            this.ctx.closePath();
        }
    }

    setGradiente(color) {
        let inicioX = this.coordenadas[0] - this.radio;
        let inicioY = this.coordenadas[1] - this.radio;
        let finX = this.coordenadas[1] + this.radio;
        let finY = this.coordenadas[1] + this.radio;
        this.grd = this.ctx.createLinearGradient(inicioX,inicioY,finX,finY);
        super.setGradiente(color);
    }

    cargarImagen() {
        let img = new Image();
        img.src = this.getImagenRandom().src;
        img.onload = ()=>{
            let canvas = document.querySelector("#js-canvas");
            let tmpCtx = canvas.getContext("2d");
            tmpCtx.save();
            tmpCtx.beginPath();
            tmpCtx.arc(this.coordenadas[0], this.coordenadas[1], this.radio, 0, Math.PI * 2, true);
            tmpCtx.closePath();
            tmpCtx.clip();
            
            tmpCtx.drawImage(img, this.coordenadas[0] - this.radio, this.coordenadas[1] - this.radio, this.radio*2, this.radio*2);

        };
        
    }

}

export default Circulo;