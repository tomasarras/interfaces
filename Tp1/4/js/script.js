document.addEventListener("DOMContentLoaded", ()=>{
    let ctx = document.querySelector("#myCanvas").getContext('2d');

    rectanguloGradiente(ctx,500,500,0,0);
    
    function rectanguloGradiente(ctx,width,height,x,y) {
        let imageData = ctx.createImageData(width,height);
        let r = 0;
        let g = 0;
        let b = 0;
        let a = 255;
        let coeficiente = 255 / width;

        for (let x = 0; x < width; x++){
            r = x  * coeficiente;
            g = x  * coeficiente;
            b = x  * coeficiente;
            for (let y = 0; y < height; y++){
                setPixel(imageData,y,x,r,g,b,a);
            }
        }

        ctx.putImageData(imageData,x,y);
    }
    

    function setPixel(imageData,x,y,r,g,b,a) {
        let index = (x + y * imageData.width) * 4;
        imageData.data[index+0] = r;
        imageData.data[index+1] = g;
        imageData.data[index+2] = b;
        imageData.data[index+3] = a;
    }
});