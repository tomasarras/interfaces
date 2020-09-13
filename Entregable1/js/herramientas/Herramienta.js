import { COLOR_NEGRO,X,Y } from "../helper/constantes.js";
import Canvas from "../helper/Canvas.js";

class Herramienta {
    color;
    width;
    height;
    grosor;
    imageData;

    constructor() {
        this.grosor = this.getGrosor();
        this.color = COLOR_NEGRO;
    }

    setColor(color) {
        this.color = color;
    }

    algoritmo(event) {
        this.imageData = Canvas.getImageData();
        let nuevasCoordenadas = new Array();
        nuevasCoordenadas[X] = event.layerX;
        nuevasCoordenadas[Y] = event.layerY;
        
        this.dibujar(this.imageData,this.ultimasCoordenadas,this.color);
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

            this.dibujar(this.imageData,this.ultimasCoordenadas,this.color);
        }
        Canvas.putImageData(this.imageData);
    }

    dibujar(imageData,coordenadas,color) { }

    getGrosor() {
        let inputRange = document.querySelector("#js-grosor");
        this.grosor = parseInt(inputRange.value);
        return this.grosor;
    }

    setGrosor(grosor) {
        this.grosor = grosor;
    }

}

export default Herramienta;