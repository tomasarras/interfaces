document.addEventListener("DOMContentLoaded", ()=>{
    let ctx = document.querySelector("#myCanvas").getContext('2d');

    let imagen = new Image();
    imagen.src = "./img/download.png";
    imagen.onload = function() { dibujarImagen(this) };

    function dibujarImagen(imagen) {
        ctx.drawImage(imagen,0,0);
    }

});