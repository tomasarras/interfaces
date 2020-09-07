import Lapiz from "./herramientas/Lapiz.js";
import Goma from "./herramientas/Goma.js";
import * as constants from "./helper/constantes.js";
import Rectangulo from "./figuras/Rectangulo.js";

document.addEventListener("DOMContentLoaded",()=>{
    let lapiz = new Lapiz();
    let goma = new Goma();
    let rectangulo = new Rectangulo();
    goma.setBackgroundColor(constants.COLOR_BLANCO);
    let herramientaActiva = null;

    let btnLapiz = document.querySelector("#js-btn-lapiz");
    btnLapiz.addEventListener("click", ()=> { cambiarHerramienta(lapiz) });

    let btnGoma = document.querySelector("#js-btn-goma");
    btnGoma.addEventListener("click",()=>{ cambiarHerramienta(goma) });

    let inputGrosor = document.querySelector("#js-grosor");
    inputGrosor.addEventListener("change", actualizarGrosor);
    
    function cambiarHerramienta(herramienta) {
        let canvas = document.querySelector("#js-canvas");
        let handlerDown = (e) => herramientaActiva.mouseDown(e);
        let handlerClick = (e) => herramientaActiva.click(e);

        if (herramientaActiva != null) {
            canvas.removeEventListener("mousedown", handlerDown);
            canvas.removeEventListener("click", handlerClick);
        }

        herramientaActiva = herramienta;
        canvas.addEventListener("mousedown", handlerDown);
        canvas.addEventListener("click", handlerClick);
    }

    function actualizarGrosor() {
        let inputGrosor = document.querySelector("#js-grosor");
        let grosor = parseInt(inputGrosor.value);
        if (herramientaActiva != null) {
            herramientaActiva.setGrosor(grosor);
        }
    }

});