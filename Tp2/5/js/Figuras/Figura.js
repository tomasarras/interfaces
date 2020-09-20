class Figura {
    ctx;
    coordenadas;
    colorHex;
    grd;
    nombre;

    constructor(coordenadas,ctx,colorHex) {
        this.ctx = ctx;
        this.colorHex = colorHex;
        this.coordenadas = new Array();
        this.coordenadas[0] = coordenadas[0];
        this.coordenadas[1] = coordenadas[1];
    }

    draw() {
        this.ctx.fillStyle = this.colorHex;
    }

    setGradiente() {
        this.grd.addColorStop(0, this.colorHex);
        this.grd.addColorStop(1, this.colorFin);
        this.ctx.fillStyle = this.grd;
    }

    setNombre(nombre) {
        this.nombre = nombre;
    }

    getNombre() {
        return this.nombre;
    }

    mover(coordenadas) {
        this.coordenadas[0] = coordenadas[0];
        this.coordenadas[1] = coordenadas[1];
    }

    reDibujar() {
        this.draw();
    }

    getCoordenadas() {
        return this.coordenadas;
    }

}

export default Figura;