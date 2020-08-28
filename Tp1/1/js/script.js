document.addEventListener("DOMContentLoaded", ()=>{
    
    const MAX_FILA = 5;
    const MAX_COL = 5;

    let matriz = []
    
    cargarMatrizRandom(matriz);
    console.table(matriz);

    function promediosMatriz(matriz) {// C)
        let promedios = [];
        for (let i = 0; i < MAX_FILA; i++) {
            promedios[i] = promedioFilaMatriz(matriz,i);
        }

        return promedios;
    }

    function promedioFilaMatriz(matriz,fila) {
        let prom = 0;

        for (let i = 0; i < MAX_COL; i++){
            prom += matriz[fila][i];
        }

        return prom / MAX_COL;
    }

    function maxParesMinImparesMatriz(matriz){// B)
        let max = maxValueFilaMatriz(matriz,0);
        let min = minValueFilaMatriz(matriz,1);
        let par = true;
        let valueFila;
        for (let i = 2; i < MAX_FILA; i++){
            if (par) {
                valueFila = maxValueFilaMatriz(matriz,i);
                if (max < valueFila) {
                    max = valueFila;
                }
            } else {
                valueFila = minValueFilaMatriz(matriz,i);
                if (valueFila < min) {
                    min = valueFila;
                }
            }
            
            par = !par;
        }

        let retorno = [];
        retorno[0] = min;
        retorno[1] = max;

        return retorno;
    }
    

    function maxValueFilaMatriz(matriz,fila){// retorna el valor maximo de una fila
        let max = matriz[fila][0];
        for (let i = 0; i < MAX_COL; i++){
            if (matriz[fila][i] > max) {
                max = matriz[fila][i];
            }
        }

        return max;
    }

    function minValueFilaMatriz(matriz,fila) {// retorna el valor minimo de una fila
        let min = matriz[fila][0];
        for (let i = 0; i < MAX_COL; i++){
            if (matriz[fila][i] < min) {
                min = matriz[fila][i];
            }
        }

        return min;
    }

    function cargarMatrizRandom(matriz) {
        for (let i = 0; i < MAX_FILA; i++) {
            matriz[i] = new Array();
            for (let j = 0; j < MAX_COL; j++) {
                matriz[i][j] = Math.round(Math.random() * 99 + 1);
            }
        }
    }

    function maxValueMatriz(matriz) {// A)
        let max = matriz[0][0];
        for (let i = 0; i < MAX_FILA; i++){
            for (let j = 0; j < MAX_COL; j++){
                if (matriz[i][j] > max){
                    max = matriz[i][j];
                }
            }
        }
        
        return max;
    }

});