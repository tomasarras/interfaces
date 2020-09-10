import Canvas from "../helper/Canvas.js";
import { RED, GREEN, BLUE } from "../helper/constantes.js";
import Filtro from "../filtros/Filtro.js";

class Sepia extends Filtro {
    iteracion(coordenadaActual, imageData,intensidad) {
        let color = Canvas.getPixelColor(coordenadaActual,imageData);
        color[RED] = (color[RED] * 0.393) + (color[GREEN] * 0.769) + (color[BLUE] * 0.189);
        color[GREEN] = (color[RED] * .349) + (color[GREEN] *.686) + (color[BLUE] * .168);
        color[BLUE] = (color[RED] * .272) + (color[GREEN] *.534) + (color[BLUE] * .131);

        return color;
    }
}

export default Sepia;