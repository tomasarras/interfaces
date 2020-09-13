import Herramienta from "./Herramienta.js"
import { X, Y, COLOR_BLANCO, COLOR_NEGRO } from "../helper/constantes.js";
import Rectangulo from "../figuras/Rectangulo.js";
import Canvas from "../helper/Canvas.js";

class Goma extends Herramienta {
    ultimasCoordenadas;
    mantenerClick = false;
    imageDataOld;
    imageData;
    mouseOverBind;
    mouseEnterBind;
    mouseDownBind;
    mouseUpBind;
    mouseLeaveBind;

    activar() {
        let inputGrosor = document.querySelector("#js-grosor");
        inputGrosor.disabled = false;
        inputGrosor.enabled = true;
        this.color = COLOR_BLANCO;
        let canvas = Canvas.getCanvas();
        this.ultimasCoordenadas = new Array();
        this.imageDataOld = Canvas.getImageData();
        this.imageData = Canvas.getImageData();

        this.mouseOverBind = this.mouseOver.bind(this);
        this.mouseEnterBind = this.mouseEnter.bind(this);
        this.mouseDownBind = this.mouseDown.bind(this);
        this.mouseUpBind = this.mouseUp.bind(this);
        this.mouseLeaveBind = this.mouseLeave.bind(this);

        canvas.addEventListener("mousemove", this.mouseOverBind);
        canvas.addEventListener("mouseenter", this.mouseEnterBind);
        canvas.addEventListener("mousedown", this.mouseDownBind);
        canvas.addEventListener("mouseup", this.mouseUpBind);
        canvas.addEventListener("mouseleave", this.mouseLeaveBind)
    }
    
    desactivar() {
        let canvas = Canvas.getCanvas();
        canvas.removeEventListener("mousemove", this.mouseOverBind);
        canvas.removeEventListener("mouseenter", this.mouseEnterBind);
        canvas.removeEventListener("mousedown", this.mouseDownBind);
        canvas.removeEventListener("mouseup", this.mouseUpBind);
        canvas.removeEventListener("mouseleave", this.mouseLeaveBind)
    }

    mouseOver(event) {
        if (this.mantenerClick){
            this.algoritmo(event);
        } else {
            this.mostrarPuntero(event);
        }
    }

    mouseEnter() {
        this.imageData = Canvas.getImageData();
        this.imageDataOld = Canvas.getImageData();
    }

    mostrarPuntero(event) {
        Canvas.putImageData(this.imageDataOld);
        this.imageData = Canvas.getImageData();
        let coordenadas = new Array();
        coordenadas[X] = event.layerX;
        coordenadas[Y] = event.layerY;
        Rectangulo.dibujar(coordenadas,this.grosor,this.grosor,this.color,this.imageData);
        Rectangulo.dibujarBorde(coordenadas,this.grosor,this.grosor,COLOR_NEGRO,this.imageData);
        Canvas.putImageData(this.imageData);
    }

    dibujar(imageData,coordenadas,color) {
        Rectangulo.dibujar(coordenadas,this.grosor,this.grosor,color,imageData);
    }

    mouseDown(event) {
        this.ultimasCoordenadas[X] = event.layerX;
        this.ultimasCoordenadas[Y] = event.layerY;
        this.mantenerClick = true;
        this.algoritmo(event);
    }
    
    mouseUp(event) {
        this.mantenerClick = false;
        this.imageDataOld = Canvas.getImageData();
        this.mostrarPuntero(event);
    }
    
    mouseLeave(event) {
        if (this.mantenerClick) {
            this.algoritmo(event);
        } else {
            Canvas.putImageData(this.imageDataOld);
        }
        
        //Canvas.putImageData(this.imageData);
        /*this.imageData = Canvas.getImageData();
        this.imageDataOld = Canvas.getImageData();*/
    }
}

export default Goma;