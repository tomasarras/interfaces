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
        this.asignarEventoScroll();
    }

    asignarEventoScroll() {
        const viewHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        window.addEventListener("scroll", ()=>{
            let coordenadaY = document.documentElement.scrollTop;
            let normalizacion = coordenadaY / viewHeight;// numero entre 0 y 1
            //0: inicio de la pagina, 1: cuando ya paso el hero, 1+: otro section
            this.animarSectionUno(normalizacion);
            this.animarSectionDos(normalizacion);
        });
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
}

document.addEventListener("DOMContentLoaded",()=> Home.getInstance().start());