import { COLOR_NEGRO } from "../helper/constantes.js";

class Herramienta {
    color;
    width;
    height;
    grosor;

    constructor() {
        this.grosor = this.getGrosor();
        this.color = COLOR_NEGRO;
    }

    setColor(color) {
        this.color = color;
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