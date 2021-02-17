let indexSlide = 0;
showSlides(indexSlide);

function plusSlide() {
    showSlides(indexSlide +=1);
    clearInterval(plusSlide);
}

function minusSlide() {
    showSlides(indexSlide -=1);
    clearInterval(plusSlide);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("item");
    if (n > slides.length) {
        indexSlide = 1;
    }
    if (n < 1) {
        indexSlide = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    indexSlide++;
    if (indexSlide > slides.length) {
        indexSlide = 1
    }
    slides[indexSlide - 1].style.display = "block";
    console.log(indexSlide);
}

setInterval(plusSlide, 3000);