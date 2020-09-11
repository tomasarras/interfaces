import { RED,GREEN,BLUE } from "../helper/constantes.js";
import Filtro from "../filtros/Filtro.js";

class BlancoNegro extends Filtro {

    procesarColor(coordenadaActual,imageData,color) {
        let gris = (color[RED] + color[GREEN] + color[BLUE]) / 3;
        color[RED] = color[GREEN] = color[BLUE] = gris;
        
        return color;
    }

    setIntensidad() {
        this.tieneIntensidad = false;
    }
}

export default BlancoNegro;