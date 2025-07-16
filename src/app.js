const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.nextBtn');
const prevBtn = document.querySelector('.prevBtn');

let currentSlideIndex = 0;
let intervalId = null;

function showSlide(index){
   slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
        slide.classList.add('active')
    }
   });
};

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
};

function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(currentSlideIndex);
};

function autoPlay() {
    intervalId = setInterval(nextSlide, 5000);
};

function stopPlay (){
    clearInterval(intervalId);
};
showSlide(currentSlideIndex);
autoPlay();

nextBtn.addEventListener('click', () => {
    nextSlide();
    stopPlay();
    autoPlay();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    stopPlay();
    autoPlay();
});

slider.addEventListener('mouseenter', stopPlay);
slider.addEventListener('mouseleave', autoPlay);