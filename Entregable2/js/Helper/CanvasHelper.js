import { X, Y } from "../constantes.js";

class CanvasHelper {
    static canvas;
    static width;
    static height;
    static ctx;

    static iniciarCanvas() {
        this.canvas = document.querySelector("#canvas");
        let divCanvas = this.canvas.parentNode;
        this.canvas.width = divCanvas.offsetWidth;
        this.canvas.height = divCanvas.offsetHeight;
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

    static getCtx() {
        return this.ctx;
    }

    static agregarImagen(imagen,coordenadas,ancho,alto) {
        this.ctx.drawImage(imagen,coordenadas[X],coordenadas[Y],ancho,alto);
    }

    static getCanvas() {
        return this.canvas;
    }

}

export default CanvasHelper;