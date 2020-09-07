document.addEventListener("DOMContentLoaded",()=>{
    const width = 300;
    const height = 300;
    let canvas = document.querySelector("#js-canvas");
    canvas.addEventListener("mousedown",(e)=> dibujar(e) );

    function dibujar(e) {
        let coordenadas = {
            "x" : parseInt(e.layerX),
            "y" : parseInt(e.layerY)
        };

        let color = {
            "r" : 255,
            "g" : 0,
            "b" : 0,
            "a" : 255
        };

        let ctx = document.querySelector("#js-canvas").getContext("2d");
        let imageData = ctx.getImageData(0,0,width,height);
        setPixel(imageData,coordenadas,color);
        ctx.putImageData(imageData,0,0);

        let handler = (event) => {
            coordenadas = dibujoMovimiento(coordenadas,imageData,event,color);
        };

        canvas.addEventListener("mousemove", handler);
        canvas.addEventListener("mouseup", ()=>{
            canvas.removeEventListener("mousemove",handler);
        });
    }

    function dibujoMovimiento(ultimasCoordenadas,imageData,e,color) {
        let ctx = document.querySelector("#js-canvas").getContext("2d");
        let nuevasCoordenadas = {
            "x" : e.layerX,
            "y" : e.layerY
        }
        
        while (nuevasCoordenadas.x != ultimasCoordenadas.x || nuevasCoordenadas.y != ultimasCoordenadas.y) {
            if (nuevasCoordenadas.x > ultimasCoordenadas.x) {
                ultimasCoordenadas.x++;
            } else if (nuevasCoordenadas.x < ultimasCoordenadas.x) {
                ultimasCoordenadas.x--;
            }
            
            if (nuevasCoordenadas.y > ultimasCoordenadas.y) {
                ultimasCoordenadas.y++;
            } else if (nuevasCoordenadas.y < ultimasCoordenadas.y) {
                ultimasCoordenadas.y--;
            }

            setPixel(imageData,ultimasCoordenadas,color);
            ctx.putImageData(imageData,0,0);
        }

        return nuevasCoordenadas;
    }

    function setPixel(imageData,coordenadas,color) {
        let index = (coordenadas.x + coordenadas.y * imageData.width) * 4;
        imageData.data[index+0] = color.r;
        imageData.data[index+1] = color.g;
        imageData.data[index+2] = color.b;
        imageData.data[index+3] = color.a;
    }
});