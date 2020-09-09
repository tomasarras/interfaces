import { COLOR_NEGRO, X, Y } from "../helper/constantes.js";
import Canvas from "../helper/Canvas.js";

class Filtro {
    intensidad;

    constructor() {
        let inputIntensidad = document.querySelector("#js-intensidad");
        this.intensidad = parseInt(inputIntensidad.value);
    }

    update() {
        let inputIntensidad = document.querySelector("#js-intensidad");
        this.intensidad = parseInt(inputIntensidad.value);
        this.aplicar(this.iteracion);
    }

    aplicarFiltro() {
        let inputIntensidad = document.querySelector("#js-intensidad");
        this.intensidad = parseInt(inputIntensidad.value);
        this.imageDataOriginal = Canvas.getImageData();
        this.aplicar(this.iteracion);
    }

    aplicar(callbackAlgoritmo) {
        let coordenadas = new Array();
        coordenadas[X] = 0;
        coordenadas[Y] = 0;
        let color;
        let imageData = Canvas.getCopyImageData(this.imageDataOriginal);

        while (coordenadas[X] < imageData.width) {
            coordenadas[Y] = 0;
            while (coordenadas[Y] < imageData.height) {
                color = callbackAlgoritmo(coordenadas,imageData,this.intensidad);
                Canvas.setPixel(imageData,coordenadas,color);
                coordenadas[Y]++;
            }
            coordenadas[X]++;
        }
        Canvas.putImageData(imageData);
    }

    iteracion(coordenadas,imageData) {
        return COLOR_NEGRO;
    }
}

export default Filtro;