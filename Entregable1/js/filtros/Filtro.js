import { COLOR_NEGRO, X, Y } from "../helper/constantes.js";
import Canvas from "../helper/Canvas.js";

class Filtro {
    intensidad;
    imageDataOriginal;

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
        this.aplicar();
    }

    aplicar() {
        let coordenadas = new Array();
        coordenadas[X] = 0;
        coordenadas[Y] = 0;
        let color;
        let imageData = Canvas.getCopyImageData(this.imageDataOriginal);

        while (coordenadas[X] < imageData.width) {
            coordenadas[Y] = 0;
            while (coordenadas[Y] < imageData.height) {
                color = Canvas.getPixelColor(coordenadas,imageData);
                color = this.procesarColor(coordenadas,imageData,color);
                Canvas.setPixel(imageData,coordenadas,color);
                coordenadas[Y]++;
            }
            coordenadas[X]++;
        }
        Canvas.putImageData(imageData);
    }

    procesarColor(coordenadas,imageData) { }

    static rgbToHsl(red, green, blue) {
        let h,s,l;

        red = red / 255;
        green = green / 255;
        blue = blue / 255;
        let min = Math.min(red,green,blue);
        let max = Math.max(red,green,blue);
        l = (min + max) / 2;
        if (min == max) {
            h = 0;
            s = 0;
        } else {
            if (l < 0.5) {
                s = (max - min) / (max + min);
            } else {
                s = (max - min) / (2.0 - max - min);
            }
            s = s * 100;
            
            if (max == red) {
                h = (green - blue) / (max - min);
            } else if (max == green) {
                h = 2.0 + (green - red) / (max - min);
            } else {
                h = 4.0 + (red - green) / (max - min);
            }

            h = h * 60;

            if (h < 0) {
                h += 360;
            }
        }
        l = l * 100;

        return [h,s,l];
    }

    static hslToRgb(h,s,l) {
        let r,g,b,calculo1,calculo2,tRed,tGreen,tBlue;
        s = s / 100;
        l = l / 100;
        if (s == 0) {
            l = l / 100;
            l = l * 255;

            r = g = b = l;
        } else {
            if (l < 0.5) {
                calculo1 = l * (1.0 + s);
            } else {
                calculo1 = l + s - l * s;
            }
            calculo2 = 2 * l - calculo1;

            h = h / 360;
            tRed = h + 0.333;
            tGreen = h;
            tBlue = h - 0.333;

            if (tRed > 1) tRed--;
            if (tRed < 0) tRed++;
            if (tGreen > 1) tGreen--;
            if (tGreen < 0) tGreen++;
            if (tBlue > 1) tBlue--;
            if (tBlue < 0) tBlue++;

            let formula = temporal => {
                if (6 * temporal < 1) {
                    return calculo2 + (calculo1 - calculo2) * 6 * temporal;
                } else if (2 * temporal < 1) {
                    return calculo1;
                } else if (3 * temporal < 2) {
                    return calculo2 + (calculo1 - calculo2) * (0.666 - temporal) * 6;
                } else {
                    return calculo2;
                }
            }

            r = formula(tRed);
            g = formula(tGreen);
            b = formula(tBlue);
        }

        return [r * 255, g * 255, b * 255];
    }
}

export default Filtro;