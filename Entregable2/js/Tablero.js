import Contenedor from "./Contenedor.js";
import { X,Y, AZUL,ROJA,RADIO_FICHAS,ANCHO_CONTENEDORES,ALTO_CONTENEDORES } from "./constantes.js";
import CanvasHelper from "./Helper/CanvasHelper.js";
import Ficha from "./Ficha.js";

class Tablero {
    filas;
    columnas;
    contenedores;
    fichas;
    mouseDown;
    mouseMove;
    mouseUp;
    fichaSeleccionada;
    turno;
    inicioTableroX;
    finTableroX;

    constructor(filas,columnas) {
        this.filas = filas;
        this.columnas = columnas;
        this.contenedores = new Array();
        this.fichas = new Array();
        this.mouseDown = this.seleccionarFicha.bind(this);
        this.mouseMove = this.moverFicha.bind(this);
        this.mouseUp = this.deseleccionarFicha.bind(this);
        this.fichaSeleccionada = null;
        this.turno = null;
    }

    iniciarTablero() {
        this.crearTablero();
        this.crearFichas();
        this.asignarEventos();
    }

    crearTablero() {
        let anchoContenedor = ANCHO_CONTENEDORES;
        let altoContenedor = ALTO_CONTENEDORES;
        let coordenadas = new Array();
        let contenedor;
        let tableroHeight = altoContenedor * this.filas;
        let tableroWidth = anchoContenedor * this.columnas;
        let desplazamientoX = (CanvasHelper.getWidth() - tableroWidth) / 2;
        let desplazamientoY = CanvasHelper.getHeight() - tableroHeight;
        this.inicioTableroX = desplazamientoX;
        this.finTableroX = tableroWidth + desplazamientoX;

        for (let fila = 0; fila < this.filas; fila++) {
            this.contenedores[fila] = new Array();
            for (let columna = 0; columna < this.columnas; columna++) {
                coordenadas[X] = (columna * anchoContenedor) + desplazamientoX;
                coordenadas[Y] = (fila * altoContenedor) + desplazamientoY;
                contenedor = new Contenedor(coordenadas,anchoContenedor,altoContenedor);
                contenedor.setFila(fila);
                contenedor.setColumna(columna);
                this.contenedores[fila][columna] = contenedor;
                contenedor.dibujar();
            }
        }
    }

    crearFichas() {
        let cantidadFichas = this.filas * this.columnas;
        let fichasPorJugador = cantidadFichas / 2;
        let ficha;
        let radio = RADIO_FICHAS;
        let imgFicha1 = document.querySelector("#js-ficha-1");
        let imgFicha2 = document.querySelector("#js-ficha-2");

        for (let i = 0; i < cantidadFichas; i++) {
            if (i <= fichasPorJugador) {
                ficha = new Ficha(radio,imgFicha1,AZUL);
            } else {
                ficha = new Ficha(radio,imgFicha2,ROJA);
            }
            this.asignarPosicionFicha(ficha);
            this.fichas[i] = ficha;
            ficha.dibujar();
        }
    }
    
    asignarPosicionFicha(ficha) {
        let coordenadas = new Array();
        let inicioX;
        let finX;
        let inicioY = 400;
        let finY = CanvasHelper.getHeight() - ficha.getRadio();
        if (ficha.getColor() == AZUL) {
            inicioX = ficha.getRadio();
            finX = this.inicioTableroX - ficha.getRadio();
            coordenadas = this.getPosicionRandom(inicioX,finX,inicioY,finY);
        } else {
            inicioX = this.finTableroX + ficha.getRadio();
            finX = CanvasHelper.getWidth() - ficha.getRadio();
            coordenadas = this.getPosicionRandom(inicioX,finX,inicioY,finY);
        }
        ficha.mover(coordenadas);
    }

    getPosicionRandom(x1,x2,y1,y2) {
        let coordenadas = new Array();
        let distanciaX = x2 - x1;
        let distanciaY = y2 - y1;
        let randomX = x1 + Math.round(Math.random() * distanciaX);
        let randomY = y1 + Math.round(Math.random() * distanciaY);
        coordenadas[X] = randomX;
        coordenadas[Y] = randomY;
        return coordenadas;
    }

    asignarEventos() {
        let canvas = CanvasHelper.getCanvas();
        canvas.addEventListener("mousedown",this.mouseDown);
        canvas.addEventListener("mouseup",this.mouseUp);
    }

    seleccionarFicha(e) {
        let ficha = this.buscarFicha(e);
        if (ficha != null & !ficha.estaEnContenedor()) {
            if (this.turno == null) {
                this.turno = ficha.getColor();
            }

            if (this.turno == ficha.getColor()) {
                this.fichaSeleccionada = ficha;
                let canvas = CanvasHelper.getCanvas();
                canvas.addEventListener("mousemove",this.mouseMove);
            }
        }
    }

    deseleccionarFicha() {
        if (this.fichaSeleccionada != null) {
            let numeroColumna = this.buscarColumna(this.fichaSeleccionada);
            if (numeroColumna != -1) {
                this.insertarFichaEnColumna(this.fichaSeleccionada,numeroColumna);
                this.cambiarTurno();
                CanvasHelper.limpiarCanvas();
                this.actualizarTablero();
                this.actualizarFichas();
                this.comprobarGanador(this.fichaSeleccionada);
                this.fichaSeleccionada = null;
            }
        }
        let canvas = CanvasHelper.getCanvas();
        canvas.removeEventListener("mousemove",this.mouseMove);
    }

    buscarColumna(ficha) {
        let numeroColumna = 0;
        let encontrada = false;
        while (numeroColumna < this.columnas & !encontrada) {
            encontrada = ficha.estaPorEncimaDeColumna(this.contenedores[0][numeroColumna]);
            numeroColumna++;
        }

        if (encontrada)
            return numeroColumna-1;
        else
            return -1;
    }

    insertarFichaEnColumna(ficha,numeroColumna) {
        let numeroFila = this.filas -1;
        let insertada = false;
        let contenedorActual;
        while (numeroFila >= 0 & !insertada) {
            contenedorActual = this.contenedores[numeroFila][numeroColumna];
            if (contenedorActual.contieneFicha()) {
                numeroFila--;
            } else {
                contenedorActual.setFicha(ficha);
                ficha.asignarContenedor(contenedorActual);
                insertada = true;
            }
        }
    }
    
    buscarFicha(e) {
        let coordenadas = CanvasHelper.getMousePosition(e);
        let encontrada = false;
        let i = 0;
        
        while (i < this.fichas.length & !encontrada) {
            encontrada = this.fichas[i].isClickeada(coordenadas);
            i++;
        }

        if (encontrada)
            return this.fichas[i-1];
        else
            return null;
    }

    moverFicha(e) {
        let coordenadas = CanvasHelper.getMousePosition(e);
        this.fichaSeleccionada.mover(coordenadas);
        CanvasHelper.limpiarCanvas();
        this.actualizarTablero();
        this.actualizarFichas();
    }

    actualizarFichas() {
        for (let i = 0; i < this.fichas.length; i++) {
            this.fichas[i].reDibujar();
        }
    }

    actualizarTablero() {
        for (let i = 0; i < this.contenedores.length; i++) {
            for (let j = 0; j < this.contenedores[i].length; j++) {
                this.contenedores[i][j].reDibujar();
            }
        }
    }

    comprobarGanador(ficha) {
        let contenedorFicha = ficha.getContenedor();
        let fila = contenedorFicha.getFila();
        let columna = contenedorFicha.getColumna();
        let gano = false;
        gano = this.comprobarAreaDeFicha(fila,columna)
        if (gano) {
            alert("GANADOR")
        }
    }

    comprobarAreaDeFicha(fila,columna) {
        let gano = false;
        let i = -3;
        let j = -3;
        let filaAux;
        let columnaAux;

        while ((i <= 3) & !gano) {
            j = -3;
            while ((j <= 3) & !gano) {
                filaAux = fila + i;
                columnaAux = columna + j;

                if ((filaAux >= 0 & filaAux < this.filas) & (columnaAux >= 0 & columnaAux < this.columnas)) {
                    gano = this.comprobarFicha(filaAux,columnaAux);
                }
                j++;
            }
            i++;
        }

        return gano;
    }

    comprobarFicha(fila,columna) {
        let contenedor1 = this.contenedores[fila][columna];
        let contenedor2;
        let iguales;

        let horizontalDerecha = i =>       { return this.contenedores[fila][columna + i]; };
        let horizontalIzquierda = i =>     { return this.contenedores[fila][columna + (i *-1)]; };
        let verticalArriba = i =>          { return this.contenedores[fila + (i *-1)][columna]; };
        let verticalAbajo = i =>           { return this.contenedores[fila + i][columna]; };
        let diagonalArribaDerecha = i =>   { return this.contenedores[fila + i][columna + i]; };
        let diagonalAbajoIzquierda = i =>  { return this.contenedores[fila + (i *-1)][columna + (i *-1)]; };
        let diagonalArribaIzquierda = i => { return this.contenedores[fila + i][columna + (i *-1)]; };
        let diagonalAbajoDerecha = i =>    { return this.contenedores[fila + (i *-1)][columna + i]; };

        let direcciones = new Array();
        direcciones[0] = horizontalDerecha;
        direcciones[1] = horizontalIzquierda;
        direcciones[2] = verticalArriba;
        direcciones[3] = verticalAbajo;
        direcciones[4] = diagonalArribaDerecha;
        direcciones[5] = diagonalAbajoIzquierda;
        direcciones[6] = diagonalArribaIzquierda;
        direcciones[7] = diagonalAbajoDerecha;

        for (let direccion = 0; direccion < direcciones.length; direccion++){
            let i = 1;
            iguales = true;
            while ( (i < 4) & iguales) {
                try {
                    contenedor2 = direcciones[direccion](i);
                } catch (error) {
                    contenedor2 = undefined;
                }
                if (contenedor2 != undefined) {
                    iguales = contenedor1.comparar(contenedor2);
                    i++;
                } else {
                    iguales = false;
                }
            }

            if (iguales) {
                return true;
            }
        }

        return false;
    }


    cambiarTurno() {
        if (this.turno == AZUL) {
            this.turno = ROJA;
        } else {
            this.turno = AZUL;
        }
    }
}

export default Tablero;