import Canvas from "../helper/Canvas.js";
import { RED, GREEN, BLUE } from "../helper/constantes.js";
import Filtro from "../filtros/Filtro.js";

class Brillo extends Filtro {
    procesarColor(coordenadaActual,imageData,color) {
        color[RED] = color[RED] + this.intensidad;
        color[GREEN] = color[GREEN] + this.intensidad;
        color[BLUE] = color[BLUE] + this.intensidad;

        return color;
    }
}

export default Brillo;