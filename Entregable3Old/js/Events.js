import Helper from "./Helper.js";

export default class Events extends Helper {
    static instance = new Events();

    static getInstance() {
        return this.instance;
    }

    start() {
        super.start();
    }

    onLoad() {
        this.asignarEventoAcordeon();
        let containerEvent = document.querySelector("section.events .container");
        containerEvent.classList.add("active");
    }

    asignarEventoAcordeon() {
        let divsTitle = document.querySelectorAll("ul.acordeon li div.title");
        divsTitle.forEach(divTitle => {
            divTitle.addEventListener("click",()=>{
                divTitle.nextElementSibling.classList.toggle("active");
            });
        });
    }
}

document.addEventListener("DOMContentLoaded",()=>Events.getInstance().start());