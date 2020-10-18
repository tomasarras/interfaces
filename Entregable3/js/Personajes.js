import Helper from "./Helper.js";

export default class Personajes extends Helper {
    static instance = new Personajes();

    static getInstance() {
        return this.instance;
    }

    start() {
        super.start();
    }

    onLoad() {
        this.asignarEventoHoverCards();
    }

    X = 0;
    Y = 1;

    asignarEventoHoverCards() {
        let divCards = document.querySelectorAll(".card");
        divCards.forEach(divCard => {
            let imgCard = divCard.children[0];
            divCard.addEventListener("mousemove",(e) => {
                this.moverCard(e,imgCard);
            });
            divCard.addEventListener("mouseleave",() => this.restaurarPosicion(imgCard));
        });
    }

    moverCard(e,card) {
        const limiteGrados = 30; //intensidad de rotacion de la card
        const limiteSombra = 30; // desplazamiento de la sombra
        card.classList.remove("restaurar-posicion");
        let coordenadas = this.getPosicion(e,card);
        let normalizarX = coordenadas[this.X] / card.offsetWidth;
        let normalizarY = coordenadas[this.Y] / card.offsetHeight;
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
    }

    restaurarPosicion(card) {
        card.classList.add("restaurar-posicion");
        card.style.transform = "rotate(0)";
        let sombra = "0 0 14px 6px rgba(0,0,0,0.75)";
        card.style['-webkit-box-shadow'] = sombra;
        card.style['-moz-box-shadow'] = sombra;
        card.boxShadow = sombra;
    }

    getPosicion(e,card) {
        let coordenadas = new Array();
        let x = e.pageX - card.offsetLeft;
        let y = e.pageY - card.offsetTop;
        coordenadas[this.X] = x;
        coordenadas[this.Y] = y;
        return coordenadas;
    }
}

document.addEventListener("DOMContentLoaded", ()=> Personajes.getInstance().start());