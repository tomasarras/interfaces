class Figura {
    ctx;
    coordenadas;
    colorHex;
    grd;

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

    setGradiente(colorFin) {
        this.grd.addColorStop(0, this.colorHex);
        this.grd.addColorStop(1, colorFin);
        this.ctx.fillStyle = this.grd;
    }

}

export default Figura;