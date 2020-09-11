import { RED,GREEN,BLUE, COLOR_BLANCO, COLOR_NEGRO } from "../helper/constantes.js";
import Filtro from "../filtros/Filtro.js";

class Azul extends Filtro {
    procesarColor(coordenadaActual,imageData,color) {
        color[BLUE] = 255;
        return color;
    }
}

export default Azul;