'use strict';

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
            let src = item.getAttribute("data-js-source");
            if (src) { // если атрибут data-source присутствует
                item.src = src;
                item.setAttribute("data-js-loaded", "");
                item.removeAttribute("data-js-source");
                item.onerror = function() { // обработка ошибок загрузки
                    console.error("загрузка источника не удалась (элемент: " + item.tagName + ", путь: " + item.src + ")");
                };
                setTimeout(function() { // удаление обработчика ошибок
                    item.onerror = null;
                }, 3000);
            }
            if (callback) callback(item); // вызов callback, если необходимо
        }
    };

    lazy.init = function(settings) {

        // настройки по умолчанию
        settings = Object.assign({}, {
            items:    "[data-js-source]", // селектор элементов lazy-load
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



document.addEventListener("DOMContentLoaded", function() {

    // lazy-load
    lazy.init({
        on: "view", // при попадании во viewport
        callback: function(el) { // функция при загрузке
            el.classList.add("loading");
            el.onload = function() {
                el.classList.remove("loading");
                el.onload = null;
            }
        }
    });

    // отключение кеширования оригинальных картинок
    let images = document.querySelectorAll("[data-source]");
    images.forEach(function(el) {
        let source = el.getAttribute("data-source");
        el.setAttribute("data-source", source + "?" + Math.random());
    })
});