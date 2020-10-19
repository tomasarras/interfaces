export default class Helper {
    TIMPO_FORZADO = 1;
    DURACION_ANIMACION = 2500;
    /* LOADER */
    start() {
        setTimeout(this.terminarAnimacion.bind(this), this.TIMPO_FORZADO);
        const viewHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        window.addEventListener("scroll", ()=>{
            let coordenadaY = document.documentElement.scrollTop;
            let normalizacion = coordenadaY / viewHeight;// numero entre 0 y 1
            //0: inicio de la pagina, 1: cuando ya paso el hero, 1+: otro section
            this.onScroll(normalizacion);
        });
    }

    terminarAnimacion() {
        this.animarFinCarga();
        setTimeout(this.cargarPagina.bind(this), this.DURACION_ANIMACION);
    }

    animarFinCarga() {
        let hero = document.querySelector(".hero");
        hero.classList.add("terminado");
        setTimeout(() => {
            let smoke = document.querySelector(".smoke");
            smoke.classList.add("active");
            let fire = document.querySelector(".fire");
            fire.classList.add("active");
        }, this.DURACION_ANIMACION - 1580);
    }
    
    cargarPagina() {
        let hero = document.querySelector(".hero");
        hero.classList.add("none");
        this.mostrarElementosPagina();
        setTimeout(() => {
            let btnBurgerMenu = document.querySelector("nav button.hamburger-menu");
            btnBurgerMenu.classList.add("active");
            this.cargarBurgerMenu();
            this.onLoad();
            hero.classList.add("display-none");
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

}