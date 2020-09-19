import { X, Y } from "./constantes.js";
import CanvasHelper from "./Helper/CanvasHelper.js";

class Contenedor {
    coordenadas;
    ancho;
    alto;
    static imagen = document.querySelector("#js-contenedor");

    constructor(coordenadas,ancho,alto){ 
        this.coordenadas = new Array();
        this.coordenadas[X] = coordenadas[X];
        this.coordenadas[Y] = coordenadas[Y];
        this.ancho = ancho;
        this.alto = alto;
    }

    dibujar() {
        let img = new Image();
        img.src = Contenedor.imagen.src;
        img.onload = () => {
            CanvasHelper.agregarImagen(Contenedor.imagen,this.coordenadas,this.ancho,this.alto);
        }
    }

}

export default Contenedor;