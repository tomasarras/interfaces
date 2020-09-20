import Circulo from "./Figuras/Circulo.js";
import CirculoImagen from "./Figuras/CirculoImagen.js";
import CirculoDegrade from "./Figuras/CirculoDegrade.js";
import Rectangulo from "./Figuras/Rectangulo.js";
import RectanguloImagen from "./Figuras/RectanguloImagen.js";
import RectanguloDegrade from "./Figuras/RectanguloDegrade.js";

document.addEventListener("DOMContentLoaded",()=>{
    let figuras = new Array();
    let cantFiguras = 0;
    let canvas = document.querySelector("#js-canvas");
    let ctx = canvas.getContext("2d");

    setInterval(dibujarFiguraRandom, 1000);

    function dibujarFiguraRandom() {
        let random = Math.random() * 60;
        let figura;
        let coordenadas = new Array();
        coordenadas[0] = Math.round(Math.random() * canvas.width);
        coordenadas[1] = Math.round(Math.random() * canvas.height);
        let r = Math.round(Math.random() * 255);
        let g = Math.round(Math.random() * 255);
        let b = Math.round(Math.random() * 255);
        let colorHex = rgbToHex(r,g,b);
        let img;

        if (random > 30) {
            let min = 10;
            let max = 50;
            let ancho = Math.round(Math.random() * max) + min;
            let alto = Math.round(Math.random() * max) + min;
            if (random > 40) {
                r = 255 - r;
                g = 255 - g;
                b = 255 - b;
                let colorFin = rgbToHex(r,g,b);
                figura = new RectanguloDegrade(ancho,alto,coordenadas,ctx,colorHex,colorFin);
            } else if (random > 50) {
                figura = new Rectangulo(ancho,alto,coordenadas,ctx,colorHex);
            } else {
                img = getImgRandom();
                figura = new RectanguloImagen(ancho,alto,coordenadas,ctx,colorHex,img);
            }
        } else {
            let radio = Math.round(Math.random() * 60) + 1;

            if (random > 20) {
                figura = new Circulo(radio,coordenadas,ctx,colorHex);
            } else if (random > 10) {
                img = getImgRandom();
                figura = new CirculoImagen(radio,coordenadas,ctx,colorHex,img);
            } else {
                r = 255 - r;
                g = 255 - g;
                b = 255 - b;
                let colorFin = rgbToHex(r,g,b);
                figura = new CirculoDegrade(radio,coordenadas,ctx,colorHex,colorFin);
            }
        }

        figura.draw();
        figuras[cantFiguras] = figura;
        cantFiguras++;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function componentToHex(c) {
        let hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    

    function getImgRandom() {
        let cantidadImagenes = 5;
        let random = Math.round(Math.random() * (cantidadImagenes -1));
        let imagenes = document.querySelectorAll(".js-img");
        return imagenes[random];
    }
});