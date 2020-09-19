class Figura {
    ctx;
    coordenadas;
    colorHex;
    tieneGradiente;
    tieneImg;
    grd;

    constructor(coordenadas,ctx,colorHex) {
        this.ctx = ctx;
        this.colorHex = colorHex;
        this.coordenadas = new Array();
        this.coordenadas[0] = coordenadas[0];
        this.coordenadas[1] = coordenadas[1];
        this.tieneGradiente = false;
    }

    draw() {
        if (!this.tieneGradiente & !this.tieneImg) {
            this.ctx.fillStyle = this.colorHex;
        }
    }

    getImagenRandom() {
        let cantidadImagenes = 5;
        let random = Math.round(Math.random() * (cantidadImagenes -1));
        let imagenes = document.querySelectorAll(".js-img");
        return imagenes[random];
    }

    setGradiente(color) {
        this.grd.addColorStop(0, this.colorHex);
        this.grd.addColorStop(1, color);
        this.ctx.fillStyle = this.grd;
        this.tieneGradiente = true;
    }

    setImagen() {
        this.tieneImg = true;
    }
}

export default Figura;