import Canvas from "../helper/Canvas.js";
import { RED, GREEN, BLUE, X, Y } from "../helper/constantes.js";
import Filtro from "./Filtro.js";
import BlancoNegro from "./BlancoNegro.js";

class Sobel extends Filtro {
    aplicar() {
        let blancoNegro = new BlancoNegro();
        blancoNegro.aplicarFiltro();
        let imageData = Canvas.getImageData();
        let Ghorizontal;
        let Gvertical;
        let kernelHorizontal = [[-1,0,1],[-2,0,2],[-1,0,1]];
        let kernelVertical = [[-1,-2,-1],[0,0,0],[1,2,1]];
        let magnitud;
        let color;
        let algortmo = (kernel,coordenada,imageData) => {
            let coordenadas = new Array();
            let grad = 0;
            coordenadas[X] = coordenada[X] -1;
            coordenadas[Y] = coordenada[Y] -1;
            let valor;

            for (let i = 0; i < 3; i++){
                for (let j = 0; j < 3; j++) {
                    valor = Canvas.getPixelColor(coordenadas,imageData)[RED];
                    grad = grad + (valor * kernel[i][j]);
                    coordenadas[X]++; 
                }
                coordenadas[X] = coordenadas[X] -3;
                coordenadas[Y]++;
            }

            return grad;
        }
        let coordenadaActual = new Array();///////////////////////

        for (let x = 1; x < Canvas.getWidth() -1; x++) {
            for (let y = 1; y < Canvas.getHeight() -1; y++){
                coordenadaActual[X] = x;
                coordenadaActual[Y] = y;
                color = Canvas.getPixelColor(coordenadaActual,imageData);
                Ghorizontal = algortmo(kernelHorizontal,[x,y],imageData);
                Gvertical = algortmo(kernelVertical,[x,y],imageData);
                
                Ghorizontal = Ghorizontal * Ghorizontal;
                Gvertical = Gvertical * Gvertical;
                magnitud = Math.sqrt(Gvertical + Ghorizontal);
                color[RED] = color[GREEN] = color[BLUE] = magnitud;
                coordenadaActual[X]--;
                coordenadaActual[Y]--;
                Canvas.setPixel(imageData,coordenadaActual,color);
            }
        }
        Canvas.putImageData(imageData);
    }

    setIntensidad() {
        this.tieneIntensidad = false;
    }
}
export default Sobel;