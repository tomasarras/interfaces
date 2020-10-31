export default class Helper {
    TIMPO_FORZADO = 3000;
    DURACION_ANIMACION = 2500;
    e;
    /* LOADER */
    start() {
        setTimeout(this.cargarPagina.bind(this), this.TIMPO_FORZADO);
        const viewHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        window.addEventListener("scroll", (e)=>{
            this.e = e;
            let coordenadaY = document.documentElement.scrollTop;
            let normalizacion = coordenadaY / viewHeight;// numero entre 0 y 1
            //0: inicio de la pagina, 1: cuando ya paso el hero, 1+: otro section
            this.normalizacion = normalizacion;
            this.animarFooter();
            this.onScroll(normalizacion);
        });
    }
    
    animarFooter() {
        let footer = document.querySelector("footer");
        let normalizacion = this.normalizarElementoViewPort(footer);
        if (normalizacion != -1) {
            let img = document.querySelector("footer img");
            let content = document.querySelector("footer .content");
            img.style.transform = "translateX("+((normalizacion*40) -40)+"vw)";
            content.style.transform = "translateX("+((-1*(normalizacion*50))+50)+"vw)";
        }
    }
    //si el elemento esta en el viewport retorna un valor entre 0-1
    //0: por debajo del document
    //1: paso el scroll
    normalizarElementoViewPort(element) {
        let scrollCoor = element.getBoundingClientRect().top - window.innerHeight;
        if (scrollCoor < 0) {
            scrollCoor = scrollCoor*-1;
            let normalizacion = scrollCoor / element.clientHeight;
            if (normalizacion <= 1) {
                return normalizacion;
            } else {
                return -1;
            }
        } else {
            return -1;
        }
    }

    cargarPagina() {
        let loader = document.querySelector("section.loader");
        loader.classList.add("none");
        this.mostrarElementosPagina();
        setTimeout(() => {
            let header = document.querySelector("header");
            header.classList.add("active");
            let btnBurgerMenu = document.querySelector("nav button.hamburger-menu");
            btnBurgerMenu.classList.add("active");
            this.cargarBurgerMenu();
            this.onLoad();
            loader.classList.add("display-none");
        }, 1000);
    }

    onLoad() {}
    onScroll() {}

    mostrarElementosPagina() {
        let elementos = document.querySelectorAll(".display-none");
        elementos.forEach(elemento => {
            elemento.classList.remove("display-none");
        });
    }

    /* NAV */

    cargarBurgerMenu() {
        let navMenu = document.querySelector("nav .menu");
        let btnHamburger = document.querySelector("nav button.hamburger-menu");
        let btnCerrarNavMenu = document.querySelector("nav .menu button");

        let abrirNavMenu = ()=> navMenu.classList.remove("inactive");
        let cerrarNavMenu = ()=> navMenu.classList.add("inactive");

        btnHamburger.addEventListener("click", abrirNavMenu);
        btnCerrarNavMenu.addEventListener("click", cerrarNavMenu);
    }

    animarSeparadorDelorean(inicio,fin) {
        let animarDelorean = (normalizacion) => {
            let delorean = document.querySelector(".separador .delorean");
            delorean.style.left = normalizacion*100 + "%";
        }
        this.animarSection(inicio,fin,animarDelorean);
    }

    animarSection(inicio,fin,animacion) {
        if (this.normalizacion > inicio) {
            if (this.normalizacion < fin) {
                let algorithm = (((this.normalizacion - inicio) * 100) / (fin - inicio) ) /100;
                animacion(algorithm);
            } else {
                animacion(1);
            }
        } else {
            animacion(0);
        }
    }

}