import Canvas from "../helper/Canvas.js";
import { RED,GREEN,BLUE } from "../helper/constantes.js";
import Filtro from "../filtros/Filtro.js";

class BlancoNegro extends Filtro {

    iteracion(coordenadaActual,imageData,intensidad) {
        let color = Canvas.getPixelColor(coordenadaActual,imageData);
        let gris = (color[RED] + color[GREEN] + color[BLUE]) / 3;
        color[RED] = color[GREEN] = color[BLUE] = gris;
        
        return color;
    }
}

export default BlancoNegro;