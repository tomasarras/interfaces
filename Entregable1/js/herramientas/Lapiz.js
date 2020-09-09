import Herramienta from "./Herramienta.js"
import { X,Y } from "../helper/constantes.js";
import Canvas from "../helper/Canvas.js";

class Lapiz extends Herramienta {
    ultimasCoordenadas;
    static instance = new Lapiz();

    static getInstance() {
        return this.instance;
    }
    
    activar() {
        this.ultimasCoordenadas = new Array();
        Canvas.getCanvas().addEventListener("mousedown", this.mouseDown);
    }

    desactivar() {
        Canvas.getCanvas().removeEventListener("mousedown", this.mouseDown);
    }

    getUltimasCoordenadas() {
        return this.ultimasCoordenadas;
    }

    mouseDown(event){
        let canvas = Canvas.getCanvas();
        let ctx = Canvas.getCtx();
        let lapiz = Lapiz.getInstance();
        lapiz.ultimasCoordenadas[X] = event.layerX;
        lapiz.ultimasCoordenadas[Y] = event.layerY;
        let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        Canvas.setPixel(imageData,lapiz.ultimasCoordenadas,lapiz.color);
        ctx.putImageData(imageData,0,0);

        let handlerMove = (event) => lapiz.mouseMove(event);

        canvas.addEventListener("mousemove", handlerMove);
        canvas.addEventListener("mouseup", ()=>{
            canvas.removeEventListener("mousemove", handlerMove);
        });
    }

    mouseMove(event){
        let imageData = Canvas.getImageData();
        let lapiz = Lapiz.getInstance();
        let uCoordenadas = lapiz.getUltimasCoordenadas();
        let nuevasCoordenadas = new Array();
        nuevasCoordenadas[X] = event.layerX;
        nuevasCoordenadas[Y] = event.layerY;
        
        Canvas.setPixel(imageData,uCoordenadas,lapiz.color);
        while (nuevasCoordenadas[X] != uCoordenadas[X] || nuevasCoordenadas[Y] != uCoordenadas[Y]) {
            if (nuevasCoordenadas[X] > uCoordenadas[X]) {
                uCoordenadas[X]++;
            } else if (nuevasCoordenadas[X] < uCoordenadas[X]) {
                uCoordenadas[X]--;
            }
            
            if (nuevasCoordenadas[Y] > uCoordenadas[Y]) {
                uCoordenadas[Y]++;
            } else if (nuevasCoordenadas[Y] < uCoordenadas[Y]) {
                uCoordenadas[Y]--;
            }

            Canvas.setPixel(imageData,uCoordenadas,lapiz.color);
        }
        Canvas.putImageData(imageData);
    }
}

export default Lapiz;