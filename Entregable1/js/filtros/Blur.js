import Canvas from "../helper/Canvas.js";
import { RED, GREEN, BLUE, X, Y } from "../helper/constantes.js";
import Filtro from "../filtros/Filtro.js";
const INTENSIDAD_SUAVE = 1;
const INTENSIDAD_MEDIA = 2;
const INTENSIDAD_FUERTE = 3;
const INTENSIDAD_MUY_FUERTE = 4;

class Blur extends Filtro {
    procesarColor(coordenada,imageData,color) {
        let cantidadPixeles = 0;
        let tipoIntensidad = INTENSIDAD_MEDIA;
        let pixel;
        let sumatoriaRed = 0;
        let sumatoriaGreen = 0;
        let sumatoriaBlue = 0;
        let coordenadaActual = new Array();
        coordenadaActual[X] = coordenada[X] - tipoIntensidad;
        coordenadaActual[Y] = coordenada[Y] - tipoIntensidad;

        for (let i = 0; i < 3 * tipoIntensidad; i++) {
            coordenadaActual[X] = coordenada[X] -1;
            for (let j = 0; j < 3 * tipoIntensidad; j++) {
                pixel = Canvas.getPixelColor(coordenadaActual, imageData);
                if (pixel[RED] != undefined) {
                    sumatoriaRed = sumatoriaRed + pixel[RED];
                    sumatoriaGreen = sumatoriaGreen + pixel[GREEN];
                    sumatoriaBlue = sumatoriaBlue + pixel[BLUE];
                    cantidadPixeles++;
                }
                coordenadaActual[X]++;
            }
            coordenadaActual[Y]++;
        }

        color[RED] = sumatoriaRed / cantidadPixeles;
        color[GREEN] = sumatoriaGreen / cantidadPixeles;
        color[BLUE] = sumatoriaBlue / cantidadPixeles;
        
        return color;
    }

    setIntensidad() {
        this.tieneIntensidad = false;
    }
}

export default Blur;