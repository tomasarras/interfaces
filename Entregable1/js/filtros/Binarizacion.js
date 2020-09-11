import { RED,GREEN,BLUE, COLOR_BLANCO, COLOR_NEGRO } from "../helper/constantes.js";
import Filtro from "../filtros/Filtro.js";

class Binarizacion extends Filtro {
    procesarColor(coordenadaActual,imageData,color) {
        let gris = (color[RED] + color[GREEN] + color[BLUE]) / 3;

        if (gris < this.intensidad) {
            color = COLOR_NEGRO;
        } else {
            color = COLOR_BLANCO;
        }

        return color;
    }

    setIntensidad() {
        this.tieneIntensidad = true;
    }
}

export default Binarizacion;