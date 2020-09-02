document.addEventListener("DOMContentLoaded", ()=>{
    let ctx = document.querySelector("#myCanvas").getContext('2d');

    rectanguloGradienteTresColores(ctx,500,500,0,0);
    
    function rectanguloGradienteTresColores(ctx,width,height,x,y) {
        let imageData = ctx.createImageData(width,height);
        let a = 255;
        let tercio = width / 3;
        let coeficiente = 255 / tercio;
        let r = 0;
        let g = 0;
        let b = 0;

        for (let y = 0; y < height; y++) {
            r = 0;
            g = 255;
            b = 255;

            for (let x = 0; x < width; x++){

                if (x < tercio) { //1/3
                    r = r + coeficiente;
                    g = g - (coeficiente / 2);
                    b = b - coeficiente;
                } else if ( x < (tercio * 2) ) { // 2/3
                    g = g - (coeficiente / 2);
                    b = b + coeficiente;
                } else { // 3/3
                    g = g + coeficiente;
                    b = b - coeficiente;
                }

                setPixel(imageData,x,y,r,g,b,a);
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