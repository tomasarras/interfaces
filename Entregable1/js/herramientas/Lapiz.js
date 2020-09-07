import Herramienta from "./Herramienta.js"
import * as constants from "../helper/constantes.js";

class Lapiz extends Herramienta {
    canvas = document.querySelector("#js-canvas");
    ctx = this.canvas.getContext("2d");
    ultimasCoordenadas;
    
    mouseDown(event){
        this.ultimasCoordenadas = new Array();
        let X = constants.X;
        let Y = constants.Y;
        this.ultimasCoordenadas[X] = event.layerX;
        this.ultimasCoordenadas[Y] = event.layerY;

        let imageData = this.ctx.getImageData(0,0,this.width,this.height);
        this.setPixel(imageData,this.ultimasCoordenadas,this.colorHerramienta);
        this.ctx.putImageData(imageData,0,0);

        let handler = (event) => this.mouseMove(event);

        this.canvas.addEventListener("mousemove", handler);
        this.canvas.addEventListener("mouseup", ()=>{
            this.canvas.removeEventListener("mousemove", handler);
        });
    }

    mouseMove(event){
        let imageData = this.ctx.getImageData(0,0,this.width,this.height);
        let X = constants.X;
        let Y = constants.Y;
        let nuevasCoordenadas = new Array();
        nuevasCoordenadas[X] = event.layerX;
        nuevasCoordenadas[Y] = event.layerY;

        while (nuevasCoordenadas[X] != this.ultimasCoordenadas[X] || nuevasCoordenadas[Y] != this.ultimasCoordenadas[Y]) {
            if (nuevasCoordenadas[X] > this.ultimasCoordenadas[X]) {
                this.ultimasCoordenadas[X]++;
            } else if (nuevasCoordenadas[X] < this.ultimasCoordenadas[X]) {
                this.ultimasCoordenadas[X]--;
            }
            
            if (nuevasCoordenadas[Y] > this.ultimasCoordenadas[Y]) {
                this.ultimasCoordenadas[Y]++;
            } else if (nuevasCoordenadas[Y] < this.ultimasCoordenadas[Y]) {
                this.ultimasCoordenadas[Y]--;
            }

            this.setPixel(imageData,this.ultimasCoordenadas,this.colorHerramienta);
        }
        this.ctx.putImageData(imageData,0,0);
    }

    click() {}
}

function pintarPixel(imageData) {
    this.setPixel(imageData,this.ultimasCoordenadas,this.colorHerramienta);
    this.ctx.putImageData(imageData,0,0);
}

export default Lapiz;