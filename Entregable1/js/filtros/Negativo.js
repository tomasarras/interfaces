import Canvas from "../helper/Canvas.js";
import { RED,GREEN,BLUE } from "../helper/constantes.js";
import Filtro from "../filtros/Filtro.js";

class Negativo extends Filtro {
    
    iteracion(coordenadaActual,imageData,intensidad) {
        let color = Canvas.getPixelColor(coordenadaActual,imageData);
        color[RED] = 255 - color[RED];
        color[GREEN] = 255 - color[GREEN];
        color[BLUE] = 255 - color[BLUE];
        return color;
    }
}

export default Negativo;