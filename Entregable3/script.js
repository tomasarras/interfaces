document.addEventListener("DOMContentLoaded",()=>{
    const TIMPO_FORZADO = 3000;
    const DURACION_ANIMACION = 2500;
    
    setTimeout(terminarAnimacion, TIMPO_FORZADO);
    function terminarAnimacion() {
        animarCarga();
        setTimeout(cargarPagina, DURACION_ANIMACION);
    }

    function animarCarga() {
        let loading = document.querySelector(".loading");
        loading.classList.add("terminado");
        setTimeout(() => {
            let smoke = document.querySelector(".smoke");
            smoke.classList.add("active");
            let fire = document.querySelector(".fire");
            fire.classList.add("active");
        }, DURACION_ANIMACION - 1580);
    }
    
    function cargarPagina() {
        let loading = document.querySelector(".loading");
        loading.classList.add("none");
    }
});