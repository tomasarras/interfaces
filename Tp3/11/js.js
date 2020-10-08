document.addEventListener("DOMContentLoaded",()=>{
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
        let coordenadas = getPosicion(e,card);
        let normalizarX = coordenadas[X] / card.width;
        let normalizarY = coordenadas[Y] / card.height;
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

    function restaurarPosicion(card) {
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