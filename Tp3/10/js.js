document.addEventListener("DOMContentLoaded",()=>{
    let btnsSiguiente = document.querySelectorAll("#slider .btn-sig");
    let btnsAnterior = document.querySelectorAll("#slider .btn-ant");
    btnsSiguiente.forEach(btn => {
        btn.addEventListener("click",siguienteSlide);
    });
    
    btnsAnterior.forEach(btn => {
        btn.addEventListener("click",anteriorSlide);
    });
    
    function siguienteSlide() {
        let slideActivo = document.querySelector("#slider .slide.activo");
        slideActivo.classList.remove("activo");
        slideActivo.classList.add("inactivo");
        let siguienteSlide = slideActivo.nextElementSibling;
        siguienteSlide.classList.add("activo");
    }

    function anteriorSlide() {
        let slideActivo = document.querySelector("#slider .slide.activo");
        slideActivo.classList.remove("activo");
        let anteriorSlide = slideActivo.previousElementSibling;
        anteriorSlide.classList.add("activo");
        anteriorSlide.classList.remove("inactivo");
    }

});