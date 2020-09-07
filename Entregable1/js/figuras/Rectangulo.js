import * as constants from "../helper/constantes.js";
import Herramienta from "../herramientas/Herramienta.js";

class Rectangulo extends Herramienta {

    dibujarBorde(coordenadas,width,height,color) {
        let canvas = document.querySelector("#js-canvas");
        let ctx = canvas.getContext("2d");
        let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        let xInicial = coordenadas[constants.X] - Math.floor(width / 2);
        let yInicial = coordenadas[constants.Y] - Math.floor(height / 2);
        let y = yInicial;
        let x = xInicial;
        let coordenadaActual = new Array();

        for (let i = 0; i < width; i++) {
            coordenadaActual = [x,y];
            this.setPixel(imageData,coordenadaActual,color);
            x++;
        }
        x--;
        
        for (let j = 0; j < height; j++) {
            coordenadaActual = [x,y];
            this.setPixel(imageData,coordenadaActual,color);
            y--;
        }

        y = yInicial;
        x = xInicial;

        for (let j = 0; j < height; j++) {
            coordenadaActual = [x,y];
            this.setPixel(imageData,coordenadaActual,color);
            y--;
        }

        for (let i = 0; i < width; i++) {
            coordenadaActual = [x,y];
            this.setPixel(imageData,coordenadaActual,color);
            x++;
        }

        return imageData;
    }

    dibujar(coordenadas,width,height,color) {
        let canvas = document.querySelector("#js-canvas");
        let ctx = canvas.getContext("2d");
        let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        let xInicial = coordenadas[constants.X] - Math.floor(width / 2);
        let yInicial = coordenadas[constants.Y] - Math.floor(height / 2);
        let y = yInicial;
        let x = xInicial;
        let coordenadaActual = new Array();

        for (let i = 0; i < width; i++) {
            y = yInicial;
            for (let j = 0; j < height; j++) {
                coordenadaActual = [x,y];
                y++;
                this.setPixel(imageData,coordenadaActual,color);
            }
            x++;
        }

        return imageData;
    }
}

export default Rectangulo;