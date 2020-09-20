document.addEventListener("DOMContentLoaded",()=>{
    let btn = document.querySelector("#btn");
    btn.addEventListener("click", ()=>cambiarColor("rojo"));

    let select = document.querySelector("#select");
    select.addEventListener("change",()=>cambiarColor("azul"));

    let btnDerecho = document.querySelector("#btn-derecho");
    btnDerecho.addEventListener("contextmenu",()=>cambiarColor("verde"));


    function cambiarColor(color) {
        let div = document.querySelector("#div");
        quitarClase(div);
        div.classList.add(color);
    }

    function quitarClase(div) {
        let clase = div.classList[0];
        if (clase != undefined) {
            div.classList.remove(clase);
        }
    }
});