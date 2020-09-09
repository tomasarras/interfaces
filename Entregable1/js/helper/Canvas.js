import { X,Y,RED,GREEN,BLUE,ALPHA } from "../helper/constantes.js";

class Canvas {
    static canvas;
    static ctx;
    static width;
    static height;

    static updateCanvas() {
        this.canvas = document.querySelector("#js-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    static getWidth() {
        return this.width;
    }

    static getHeight() {
        return this.height;
    }

    static getCanvas() {
        return this.canvas;
    }

    static getCtx() {
        return this.ctx;
    }

    static getImageData() {
        return this.ctx.getImageData(0,0,this.width,this.height);
    }

    static putImageData(imageData) {
        this.ctx.putImageData(imageData,0,0);
    }

    static setPixel(imageData,coordenadas,color) {
        if (coordenadas[X] < this.width && coordenadas[X] > 0) {
            let index = (coordenadas[X] + coordenadas[Y] * imageData.width) * 4;
            imageData.data[index+RED] = color[RED];
            imageData.data[index+GREEN] = color[GREEN];
            imageData.data[index+BLUE] = color[BLUE];
            imageData.data[index+ALPHA] = color[ALPHA];
        }
    }
}

export default Canvas;