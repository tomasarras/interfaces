import Herramienta from "./Herramienta.js"
import { X, Y, COLOR_BLANCO, COLOR_NEGRO } from "../helper/constantes.js";
import Rectangulo from "../figuras/Rectangulo.js";
import Canvas from "../helper/Canvas.js";

class Goma extends Herramienta {
    ultimasCoordenadas;
    mantenerClick = false;
    imageDataOld;
    imageData;
    static instance = new Goma();

    static getInstance() {
        return this.instance;
    }

    activar() {
        this.color = COLOR_BLANCO;
        let canvas = Canvas.getCanvas();
        this.ultimasCoordenadas = new Array();
        this.imageDataOld = Canvas.getImageData();
        this.imageData = Canvas.getImageData();

        canvas.addEventListener("mousemove", this.mouseOver);
        canvas.addEventListener("mouseenter", this.mouseEnter);
        canvas.addEventListener("mousedown", this.mouseDown);
        canvas.addEventListener("mouseup", this.mouseUp);
        canvas.addEventListener("mouseleave", this.mouseLeave)
    }
    
    desactivar() {
        let canvas = Canvas.getCanvas();
        canvas.removeEventListener("mousemove", this.mouseOver);
        canvas.removeEventListener("mousedown", this.mouseDown);
        canvas.removeEventListener("mouseup", this.mouseUp);
        canvas.removeEventListener("mouseleave", this.mouseLeave)
    }

    mouseOver(event) {
        let goma = Goma.getInstance();

        if (goma.mantenerClick){
            goma.borrar(event);
        } else {
            goma.mostrarPuntero(event);
        }
    }

    mouseEnter() {
        let goma = Goma.getInstance();
        goma.imageData = Canvas.getImageData();
        goma.imageDataOld = Canvas.getImageData();
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

    borrar(event){
        let g = Goma.getInstance();
        let nuevasCoordenadas = new Array();
        nuevasCoordenadas[X] = event.layerX;
        nuevasCoordenadas[Y] = event.layerY;
        let imageData = Canvas.getImageData();
        
        Rectangulo.dibujar(g.ultimasCoordenadas,g.grosor,g.grosor,g.color,imageData);
        while (nuevasCoordenadas[X] != g.ultimasCoordenadas[X] || nuevasCoordenadas[Y] != g.ultimasCoordenadas[Y]) {
            if (nuevasCoordenadas[X] > g.ultimasCoordenadas[X]) {
                g.ultimasCoordenadas[X]++;
            } else if (nuevasCoordenadas[X] < g.ultimasCoordenadas[X]) {
                g.ultimasCoordenadas[X]--;
            }
            
            if (nuevasCoordenadas[Y] > g.ultimasCoordenadas[Y]) {
                g.ultimasCoordenadas[Y]++;
            } else if (nuevasCoordenadas[Y] < g.ultimasCoordenadas[Y]) {
                g.ultimasCoordenadas[Y]--;
            }
            
            Rectangulo.dibujar(g.ultimasCoordenadas,g.grosor,g.grosor,g.color,imageData);
        }
        Canvas.putImageData(imageData);
    }

    mouseDown(event) {
        let goma = Goma.getInstance();

        goma.ultimasCoordenadas[X] = event.layerX;
        goma.ultimasCoordenadas[Y] = event.layerY;
        goma.mantenerClick = true;
        goma.borrar(event);
    }
    
    mouseUp(event) {
        let goma = Goma.getInstance();
        goma.mantenerClick = false;
        goma.imageDataOld = Canvas.getImageData();
        goma.mostrarPuntero(event);
    }
    
    mouseLeave() {
        let goma = Goma.getInstance();
        Canvas.putImageData(goma.imageDataOld);
        goma.imageData = Canvas.getImageData();
        goma.imageDataOld = Canvas.getImageData();
    }
}

export default Goma;