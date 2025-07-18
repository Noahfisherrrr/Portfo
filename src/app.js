const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.nextBtn');
const prevBtn = document.querySelector('.prevBtn');

const form = document.getElementById("hireForm");
const hireMeBtn = document.getElementById("hireMeBtn");
const modalHire = document.getElementById("hireMeModal");
const closeBtn = document.querySelector(".close-btn");

const skillsSection = document.querySelector('.skills');

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

// hireme modal
hireMeBtn.addEventListener("click", () => {
    modalHire.style.display = "flex"
});

closeBtn.addEventListener("click", () => {
    modalHire.style.display = "none";
    form.reset();

});

window.addEventListener("click", (e) => {
    if (e.target === modalHire) {
        modalHire.style.display = "none";
        form.reset();
    }
});

skillsSection.addEventListener('mouseenter', () => {
  document.querySelectorAll('.skill').forEach(skill => {
    const fill = skill.querySelector('.fill');
    const percent = skill.getAttribute('data-percent');
    fill.style.width = percent + '%';
  });
});

skillsSection.addEventListener('mouseleave', () => {
  document.querySelectorAll('.fill').forEach(fill => {
    fill.style.width = '0';
  });
});