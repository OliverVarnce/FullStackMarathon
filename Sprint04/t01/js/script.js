'use strict'

let liarr = document.getElementsByTagName("li");

for (let i = 0; i < liarr.length; i++) {
    let licurrent = liarr[i];

    if (licurrent.hasAttributes() === false ||
       (licurrent.getAttribute("class") !== "good" &&
       licurrent.getAttribute("class") !== "evil" &&
       licurrent.getAttribute("class") !== "unknown")) {
        licurrent.setAttribute("class", "unknown");
    }

    let attrs = licurrent.attributes;

    if (!attrs['data-element']) {
            licurrent.setAttribute("data-element","none")
        }

    let dataElement = licurrent.getAttribute("data-element").split(" ");
    let paragraph = document.createElement("br");

    licurrent.appendChild(paragraph);

    let circle;

    function divAppend() {
        let circleDiv = document.createElement("div");
        circle = document.createAttribute("class");
        licurrent.appendChild(circleDiv);
        circleDiv.setAttributeNode(circle);
        circle.value = "elem";

        if (dataElement.includes("none")) {
            let lineDiv = document.createElement("div");
            let line = document.createAttribute("class");
            lineDiv.setAttributeNode(line);
            circleDiv.appendChild(lineDiv);
            line.value = "line";
        }

    }

    for (let j = 0; j < dataElement.length; j++) {
        divAppend();
        circle.value += " " + dataElement[j];
    }
}