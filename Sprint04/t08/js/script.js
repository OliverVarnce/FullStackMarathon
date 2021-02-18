'use strict'

let $countButton = document.getElementById("count");
let $phoneButton = document.getElementById("phone");
let $output = document.getElementsByClassName("notes")[0];
let $replaceButton = document.getElementById("replace");
let $textInput = document.getElementById("text__input");
let $wordInput = document.getElementById("word__input");

$phoneButton.counter = 0;
$countButton.counter = 0;
$replaceButton.counter = 0;

let minute = new Date();
minute.setTime(minute.getTime() + 60 * 1000);

for (let button of document.getElementsByClassName("apply")) {
    document.cookie.split(" ").forEach(function (item, index, arr) {
        if (item.includes(button.id)) {
            let number = item.replace(/[^\d]/g, "");
            button.counter = number;
            button.innerHTML = button.innerHTML.replace(/\b\d+\b/gim, number);
        }
    });
    button.addEventListener("click", () => {
        button.counter++;
        button.innerHTML = button.innerHTML.replace(/\b\d+\b/gim, button.counter);
        document.cookie = button.id + "="+button.counter+'; expires='+minute;
    });
}

$phoneButton.onclick = function () {
    let value = $wordInput.value;
    if(value.match(/\b\d+\b/) && value.length === 10){
        value = value.split('')
        value.splice(3,0,'-')
        value.splice(7,0,'-');
        $output.textContent = value.join('')
    }else{
        $output.textContent = 'invalid phone number'
    }
};
$countButton.onclick = function () {
    let value = $wordInput.value;
    let text = $textInput.value;
    let occCounter = 0;
    text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    text = text.replace(/\s{2,}/g," ");
    text = text.split(' ')
    text.forEach((item, index, arr)=>{
        if(item === value){
            console.log(item);
            occCounter++
        }
    })
    $output.textContent = 'Word count: ' + occCounter
};
$replaceButton.onclick = function () {
    let value = $wordInput.value;
    let text = $textInput.value;
    text = text.split(' ')
    for(let i = 0; i<text.length; i++){
        text[i] = value
    }
    text = text.join(' ')
    $output.textContent = text;
};