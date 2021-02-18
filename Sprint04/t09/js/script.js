'use strict'

let textInput = document.getElementById("text__input").value;
let notes = document.getElementsByClassName("notes")[0];
let contentContainer = document.getElementsByClassName("content__container")[1];
let count = localStorage.length;

function AddToStorage() {

    let today = new Date();
    let date =
        String(today.getDate()).padStart(2, "0") +
        "." +
        String(today.getMonth() + 1).padStart(2, "0") +
        "." +
        (today.getFullYear() - 2000);

    let time =
        String(today.getHours()).padStart(2, "0") +
        ":" +
        String(today.getMinutes()).padStart(2, "0") +
        ":" +
        String(today.getSeconds()).padStart(2, "0");
    let dateTime = "[" + date + ", " + time + "]";

    textInput = document.getElementById("text__input").value;
    if (!textInput) {
        alert('It\'s empty. Try to input something in "Text input"');
    } else {
        let name = "note_" + count;

        localStorage.setItem(name, textInput + " " + dateTime);

        notes.textContent = Object.values(localStorage)
            .join("\n")
            .replace(/^/gim, "--> ");
        count++;
    }
}

if (localStorage.length === 0) {
    notes.textContent = "[Empty]";
}else {
    notes.textContent = Object.values(localStorage)
        .join("\n")
        .replace(/^/gim, "--> ");
}

document.getElementsByClassName("add")[0].onclick = function () {
    AddToStorage();
    console.log(localStorage);
};

document.getElementsByClassName("clear")[0].onclick = function () {
    let continueClear = confirm("Are you sure?");
    if (continueClear == true) {
        localStorage.clear();
        count = 0;
        console.log(localStorage);
        notes.textContent = "[Empty]";
    }
};