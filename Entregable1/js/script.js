import Lapiz from "./herramientas/Lapiz.js";
import Goma from "./herramientas/Goma.js";
import Canvas from "./helper/Canvas.js";
import Negativo from "./filtros/Negativo.js";
import BlancoNegro from "./filtros/BlancoNegro.js";
import Binarizacion from "./filtros/Binarizacion.js";

document.addEventListener("DOMContentLoaded",()=>{
    let lapiz = Lapiz.getInstance();
    let goma = Goma.getInstance();
    let herramientaActiva = null;
    let filtroActivo = null;
    let negativo = new Negativo();
    let blancoNegro = new BlancoNegro();
    let binarizacion = new Binarizacion();
    Canvas.updateCanvas();
    Canvas.lienzoBlanco();

    let btnLapiz = document.querySelector("#js-btn-lapiz");
    btnLapiz.addEventListener("click", ()=> { cambiarHerramienta(lapiz) });

    let btnGoma = document.querySelector("#js-btn-goma");
    btnGoma.addEventListener("click",()=>{ cambiarHerramienta(goma) });

    let inputGrosor = document.querySelector("#js-grosor");
    inputGrosor.addEventListener("change", actualizarGrosor);

    let btnLienzoBlanco = document.querySelector("#js-btn-lienzo-blanco");
    btnLienzoBlanco.addEventListener("click", ()=> Canvas.lienzoBlanco());

    let btnCargarImagen = document.querySelector("#js-cargar-imagen");
    btnCargarImagen.addEventListener("change", cargarImagen);

    let btnFiltroNegativo = document.querySelector("#js-btn-filtro-negativo");
    btnFiltroNegativo.addEventListener("click", ()=> cambiarFiltroActivo(negativo));
    
    let btnFiltroBlancoNegro = document.querySelector("#js-btn-filtro-blanco-negro");
    btnFiltroBlancoNegro.addEventListener("click", ()=> cambiarFiltroActivo(blancoNegro));
    
    let btnFiltroBinarizacion = document.querySelector("#js-btn-filtro-binarizacion");
    btnFiltroBinarizacion.addEventListener("click", ()=> cambiarFiltroActivo(binarizacion));

    let inputIntensidad = document.querySelector("#js-intensidad");
    inputIntensidad.addEventListener("change", updateFiltro);

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
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = readerEvent => {
            let content = readerEvent.target.result;
            let image = new Image();
            image.src = content;
            image.onload = ()=>{
                let ctx = Canvas.getCtx();
                ctx.drawImage(image,0,0,Canvas.getWidth(),Canvas.getHeight());
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