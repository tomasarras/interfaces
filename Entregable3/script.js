document.addEventListener("DOMContentLoaded",()=>{
    const TIMPO_FORZADO = 3000;
    const DURACION_ANIMACION = 2500;
    
    setTimeout(terminarAnimacion, TIMPO_FORZADO);
    function terminarAnimacion() {
        animarCarga();
        setTimeout(cargarPagina, DURACION_ANIMACION);
    }

    function animarCarga() {
        let hero = document.querySelector(".hero");
        hero.classList.add("terminado");
        setTimeout(() => {
            let smoke = document.querySelector(".smoke");
            smoke.classList.add("active");
            let fire = document.querySelector(".fire");
            fire.classList.add("active");
        }, DURACION_ANIMACION - 1580);
    }
    
    function cargarPagina() {
        let hero = document.querySelector(".hero");
        hero.classList.add("none");
        mostrarElementosPagina();
        setTimeout(() => {
            hero.classList.add("display-none");
            let bttf = document.querySelector(".back-to-the-future");
            let delorean = document.querySelector(".portada .delorean");
            delorean.classList.add("active");
            bttf.classList.add("active");
        }, 1000);
    }

    function mostrarElementosPagina() {
        let elementos = document.querySelectorAll(".display-none");
        elementos.forEach(elemento => {
            elemento.classList.remove("display-none");
        });
        console.log(elementos);
    }

    const viewHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    window.addEventListener("scroll", ()=>{
        let coordenadaY = document.documentElement.scrollTop;
        let delorean = document.querySelector(".portada .delorean");
        console.log(delorean);
        let normalizacion = coordenadaY / viewHeight;// numero entre 0 y 1
        //0: inicio de la pagina, 1: cuando ya paso el hero
        delorean.style.transform = "translateY(" + (normalizacion * 80) + "%)";
        if (coordenadaY == 0)
            mostrarIconoMouseWheel();
        else
            ocultarIconoMouseWheel();
    });

    function mostrarIconoMouseWheel() {
        let icono = document.querySelector(".mouse-wheel");
        icono.style.opacity = 1;
    }

    function ocultarIconoMouseWheel(){ 
        let icono = document.querySelector(".mouse-wheel");
        icono.style.opacity = 0;
    }
});