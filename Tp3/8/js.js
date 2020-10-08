document.addEventListener("DOMContentLoaded",()=>{
    const viewHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    window.addEventListener("scroll", ()=>{
        let coordenadaY = document.documentElement.scrollTop;
        let montania = document.querySelector("#montaña");
        let nube1 = document.querySelector("#nube1");
        let nube2 = document.querySelector("#nube2");
        let nube3 = document.querySelector("#nube3");
        let pasto = document.querySelector("#pasto");
        let arbolIzq = document.querySelector("#arbol-izq");
        let arbolDer = document.querySelector("#arbol-der");
        let normalizacion = coordenadaY / viewHeight;// numero entre 0 y 1
        //0: inicio de la pagina, 1: cuando ya paso el hero
        
        let scaleMontania = "scale(" + (1 - normalizacion) + ")";
        let translatePato = "translateX(" + (normalizacion * 100) + "vw)";
        let translateArbolIzq = "translateX(" + (-(normalizacion * 18)) + "vw)";
        let translateArbolDer =  "translateX("+(normalizacion * 18)+"vw)";

        montania.style.transform = scaleMontania;
        pasto.style.transform = translatePato 
        arbolIzq.style.transform = translateArbolIzq;
        arbolDer.style.transform = translateArbolDer;
       
    });
});