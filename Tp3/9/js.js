document.addEventListener("DOMContentLoaded",()=>{
    let btn = document.querySelector("#btn-progreso");
    btn.addEventListener("click",()=>{
        document.querySelector("#btn-progreso div").classList.add("cargando");
    });
});