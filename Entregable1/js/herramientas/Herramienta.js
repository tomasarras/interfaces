import * as constants from "../helper/constantes.js";

class Herramienta {
    colorHerramienta;
    width;
    height;
    grosor;

    constructor() {
        this.width = this.getWidth();
        this.height = this.getHeight();
        this.grosor = this.getGrosor();
        this.colorHerramienta = constants.COLOR_NEGRO;
    }

    getWidth() {
        let canvas = document.querySelector("#js-canvas");
        return parseInt(canvas.width);
    }

    getHeight() {
        let canvas = document.querySelector("#js-canvas");
        return parseInt(canvas.height);
    }

    setColor(color) {
        this.colorHerramienta = color;
    }

    setPixel(imageData,coordenadas,color) {
        let index = (coordenadas[constants.X] + coordenadas[constants.Y] * imageData.width) * 4;
        imageData.data[index+0] = color[constants.RED];
        imageData.data[index+1] = color[constants.GREEN];
        imageData.data[index+2] = color[constants.BLUE];
        imageData.data[index+3] = color[constants.ALPHA];
    }

    getGrosor() {
        let inputRange = document.querySelector("#js-grosor");
        this.grosor = parseInt(inputRange.value);
        return this.grosor;
    }

    setGrosor(grosor) {
        this.grosor = grosor;
    }

}

export default Herramienta;