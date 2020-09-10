import { X,Y,RED,GREEN,BLUE,ALPHA,COLOR_BLANCO_HEX } from "../helper/constantes.js";

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
        if (coordenadas[X] < this.width && coordenadas[X] >= 0
            && coordenadas[Y] < this.height && coordenadas[Y] >= 0) {
            let index = (coordenadas[X] + coordenadas[Y] * imageData.width) * 4;
            imageData.data[index+RED] = color[RED];
            imageData.data[index+GREEN] = color[GREEN];
            imageData.data[index+BLUE] = color[BLUE];
            imageData.data[index+ALPHA] = color[ALPHA];
        }
    }

    static getCopyImageData(originalImageData) {
        let imageDataCopy = new ImageData(
            new Uint8ClampedArray(originalImageData.data),
            originalImageData.width,
            originalImageData.height
          );

        return imageDataCopy;
    }

    static getPixelColor(coordenadas,imageData) {
        
        let index = (coordenadas[X] + coordenadas[Y] * imageData.width) * 4;
        let color = new Array();
        color[RED] = imageData.data[index+RED];
        color[GREEN] = imageData.data[index+GREEN];
        color[BLUE] = imageData.data[index+BLUE];
        color[ALPHA] = imageData.data[index+ALPHA];
        return color;
    }

    static lienzoBlanco() {
        this.ctx.fillStyle = COLOR_BLANCO_HEX;  
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
}

export default Canvas;