import { RED,GREEN,BLUE } from "../helper/constantes.js";
import Filtro from "../filtros/Filtro.js";

class Luminosidad extends Filtro {

    procesarColor(coordenadaActual,imageData,color) {
        let hsl = this.rgbToHsl(color[RED],color[GREEN],color[BLUE]);
        let luminosidad = hsl[2];
        luminosidad = luminosidad * this.intensidad;
        let rgb = this.hslToRgb(hsl[0],hsl[1],luminosidad);
        color[RED] = rgb[RED];
        color[GREEN] = rgb[GREEN];
        color[BLUE] = rgb[BLUE];

        return color;
    }

    setIntensidad() {
        this.tieneIntensidad = true;
        this.intensidad = this.intensidad / 100;
    }

}

export default Luminosidad;