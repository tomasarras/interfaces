document.addEventListener("DOMContentLoaded", ()=>{
    let width = 1024;
    let height = 512;
    let ctx = document.querySelector("#myCanvas").getContext('2d');
    let btnBlancoNegro = document.querySelector("#js-filtro-blanco-negro");
    btnBlancoNegro.addEventListener("click",agregarFiltroBlancoNegro);

    let imagen = new Image();
    imagen.src = "./img/download.jpg";
    imagen.onload = function() { dibujarImagen(this) };

    function dibujarImagen(imagen) {
        ctx.drawImage(imagen,0,0);
    }

    function agregarFiltroBlancoNegro() {
        let imageData = ctx.getImageData(0,0,width,height);
        for (let x = 0; x < imageData.width; x++) {
            for (let y = 0; y < imageData.height; y++) {
                r = getRed(imageData,x,y);
                g = getGreen(imageData,x,y);
                b = getBlue(imageData,x,y);

                prom = (r + g + b) / 3;
                setPixel(imageData,x,y,prom,prom,prom,255);
            }
        }
        ctx.putImageData(imageData,0,0);
    }

    function getRed(imageData,x,y){
        index = (x + y * imageData.width) * 4;
        return imageData.data[index+0];
    }

    function getGreen(imageData,x,y){
        index = (x + y * imageData.width) * 4;
        return imageData.data[index+1];
    }

    function getBlue(imageData,x,y){
        index = (x + y * imageData.width) * 4;
        return imageData.data[index+2];
    }

    function setPixel(imageData,x,y,r,g,b,a) {
        let index = (x + y * imageData.width) * 4;
        imageData.data[index+0] = r;
        imageData.data[index+1] = g;
        imageData.data[index+2] = b;
        imageData.data[index+3] = a;
    }

});