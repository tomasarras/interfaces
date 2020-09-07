import Herramienta from "./Herramienta.js"
import * as constants from "../helper/constantes.js";
import Rectangulo from "../figuras/Rectangulo.js";

class Goma extends Herramienta {
    ultimasCoordenadas;
    canvas = document.querySelector("#js-canvas");
    ctx = this.canvas.getContext("2d");

    setBackgroundColor(color) {
        this.colorHerramienta = color;
    }

    mouseDown(event) {
        this.ultimasCoordenadas = new Array();
        let X = constants.X;
        let Y = constants.Y;
        this.ultimasCoordenadas[X] = event.layerX;
        this.ultimasCoordenadas[Y] = event.layerY;

        this.grosor = this.getGrosor();
        let rectangulo = new Rectangulo();
        let imageData = rectangulo.dibujar(this.ultimasCoordenadas,this.grosor,this.grosor,this.colorHerramienta);
        this.ctx.putImageData(imageData,0,0);

        let handler = (event) => this.mouseMove(event);

        this.canvas.addEventListener("mousemove", handler);
        this.canvas.addEventListener("mouseup", ()=>{
            this.canvas.removeEventListener("mousemove",handler);
        });
    }

    mouseMove(event){
        let X = constants.X;
        let Y = constants.Y;
        let nuevasCoordenadas = new Array();
        nuevasCoordenadas[X] = event.layerX;
        nuevasCoordenadas[Y] = event.layerY;
        let imageData;
        let rectangulo = new Rectangulo();

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

            imageData = rectangulo.dibujar(this.ultimasCoordenadas,this.grosor,this.grosor,this.colorHerramienta);
            this.ctx.putImageData(imageData,0,0);
        }
    }

    click() {}

}

export default Goma;