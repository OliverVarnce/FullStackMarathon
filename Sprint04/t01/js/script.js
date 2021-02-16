'use strict'

let liarr = document.getElementsByTagName("li");

for (let i = 0; i < liarr.length; i++) {
    let licurrent = liarr[i];
    let attrs = licurrent.attributes;

    if (licurrent.hasAttributes() === false ||
       (licurrent.getAttribute("class") !== "good" &&
       licurrent.getAttribute("class") !== "evil" &&
       licurrent.getAttribute("class") !== "unknown")) {
        licurrent.setAttribute("class", "unknown");

    if (!attrs['data-element']) {
            licurrent.setAttribute("data-element","none")
        }
    }


}