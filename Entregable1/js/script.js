import Lapiz from "./herramientas/Lapiz.js";
import Goma from "./herramientas/Goma.js";
import * as constants from "./helper/constantes.js";
import Rectangulo from "./figuras/Rectangulo.js";
import Canvas from "./helper/Canvas.js";

document.addEventListener("DOMContentLoaded",()=>{
    let lapiz = Lapiz.getInstance();
    let goma = Goma.getInstance();
    let herramientaActiva = null;
    Canvas.updateCanvas();

    let btnLapiz = document.querySelector("#js-btn-lapiz");
    btnLapiz.addEventListener("click", ()=> { cambiarHerramienta(lapiz) });

    let btnGoma = document.querySelector("#js-btn-goma");
    btnGoma.addEventListener("click",()=>{ cambiarHerramienta(goma) });

    let inputGrosor = document.querySelector("#js-grosor");
    inputGrosor.addEventListener("change", actualizarGrosor);
    
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