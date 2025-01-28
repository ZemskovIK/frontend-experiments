let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
    if (index >= slides.length) currentIndex = 0;
    if (index < 0) currentIndex = slides.length - 1;
    
    slides.forEach(slide => slide.style.display = "none");
    dots.forEach(dot => dot.classList.remove("active"));

    slides[currentIndex].style.display = "block";
    dots[currentIndex].classList.add("active");
}

function changeSlide(step) {
    currentIndex += step;
    showSlide(currentIndex);
}

function setSlide(index) {
    currentIndex = index - 1;
    showSlide(currentIndex);
}

showSlide(currentIndex);
