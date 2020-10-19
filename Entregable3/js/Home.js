import Helper from "./Helper.js";

export default class Home extends Helper {
    static instance = new Home();

    static getInstance() {
        return this.instance;
    }

    start() {
        super.start();
    }

    onLoad() {
        let bttf = document.querySelector(".back-to-the-future");
        let delorean = document.querySelector(".portada .delorean");
        delorean.classList.add("active");
        bttf.classList.add("active");
        this.activarSlider();
    }

    onScroll(normalizacion) {
        this.animarSectionUno(normalizacion);
        this.animarSectionDos(normalizacion);
    }

    animarSectionUno(normalizacion) {
        let delorean = document.querySelector(".portada .delorean");
        delorean.style.transform = "translateY(" + (normalizacion * 80) + "%)";
        if (normalizacion == 0)
            this.mostrarIconoMouseWheel();
        else
            this.ocultarIconoMouseWheel();
    }

    animarSectionDos(normalizacion) {
        let div = document.querySelector("section.descripcion div");
        let inicio = 0.4;
        let fin = 0.8;
        if (normalizacion < inicio) {
            div.style.transform = "scale(0)";
        }

        if (normalizacion >= inicio && normalizacion <= fin) {
            let temp = (normalizacion / inicio) -1;
            div.style.transform = "scale(" + temp + ")";
        }
    }

    mostrarIconoMouseWheel() {
        let icono = document.querySelector(".mouse-wheel");
        icono.style.opacity = 1;
    }

    ocultarIconoMouseWheel(){ 
        let icono = document.querySelector(".mouse-wheel");
        icono.style.opacity = 0;
    }

    activarSlider() {
        let siguienteSlide = ()=> {
            let slideActivo = document.querySelector("#slider .slide.activo");
            slideActivo.classList.remove("activo");
            slideActivo.classList.add("inactivo");
            let siguienteSlide = slideActivo.nextElementSibling;
            siguienteSlide.classList.add("activo");
        }

        let anteriorSlide = ()=> {
            let slideActivo = document.querySelector("#slider .slide.activo");
            slideActivo.classList.remove("activo");
            let anteriorSlide = slideActivo.previousElementSibling;
            anteriorSlide.classList.add("activo");
            anteriorSlide.classList.remove("inactivo");
        }

        let btnsSiguiente = document.querySelectorAll("#slider .btn-sig");
        let btnsAnterior = document.querySelectorAll("#slider .btn-ant");
        btnsSiguiente.forEach(btn => {
            btn.addEventListener("click",siguienteSlide);
        });
    
        btnsAnterior.forEach(btn => {
            btn.addEventListener("click",anteriorSlide);
        });
    }
}

document.addEventListener("DOMContentLoaded",()=> Home.getInstance().start());