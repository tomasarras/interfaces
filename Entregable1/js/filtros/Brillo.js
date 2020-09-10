import Canvas from "../helper/Canvas.js";
import { RED, GREEN, BLUE } from "../helper/constantes.js";
import Filtro from "../filtros/Filtro.js";

class Brillo extends Filtro {
    iteracion(coordenadaActual,imageData,intensidad) {
        let color = Canvas.getPixelColor(coordenadaActual,imageData);
        color[RED] = color[RED] + intensidad;
        color[GREEN] = color[GREEN] + intensidad;
        color[BLUE] = color[BLUE] + intensidad;

        return color;
    }
}

export default Brillo;