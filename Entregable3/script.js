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
    }

    const viewHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    window.addEventListener("scroll", ()=>{
        let coordenadaY = document.documentElement.scrollTop;
        let delorean = document.querySelector(".portada .delorean");
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






    const X = 0;
    const Y = 1;
    let divCards = document.querySelectorAll(".card");
    divCards.forEach(divCard => {
        let imgCard = divCard.children[0];
        divCard.addEventListener("mousemove",(e) =>{
            moverCard(e,imgCard);
        });
        divCard.addEventListener("mouseleave",() => restaurarPosicion(imgCard));
    });

    function moverCard(e,card) {
        const limiteGrados = 30; //intensidad de rotacion de la card
        const limiteSombra = 30; // desplazamiento de la sombra
        card.classList.remove("restaurar-posicion");
        let coordenadas = getPosicion(e,card);
        let normalizarX = coordenadas[X] / card.offsetWidth;
        let normalizarY = coordenadas[Y] / card.offsetHeight;
        let anguloX,anguloY,sombraX,sombraY;

        anguloX = (normalizarX / 0.5) * limiteGrados;
        anguloX = limiteGrados - anguloX;
        anguloX = anguloX *-1;

        anguloY = (normalizarY / 0.5) * limiteGrados;
        anguloY = limiteGrados - anguloY;

        sombraX = (normalizarX / 0.5) * limiteSombra;
        sombraX = limiteSombra - sombraX;
        sombraX = sombraX;

        sombraY = (normalizarY / 0.5) * limiteSombra;
        sombraY = limiteGrados - sombraY;

        let rotacion = "rotateX(" + anguloY + "deg) rotateY(" + anguloX + "deg)";
        let sombra = sombraX+"px "+sombraY+"px "+"14px 6px rgba(0,0,0,0.75)";

        card.style['-webkit-box-shadow'] = sombra;
        card.style['-moz-box-shadow'] = sombra;
        card.boxShadow = sombra;
        card.style.transform = rotacion;
        console.log(card.width)
    }

    function restaurarPosicion(card) {
        card.classList.add("restaurar-posicion");
        card.style.transform = "rotate(0)";
        let sombra = "0 0 14px 6px rgba(0,0,0,0.75)";
        card.style['-webkit-box-shadow'] = sombra;
        card.style['-moz-box-shadow'] = sombra;
        card.boxShadow = sombra;
    }

    function getPosicion(e,card) {
        let coordenadas = new Array();
        let x = e.pageX - card.offsetLeft;
        let y = e.pageY - card.offsetTop;
        coordenadas[X] = x;
        coordenadas[Y] = y;
        return coordenadas;
    }
});