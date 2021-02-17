'use strict'

let counter = 1;

function transformation() {
    if (counter === 1) {
        let button = document.getElementById("btn");
        button.style.background = "#70964b";

        let hero = document.getElementById("hero");
        hero.textContent = "Hulk";
        hero.style.fontSize = "130px";
        hero.style.letterSpacing = "6px";
        counter = 2;
    } else {
        let lab = document.getElementById("lab");
        lab.style.background = "#ffb300";

        let hero = document.getElementById("hero");
        hero.textContent = "Bruce Banner";
        hero.style.fontSize = "60px";
        hero.style.letterSpacing = '2px';
        let button = document.getElementById("btn");
        button.removeAttribute("style");

        counter = 1;
    }

}