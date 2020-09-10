import Canvas from "../helper/Canvas.js";
import { RED,GREEN,BLUE, COLOR_BLANCO, COLOR_NEGRO } from "../helper/constantes.js";
import Filtro from "../filtros/Filtro.js";

class Saturacion extends Filtro {
    procesarColor(coordenadaActual,imageData,color) {
        let hsl = Filtro.rgbToHsl(color[RED],color[GREEN],color[BLUE]);
        let saturacion = hsl[1];
        saturacion = saturacion * (this.intensidad / 100);
        let rgb = Filtro.hslToRgb(hsl[0],saturacion,hsl[2]);
        color[RED] = rgb[RED];
        color[GREEN] = rgb[GREEN];
        color[BLUE] = rgb[BLUE];

        return color;
    }
}

export default Saturacion;