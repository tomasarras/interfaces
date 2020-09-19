import Circulo from "./Figuras/Circulo.js";
import Figura from "./Figuras/Figura.js";
import Rectangulo from "./Figuras/Rectangulo.js";

document.addEventListener("DOMContentLoaded",()=>{
    let figuras = new Array();
    let canvas = document.querySelector("#js-canvas");
    let ctx = canvas.getContext("2d");
    let cuadrardo = new Rectangulo(600,100,[0,0],ctx,"#FF0000");
    cuadrardo.setGradiente("#00FFFF")
    //cuadrardo.setImagen();
    //cuadrardo.draw();
    setInterval(dibujarFiguraRandom, 1000);

    function dibujarFiguraRandom() {
        let random = Math.random() * 10;
        let figura;
        let coordenadas = new Array();
        coordenadas[0] = Math.round(Math.random() * canvas.width);
        coordenadas[1] = Math.round(Math.random() * canvas.height);
        let r = Math.round(Math.random() * 255);
        let g = Math.round(Math.random() * 255);
        let b = Math.round(Math.random() * 255);
        let colorHex = rgbToHex(r,g,b);

        if (random < 5) {
            let min = 10;
            let max = 50;
            let ancho = Math.round(Math.random() * max) + min;
            let alto = Math.round(Math.random() * max) + min;
            figura = new Rectangulo(ancho,alto,coordenadas,ctx,colorHex);
        } else {
            let radio = Math.round(Math.random() * 60) + 1;
            figura = new Circulo(radio,coordenadas,ctx,colorHex);
        }
        
        random = Math.random() * 30;
        if (random > 20){
            r = 255 - r;
            g = 255 - g;
            b = 255 - b;
            let colorFin = rgbToHex(r,g,b);
            figura.setGradiente(colorFin);
        } else if (random > 10) {
            figura.setImagen();
        }
        figura.draw();
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function componentToHex(c) {
        let hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    
});