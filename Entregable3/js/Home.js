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
        this.animarBtnFormulario();
    }

    onScroll(normalizacion) {
        let animarSectionUno = (normalizacion) => {
            let delorean = document.querySelector(".portada .delorean");
            delorean.style.transform = "translateY(" + (normalizacion * 80) + "%)";
            if (normalizacion == 0)
                this.mostrarIconoMouseWheel();
            else
                this.ocultarIconoMouseWheel();
        }

        let animarSectionDos = (normalizacion) => {
            let div = document.querySelector("section.descripcion div");
            div.style.transform = "scale(" + normalizacion + ")";
        }

        let animarSectionTres = (normalizacion) => {
            let carrousel = document.querySelector("section.carrousel .container #slider");
            carrousel.style.opacity = normalizacion;
        }

        let animarFooter = (normalizacion) => {
            let img = document.querySelector("footer img");
            let form = document.querySelector("footer .form");
            img.style.opacity = normalizacion;
            form.style.opacity = normalizacion;
        }

        this.animarSection(normalizacion,0,1,animarSectionUno);
        this.animarSection(normalizacion,0.4,0.8,animarSectionDos);
        this.animarSection(normalizacion,1.35,1.95,animarSectionTres);
        this.animarSection(normalizacion,2.3,2.6,animarFooter);
    }

    animarSection(normalizacion,inicio,fin,animacion) {
        if (normalizacion > inicio) {
            if (normalizacion < fin) {
                let algorithm = (((normalizacion - inicio) * 100) / (fin - inicio) ) /100;
                animacion(algorithm);
            } else {
                animacion(1);
            }
        } else {
            animacion(0);
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

    animarBtnFormulario() {
        let btn = document.querySelector("#btn-enviar-form");
        btn.addEventListener("click",(e)=> {
            e.preventDefault();
            btn.classList.add("enviando");
            setTimeout(() => {
                let form = document.querySelector("footer form");
                form.submit();
            }, 1500);
        });
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