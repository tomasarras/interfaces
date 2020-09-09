import Canvas from "../helper/Canvas.js";
import { RED,GREEN,BLUE, COLOR_BLANCO, COLOR_NEGRO } from "../helper/constantes.js";
import Filtro from "../filtros/Filtro.js";

class Binarizacion extends Filtro {
    iteracion(coordenadaActual,imageData,intensidad) {
        let color = Canvas.getPixelColor(coordenadaActual,imageData);
        let gris = (color[RED] + color[GREEN] + color[BLUE]) / 3;

        if (gris < intensidad) {
            color = COLOR_NEGRO;
        } else {
            color = COLOR_BLANCO;
        }

        return color;
    }
}

export default Binarizacion;