import { X,Y } from "../helper/constantes.js";
import Canvas from "../helper/Canvas.js";

class Rectangulo {

    static dibujarBorde(coordenadas,width,height,color,imageData) {
        let xInicial = coordenadas[X] - Math.floor(width / 2);
        let yInicial = coordenadas[Y] - Math.floor(height / 2);
        let coordenadaActual = new Array();
        coordenadaActual = [xInicial,yInicial];
        this.rectaEjeX(coordenadaActual,width,imageData,color);
        this.rectaEjeY(coordenadaActual,height,imageData,color);
        coordenadaActual = [xInicial,yInicial];
        this.rectaEjeY(coordenadaActual,height,imageData,color);
        this.rectaEjeX(coordenadaActual,width,imageData,color);
    }

    static rectaEjeX(coordenadas,cantidadPixeles,imageData,color) {
        for (let i = 0; i < cantidadPixeles; i++) {
            Canvas.setPixel(imageData,coordenadas,color);
            coordenadas[X]++;
        }
    }

    static rectaEjeY(coordenadas,cantidadPixeles,imageData,color) {
        for (let j = 0; j < cantidadPixeles; j++) {
            Canvas.setPixel(imageData,coordenadas,color);
            coordenadas[Y]++;
        }
    }

    static dibujar(coordenadas,width,height,color,imageData) {
        let xInicial = coordenadas[X] - Math.floor(width / 2);
        let yInicial = coordenadas[Y] - Math.floor(height / 2);
        let y = yInicial;
        let x = xInicial;
        let coordenadaActual = new Array();

        for (let i = 0; i <= width; i++) {
            y = yInicial;
            for (let j = 0; j <= height; j++) {
                coordenadaActual = [x,y];
                y++;
                Canvas.setPixel(imageData,coordenadaActual,color);
            }
            x++;
        }
    }
}

export default Rectangulo;