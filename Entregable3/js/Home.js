import Helper from "./Helper.js";

export default class Home extends Helper {
    static instance = new Home();
    normalizacion;
    lastMouseY;

    static getInstance() {
        return this.instance;
    }

    start() {
        super.start();
    }

    onLoad() {
        this.animarHero();
        this.activarSlider();
        this.animarBtnFormulario();
    }

    onScroll() {

        let animarSectionUno = () => {
            let marty = document.querySelector(".hero .marty");
            let currentTranslateX = this.getTranslateX(marty);
            marty.style.transform = "translateX("+currentTranslateX+"px) translateY(" + this.calcTranslateY()+ "%)";
            if (this.normalizacion == 0)
                this.mostrarIconoMouseWheel();
            else
                this.ocultarIconoMouseWheel();
        }

        let animarSectionDos = (normalizacion) => {
            let img = document.querySelector("section.descripcion div img");
            let content = document.querySelector(".descripcion p");
            img.style.transform = "translateX("+(65+(normalizacion*65*-1))+"vw)";
            content.style.transform = "translateX("+(-90 +(normalizacion*90))+"vw)";
        }

        let animarSectionTres = (normalizacion) => {
            let carrousel = document.querySelector("section.carrousel .container #slider");
            carrousel.style.transform = "scale("+normalizacion+")";
        }

        let animarComments = (normalizacion) => {
            let img = document.querySelector(".comments img");
            img.style.transform = "translateX("+(-50 + (normalizacion*50)) + "vw)";
            let form = document.querySelector(".comments .animated-form");
            form.style.transform = "translateX("+(45 + (normalizacion*50*-1)) + "vw)";
        }

        let animarCommentsUl = (normalizacion) => {
            let ul = document.querySelector("section.comments ul");
            ul.style.transform = "scale("+normalizacion+")";
        }

        let animarDelorean2 = (normalizacion) => {
            let delorean = document.querySelector(".separador2 .delorean");
            delorean.style.left = 120 - (normalizacion*140) + "%";
        }
        console.log(this.normalizacion)
        this.animarSeparadorDelorean(1.28,2.28);
        this.animarSection(0,1,animarSectionUno);
        this.animarSection(0.4,1.12,animarSectionDos);
        this.animarSection(3.05,4.16,animarDelorean2);
        this.animarSection(2.36,2.84,animarSectionTres);
        this.animarSection(3.9,4.43,animarComments);
        this.animarSection(4.48,4.64,animarCommentsUl);
    }

    calcTranslateY() {
        let mouse = (this.lastMouseY / window.screen.height) * 15;
        let scroll = (this.normalizacion * 60);
        if (Number.isNaN(scroll)) {
            scroll = 0;
        }
        if (Number.isNaN(mouse)) {
            mouse = 0;
        }
        return mouse + scroll;
    }

    getTranslateX(element) {
        let style = window.getComputedStyle(element);
        let matrix = new WebKitCSSMatrix(style.transform);
        return matrix.m41;
    }

    mostrarIconoMouseWheel() {
        let icono = document.querySelector(".hero .mouse-wheel");
        icono.style.opacity = 1;
    }
    
    ocultarIconoMouseWheel(){ 
        let icono = document.querySelector(".hero .mouse-wheel");
        icono.classList.add("change-animation");
        icono.style.opacity = 0;
    }

    animarBtnFormulario() {
        let btn = document.querySelector("#btn-enviar-form");
        btn.addEventListener("click",(e)=> {
            e.preventDefault();
            btn.classList.add("enviando");
            setTimeout(() => {
                let form = document.querySelector("section.comments form");
                form.submit();
            }, 1500);
        });
    }

    activarSlider() {
        let siguienteSlide = ()=> {
            document.querySelector("#sig-slide").blur();
            let slides = document.querySelectorAll("#slider .slide");
            let slideActivo = document.querySelector("#slider .slide.activo");
            if (slides[0] == slideActivo) {
                let btn = document.querySelector(".carrousel .btn-ant");
                btn.disabled = false;
            }
            slideActivo.classList.remove("activo");
            slideActivo.classList.add("inactivo");
            let siguienteSlide = slideActivo.nextElementSibling;
            siguienteSlide.classList.add("activo");
            if (slides[slides.length -1] == siguienteSlide) {
                document.querySelector(".carrousel .btn-sig").disabled = true;
            }
        }

        let anteriorSlide = ()=> {
            document.querySelector("#ant-slide").blur();
            let slides = document.querySelectorAll("#slider .slide");
            let slideActivo = document.querySelector("#slider .slide.activo");
            slideActivo.classList.remove("activo");
            if (slides[slides.length -1] == slideActivo) {
                document.querySelector(".carrousel .btn-sig").disabled = false;
            }
            let anteriorSlide = slideActivo.previousElementSibling;
            anteriorSlide.classList.add("activo");
            anteriorSlide.classList.remove("inactivo");
            if (slides[0] == anteriorSlide) {
                document.querySelector(".carrousel .btn-ant").disabled = true;
            }
        }

        let btnSiguiente = document.querySelector(".carrousel .btn-sig");
        let btnAnterior = document.querySelector(".carrousel .btn-ant");
        btnSiguiente.addEventListener("click",siguienteSlide);
        btnAnterior.addEventListener("click",anteriorSlide);
    }

    animarHero() {
        let mouseIcon = document.querySelector(".hero .mouse-wheel");
        let degrade = document.querySelector(".hero .degrade");
        let clouds = document.querySelector(".hero .clouds");
        let marty = document.querySelector(".hero .marty");
        let sun = document.querySelector(".hero .sun");
        let hero = document.querySelector(".hero");
        mouseIcon.classList.add("active");
        degrade.classList.add("active");
        clouds.classList.add("active");
        marty.classList.add("active");
        sun.classList.add("active");
        hero.addEventListener("mousemove",(e)=> {
            this.lastMouseY = e.clientY;
            let instensity = 15;
            let x = (e.clientX / window.screen.width) * instensity;
            let y = (e.clientY / window.screen.height) * instensity;
            
            marty.style.transform = "translateX("+x+"%) translateY("+this.calcTranslateY()+"%)";
            sun.style.transform = "translateX("+x/2.5+"%) translateY("+y/2.5+"%)";
            clouds.style.transform = "rotateX("+x+"deg) rotateY("+y+"deg)";
        });
    }
}

document.addEventListener("DOMContentLoaded",()=> Home.getInstance().start());