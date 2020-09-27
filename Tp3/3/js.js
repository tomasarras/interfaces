document.addEventListener("DOMContentLoaded",()=>{
    setInterval(() => {
        let date = new Date();
        let divSegundos = document.querySelector(".segundos");
        let divMinutos = document.querySelector(".minutos");
        let divHoras = document.querySelector(".horas");

        let segundos = date.getSeconds() * 6;
        let minutos = date.getMinutes() * 6;
        let horas = date.getHours() * 30;

        segundos = darVuelta(segundos);
        minutos = darVuelta(minutos);
        horas = darVuelta(horas);

        divSegundos.style.transform = "rotate("+segundos+"deg)";
        divMinutos.style.transform = "rotate("+minutos+"deg)";
        divHoras.style.transform = "rotate("+horas+"deg)";
    }, 1000);

    function darVuelta(grados) {
        if (grados <= 180) {
            return grados + 180;
        } else {
            return grados - 180;
        }
    }

});