'use strict';
let counter = 0;

!function (d) {
    let lazy = {};


    lazy.isVisible = function(el) {
        let coords = el.getBoundingClientRect();
        return (coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || d.documentElement.clientHeight);
    };

    lazy.get = function(e, callback) {
        let item = e.target || e;
        let event = e.type || false;
        if (event) item.removeEventListener(event, lazy.get); // удаление обработчика события
        if (!item.src) { // проверка элемента на наличие атрибута src
            return;
        }
        if (!item.hasAttribute("data-js-loaded")) {
            let src = item.getAttribute("data-src");
            if (src) { // если атрибут data-src присутствует
                item.src = src;

                item.setAttribute("data-js-loaded", "");
                item.removeAttribute("data-src");
            }
            if (callback) callback(item);
        }
    };

    lazy.init = function(settings) {
        // настройки по умолчанию
        settings = Object.assign({}, {
            items:    "[data-src]", // селектор элементов lazy-load
            on:       "click",         // click, view, hover
            callback: false,           // функция, вызываемая после загрузки источника
        }, settings);

        let els = d.querySelectorAll(settings.items);


        // обработчики событий
        if (settings.on === "view") { // для события с условным наимнованием "view"
            let onviewLoad = function() {
                Array.prototype.slice.call(els, 0).forEach(function(el) {
                    if (lazy.isVisible(el)) lazy.get(el, settings.callback); // проверка на видимость во viewport, lazy.get() принимает элемент
                });
            };

            // обработка событий для "view"
            window.addEventListener("scroll", onviewLoad);
            window.addEventListener("resize", onviewLoad);
            window.addEventListener("load", onviewLoad);
            if (screen.msOrientation || (screen.orientation || screen.mozOrientation || { type: false }).type) window.addEventListener("orientationchange", onviewLoad);
        } else {
            let eventName = (settings.on === "hover") ? "mouseover" : settings.on;
            Array.prototype.slice.call(els, 0).forEach(function(el) {
                el.addEventListener(eventName, function(e) {
                    lazy.get(e, settings.callback);
                }); // lazy.get() принимает событие
            });
        }
    };
    window.lazy = lazy;

}(document);



document.addEventListener("DOMContentLoaded", () => {

    lazy.init({
        on: "view", // при попадании во viewport
        callback: function(el) { // функция при загрузке
            el.classList.add("loading");
            el.onload = function() {
                el.classList.remove("loading");
                el.onload = null;
            }
            counter++;
            console.log(counter);
            loadCounter(counter);
        }
    });
});



function loadCounter(count) {
    let imgarr = document.getElementsByTagName("img").length;
    let info = document.querySelector('.info');

    info.innerHTML = `
        ${count} images loaded from ${imgarr}
    `;

    if (count === imgarr) {
        info.style.background = "#90ee91";
    }
}