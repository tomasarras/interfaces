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
        console.log(normalizacion)
        this.animarSectionUno(normalizacion);
        this.animarSectionDos(normalizacion);
        this.animarSectionTres(normalizacion);
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
            let algorithm = (((normalizacion - inicio) * 100) / (fin - inicio) ) /100;
            div.style.transform = "scale(" + algorithm + ")";
        }
    }

    animarSectionTres(normalizacion) {
        let sectionCarrousel = document.querySelector("section.carrousel .container");
        let inicio = 1.35;
        let fin = 1.84;
        
        if (normalizacion > inicio) {
            let algorithm = (((normalizacion - inicio) * 100) / (fin - inicio) ) /100;
            sectionCarrousel.style.opacity = algorithm;
        } else {
            sectionCarrousel.style.opacity = 0;
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