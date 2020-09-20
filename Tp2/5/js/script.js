import Circulo from "./Figuras/Circulo.js";
import CirculoImagen from "./Figuras/CirculoImagen.js";
import CirculoDegrade from "./Figuras/CirculoDegrade.js";
import Rectangulo from "./Figuras/Rectangulo.js";
import RectanguloImagen from "./Figuras/RectanguloImagen.js";
import RectanguloDegrade from "./Figuras/RectanguloDegrade.js";

document.addEventListener("DOMContentLoaded",()=>{
    let figuras = new Array();
    let cantFiguras = 0;
    let click;
    let figuraSeleccionada = null;;
    let div = document.querySelector("#mensaje");
    let canvas = document.querySelector("#js-canvas");
    let ctx = canvas.getContext("2d");
    canvas.addEventListener("mousedown",seleccionarFigura);
    canvas.addEventListener("mousemove",moverFigura);
    canvas.addEventListener("mouseup",mouseDown);
    document.addEventListener('keydown', moverConTeclado);

    function moverConTeclado(e) {
        if (figuraSeleccionada != null) {
            let tecla = e.key;
            let intensidad = 3;
            let coordenadas = figuraSeleccionada.getCoordenadas();

            if (tecla == "ArrowUp") {
                coordenadas[1] -= intensidad;
            } else if (tecla == "ArrowDown") {
                coordenadas[1] += intensidad;
            } else if (tecla == "ArrowLeft") {
                coordenadas[0] -= intensidad;
            } else if (tecla == "ArrowRight") {
                coordenadas[0] += intensidad;
            }

            figuraSeleccionada.mover(coordenadas);
            dibujarFiguras();
        }
    }

    function mouseDown() {
        click = false;
    }

    function seleccionarFigura(e) {
        click = true;
        let figura = identificarFigura(e);
        figuraSeleccionada = figura;
    }

    function moverFigura(e) {
        if (click) {
            let coordenadas = getMousePosition(e);
            figuraSeleccionada.mover(coordenadas);
            dibujarFiguras();
        }
    }
    
    function dibujarFiguras() {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        for (let i = 0; i < figuras.length; i++) {
            figuras[i].reDibujar();
        }
    }

    canvas.addEventListener("click",identificarFigura);


    function identificarFigura(e) {
        let coordenadas = getMousePosition(e);
        let encontrada = false;
        let figura = null;

        let i = 0;
        while (i < figuras.length & !encontrada) {
            encontrada = figuras[i].seClickeo(coordenadas);
            i++;
        }

        if (encontrada) {
            figura = figuras[i-1];
            div.innerHTML = "Clickeaste en un " + figura.getNombre();
        } else {
            div.innerHTML = "No clickeaste ninguna figura";
        }

        return figura;
    }

    function getMousePosition(e) {
        let rect = canvas.getBoundingClientRect(); 
        let x = e.clientX - rect.left; 
        let y = e.clientY - rect.top;
        let coordenadas = new Array();
        coordenadas[0] = x;
        coordenadas[1] = y;
        return coordenadas;
    }

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
                figura.setNombre("rectangulo con degrade");
            } else if (random > 50) {
                figura = new Rectangulo(ancho,alto,coordenadas,ctx,colorHex);
                figura.setNombre("rectangulo");
            } else {
                img = getImgRandom();
                figura = new RectanguloImagen(ancho,alto,coordenadas,ctx,colorHex,img);
                figura.setNombre("imagen rectangular");
            }
        } else {
            let radio = Math.round(Math.random() * 60) + 1;
            
            if (random > 20) {
                figura = new Circulo(radio,coordenadas,ctx,colorHex);
                figura.setNombre("circulo");
            } else if (random > 10) {
                img = getImgRandom();
                figura = new CirculoImagen(radio,coordenadas,ctx,colorHex,img);
                figura.setNombre("imagen circular");
            } else {
                r = 255 - r;
                g = 255 - g;
                b = 255 - b;
                let colorFin = rgbToHex(r,g,b);
                figura = new CirculoDegrade(radio,coordenadas,ctx,colorHex,colorFin);
                figura.setNombre("circulo con degrade");
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