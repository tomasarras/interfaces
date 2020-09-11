import Herramienta from "./Herramienta.js"
import { X,Y } from "../helper/constantes.js";
import Canvas from "../helper/Canvas.js";

class Lapiz extends Herramienta {
    ultimasCoordenadas;
    mouseDownBind;
    
    activar() {
        this.mouseDownBind = this.mouseDown.bind(this);
        this.ultimasCoordenadas = new Array();
        Canvas.getCanvas().addEventListener("mousedown", this.mouseDownBind);
        let inputGrosor = document.querySelector("#js-grosor");
        inputGrosor.disabled = true;
        inputGrosor.enabled = false;
    }

    desactivar() {
        Canvas.getCanvas().removeEventListener("mousedown", this.mouseDownBind);
    }

    mouseDown(event){
        let canvas = Canvas.getCanvas();
        let ctx = Canvas.getCtx();
        this.ultimasCoordenadas[X] = event.layerX;
        this.ultimasCoordenadas[Y] = event.layerY;
        let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        Canvas.setPixel(imageData,this.ultimasCoordenadas,this.color);
        ctx.putImageData(imageData,0,0);

        let handlerMove = (event) => this.algoritmo(event);
        handlerMove = handlerMove.bind(this)

        canvas.addEventListener("mousemove", handlerMove);
        canvas.addEventListener("mouseup", ()=>{
            canvas.removeEventListener("mousemove", handlerMove);
        });
    }

    dibujar(imageData,coordenadas,color) {
        Canvas.setPixel(imageData,coordenadas,color);
    }
}

export default Lapiz;