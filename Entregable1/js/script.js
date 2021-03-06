import Lapiz from "./herramientas/Lapiz.js";
import Goma from "./herramientas/Goma.js";
import Canvas from "./helper/Canvas.js";
import Negativo from "./filtros/Negativo.js";
import BlancoNegro from "./filtros/BlancoNegro.js";
import Binarizacion from "./filtros/Binarizacion.js";
import Sepia from "./filtros/Sepia.js";
import Brillo from "./filtros/Brillo.js";
import Saturacion from "./filtros/Saturacion.js";
import Blur from "./filtros/Blur.js";
import Sobel from "./filtros/Sobel.js";
import Azul from "./filtros/Azul.js";
import Luminosidad from "./filtros/Luminosidad.js";

document.addEventListener("DOMContentLoaded",()=>{
    "use strict";
    let lapiz = new Lapiz();
    let goma = new Goma();
    let herramientaActiva = null;
    let filtroActivo = null;
    let negativo = new Negativo();
    let blancoNegro = new BlancoNegro();
    let binarizacion = new Binarizacion();
    let sepia = new Sepia();
    let brillo = new Brillo();
    let saturacion = new Saturacion();
    let blur = new Blur();
    let sobel = new Sobel();
    let azul = new Azul();
    let luminosidad = new Luminosidad();
    Canvas.updateCanvas();
    let btnLapiz = document.querySelector("#js-btn-lapiz");
    btnLapiz.addEventListener("click", ()=> { cambiarHerramienta(lapiz) });

    let btnGoma = document.querySelector("#js-btn-goma");
    btnGoma.addEventListener("click",()=>{ cambiarHerramienta(goma) });

    let inputGrosor = document.querySelector("#js-grosor");
    inputGrosor.addEventListener("change", actualizarGrosor);

    let btnLienzoBlanco = document.querySelector("#js-btn-lienzo-blanco");
    btnLienzoBlanco.addEventListener("click", ()=> Canvas.lienzoBlanco());

    let inputCargarImagen = document.querySelector("#js-cargar-imagen");
    inputCargarImagen.addEventListener("change", cargarImagen);

    let btnFiltroNegativo = document.querySelector("#js-filtro-negativo");
    btnFiltroNegativo.addEventListener("click", ()=> cambiarFiltroActivo(negativo));
    
    let btnFiltroBlancoNegro = document.querySelector("#js-filtro-blanco-negro");
    btnFiltroBlancoNegro.addEventListener("click", ()=> cambiarFiltroActivo(blancoNegro));
    
    let btnFiltroBinarizacion = document.querySelector("#js-filtro-binarizacion");
    btnFiltroBinarizacion.addEventListener("click", ()=> cambiarFiltroActivo(binarizacion));
    
    let btnFiltroSepia = document.querySelector("#js-filtro-sepia");
    btnFiltroSepia.addEventListener("click", ()=> cambiarFiltroActivo(sepia));

    let btnFiltroBrillo = document.querySelector("#js-filtro-brillo");
    btnFiltroBrillo.addEventListener("click", ()=> cambiarFiltroActivo(brillo));

    let btnFiltroSaturacion = document.querySelector("#js-filtro-saturacion");
    btnFiltroSaturacion.addEventListener("click", ()=> cambiarFiltroActivo(saturacion));

    let inputIntensidad = document.querySelector("#js-intensidad");
    inputIntensidad.addEventListener("change", updateFiltro);
    
    let btnFiltroBlur = document.querySelector("#js-filtro-blur");
    btnFiltroBlur.addEventListener("click", ()=> cambiarFiltroActivo(blur));

    let btnFiltroSobel = document.querySelector("#js-filtro-sobel");
    btnFiltroSobel.addEventListener("click", ()=> cambiarFiltroActivo(sobel));

    let btnFiltroAzul = document.querySelector("#js-filtro-azul");
    btnFiltroAzul.addEventListener("click", ()=> cambiarFiltroActivo(azul));

    let btnFiltroLuminosidad = document.querySelector("#js-filtro-luminosidad");
    btnFiltroLuminosidad.addEventListener("click", ()=> cambiarFiltroActivo(luminosidad));
    
    let btnDescargar = document.querySelector("#js-btn-descargar-canvas");
    btnDescargar.addEventListener("click", descargarCanvas);

    function descargarCanvas() {
        let canvas = Canvas.getCanvas();
        let imageURI = canvas.toDataURL("image/jpg");
        let link = document.createElement("a");
        link.setAttribute("href", imageURI);
        link.setAttribute("download", "imagen");
        link.click();
    };

    function updateFiltro() {
        if (filtroActivo != null) {
            filtroActivo.update();
        }
    }

    function cambiarFiltroActivo(filtro) {
        filtroActivo = filtro;
        filtroActivo.aplicarFiltro();
    }

    function cargarImagen(event) {
        Canvas.lienzoBlanco();
        let file = event.target.files[0];
        let reader = new FileReader();
        let inputCargarImagen = document.querySelector("#js-cargar-imagen");
        inputCargarImagen.value = "";

        reader.readAsDataURL(file);
        reader.onload = readerEvent => {
            let content = readerEvent.target.result;
            let image = new Image();
            image.src = content;
            image.onload = ()=>{
                let medida = "";
                let ctx = Canvas.getCtx();
                let width;
                let height;
                width = image.width;
                medida = "width:"+width+"px;";
                height = image.height;
                medida += "height:"+height+"px;";
                let canvas = document.querySelector("#js-canvas");
                let divCanvas = canvas.parentNode;
                divCanvas.setAttribute("style",medida);
                Canvas.updateCanvas();
                ctx.drawImage(image,0,0,width,height);
            }
        }
    }

    function cambiarHerramienta(herramienta) {
        if (herramientaActiva != null) {
            herramientaActiva.desactivar();
        }

        herramientaActiva = herramienta;
        herramientaActiva.activar();
    }

    function actualizarGrosor() {
        let inputGrosor = document.querySelector("#js-grosor");
        let grosor = parseInt(inputGrosor.value);
        if (herramientaActiva != null) {
            herramientaActiva.setGrosor(grosor);
        }
    }

});