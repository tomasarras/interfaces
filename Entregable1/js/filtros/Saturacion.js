import { RED,GREEN,BLUE } from "../helper/constantes.js";
import Filtro from "../filtros/Filtro.js";

class Saturacion extends Filtro {
    procesarColor(coordenadaActual,imageData,color) {
        let hsl = this.rgbToHsl(color[RED],color[GREEN],color[BLUE]);
        let saturacion = hsl[1];
        saturacion = saturacion * this.intensidad;
        let rgb = this.hslToRgb(hsl[0],saturacion,hsl[2]);
        color[RED] = rgb[RED];
        color[GREEN] = rgb[GREEN];
        color[BLUE] = rgb[BLUE];

        return color;
    }

    setIntensidad() {
        this.intensidad = this.intensidad / 100;
        this.tieneIntensidad = true;
    }
}

export default Saturacion;