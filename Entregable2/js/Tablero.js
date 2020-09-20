import Contenedor from "./Contenedor.js";
import { X,Y, VERDE,ROJA,RADIO_FICHAS,ANCHO_CONTENEDORES,ALTO_CONTENEDORES } from "./constantes.js";
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
    offsetFicha;
    height;
    width;
    turno;
    inicioTableroX;
    finTableroX;
    ganador;
    imgFondoMadera;
    static instance = new Tablero();

    crear(filas,columnas) {
        this.filas = filas;
        this.columnas = columnas;
        this.contenedores = new Array();
        this.fichas = new Array();
        this.mouseDown = this.seleccionarFicha.bind(this);
        this.mouseMove = this.moverFicha.bind(this);
        this.mouseUp = this.deseleccionarFicha.bind(this);
        this.fichaSeleccionada = null;
        this.offsetFicha = null;
        this.turno = null;
        this.inicioTableroX = null;
        this.finTableroX = null;
        this.ganador = null;
        let fondoMadera = document.querySelector("#js-fondo-tablero");
        this.imgFondoMadera = new Image();
        this.imgFondoMadera.src = fondoMadera.src;
        this.height = ALTO_CONTENEDORES * this.filas;
        this.width = ANCHO_CONTENEDORES * this.columnas;
    }

    static getInstance() {
        return this.instance;
    }

    iniciarTablero() {
        this.crearTablero();
        this.crearFichas();
        this.asignarEventos();
        this.mostrarTextoJugadores();
    }

    mostrarTextoJugadores() {
        let ctx = CanvasHelper.getCtx();
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";

        if (this.ganador == null) {
            ctx.fillText("Jugador 1", 10, 50);
            ctx.fillText("Jugador 2", CanvasHelper.getWidth() -150, 50);
        } else {
            if (this.ganador == VERDE) {
                ctx.fillText("Jugador 1 GANADOR!", 10, 50);
                ctx.fillText("Jugador 2", CanvasHelper.getWidth() -150, 50);
            } else {
                ctx.fillText("Jugador 1", 10, 50);
                ctx.fillText("Jugador 2 GANADOR!", CanvasHelper.getWidth() -320, 50);
            }
        }
    }

    crearTablero() {
        let coordenadas = new Array();
        let contenedor;
        let desplazamientoX = (CanvasHelper.getWidth() - this.width) / 2;
        let desplazamientoY = CanvasHelper.getHeight() - this.height;
        this.inicioTableroX = desplazamientoX;
        this.finTableroX = this.width + desplazamientoX;
        this.inicioTableroY = CanvasHelper.getHeight() - this.height;

        this.mostrarFondoMadera();

        for (let fila = 0; fila < this.filas; fila++) {
            this.contenedores[fila] = new Array();
            for (let columna = 0; columna < this.columnas; columna++) {
                coordenadas[X] = (columna * ANCHO_CONTENEDORES) + desplazamientoX;
                coordenadas[Y] = (fila * ALTO_CONTENEDORES) + desplazamientoY;
                contenedor = new Contenedor(coordenadas,ANCHO_CONTENEDORES,ALTO_CONTENEDORES);
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
            if (i < fichasPorJugador) {
                ficha = new Ficha(radio,imgFicha1,VERDE);
            } else {
                ficha = new Ficha(radio,imgFicha2,ROJA);
            }
            let accion = (coordenadas,ficha) => ficha.mover(coordenadas);
            this.asignarPosicionFicha(ficha,accion);
            this.fichas[i] = ficha;
            ficha.dibujar();
        }
    }

    mostrarFondoMadera() {
        let coordenadasFondo = new Array();
        coordenadasFondo[X] = this.inicioTableroX;
        coordenadasFondo[Y] = this.inicioTableroY;
        let cargarImg = () => CanvasHelper.agregarImagen(this.imgFondoMadera,coordenadasFondo,this.width,this.height);
        this.imgFondoMadera.onload = cargarImg.bind(this);
    }

    actualizarFondoMadera() {
        let coordenadasFondo = new Array();
        coordenadasFondo[X] = this.inicioTableroX;
        coordenadasFondo[Y] = this.inicioTableroY;
        CanvasHelper.agregarImagen(this.imgFondoMadera,coordenadasFondo,this.width,this.height);
    }
    
    asignarPosicionFicha(ficha,accion) {
        let coordenadas = new Array();
        let inicioX;
        let finX;
        let inicioY = 400;
        let finY = CanvasHelper.getHeight() - ficha.getRadio();
        if (ficha.getColor() == VERDE) {
            inicioX = ficha.getRadio();
            finX = this.inicioTableroX - ficha.getRadio();
            coordenadas = this.getPosicionRandom(inicioX,finX,inicioY,finY);
        } else {
            inicioX = this.finTableroX + ficha.getRadio();
            finX = CanvasHelper.getWidth() - ficha.getRadio();
            coordenadas = this.getPosicionRandom(inicioX,finX,inicioY,finY);
        }
        accion(coordenadas,ficha);
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
        if (ficha != null) {
            if (this.turno == null) {
                this.turno = ficha.getColor();
            }

            if (this.puedeMoverFicha(ficha)) {
                this.fichaSeleccionada = ficha;
                this.offsetFicha = ficha.calcularOffset(e);
                let canvas = CanvasHelper.getCanvas();
                canvas.addEventListener("mousemove",this.mouseMove);
            }
        }
    }

    puedeMoverFicha(ficha) {
        return ( this.turno == ficha.getColor() ) & ( !ficha.estaEnContenedor() ) & (this.ganador == null);
    }

    deseleccionarFicha() {
        if (this.fichaSeleccionada != null) {
            let numeroColumna = this.buscarColumna(this.fichaSeleccionada);
            if (numeroColumna != -1) {
                this.insertarFichaEnColumna(this.fichaSeleccionada,numeroColumna);
                this.cambiarTurno();
                this.actualizarTodo();
                this.comprobarGanador(this.fichaSeleccionada);
                this.fichaSeleccionada = null;
            } else {
                this.devolverFicha(this.fichaSeleccionada);
            }
        }
        let canvas = CanvasHelper.getCanvas();
        canvas.removeEventListener("mousemove",this.mouseMove);
    }

    devolverFicha(ficha) {
        let orden = ()=> {
            let tablero = Tablero.getInstance();
            this.actualizarFondoMadera();
            tablero.actualizarTablero();
            tablero.actualizarFichas();
            tablero.mostrarTextoJugadores();
        }
        let accion = (coordenadas,ficha) => ficha.animar(coordenadas,10,orden);
        this.asignarPosicionFicha(ficha,accion);
        this.fichaSeleccionada = null;
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
        coordenadas[X] = coordenadas[X] - this.offsetFicha[X];
        coordenadas[Y] = coordenadas[Y] - this.offsetFicha[Y];
        this.fichaSeleccionada.mover(coordenadas);
        this.actualizarTodo();
    }

    actualizarTodo() {
        CanvasHelper.limpiarCanvas();
        this.actualizarFondoMadera();
        this.actualizarTablero();
        this.actualizarFichas();
        this.mostrarTextoJugadores();
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
            this.ganador = ficha.getColor();
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
                this.cambiarColorFichas(contenedor1,direcciones[direccion]);
                return true;
            }
        }

        return false;
    }

    cambiarColorFichas(contenedor,direccion) {
        let imgFichaGanadora = document.querySelector("#js-ficha-3");
        let ficha = contenedor.getFicha();
        ficha.setGanadora(imgFichaGanadora);
        for (let i = 1; i <= 3; i++) {
            contenedor = direccion(i);
            ficha = contenedor.getFicha();
            ficha.setGanadora(imgFichaGanadora);
        }
    }

    cambiarTurno() {
        if (this.turno == VERDE) {
            this.turno = ROJA;
        } else {
            this.turno = VERDE;
        }
    }
}

export default Tablero;