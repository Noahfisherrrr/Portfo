const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.nextBtn');
const prevBtn = document.querySelector('.prevBtn');

const form = document.getElementById("hireForm");
const hireMeBtn = document.getElementById("hireMeBtn");
const modalHire = document.getElementById("hireMeModal");
const closeBtn = document.querySelector(".close-btn");

const skillsSection = document.querySelector('.skills');

lucide.createIcons();

let currentSlideIndex = 0;
let slideTimeout = null;

function showSlide(index){
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
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
    slideTimeout = setTimeout(() => {
        nextSlide();
        autoPlay(); // recursive
    }, 5000);
};

function stopPlay (){
    clearTimeout(slideTimeout);
};

showSlide(currentSlideIndex);
autoPlay();

nextBtn.addEventListener('click', () => {
    stopPlay();
    nextSlide();
    autoPlay();
});

prevBtn.addEventListener('click', () => {
    stopPlay();
    prevSlide();
    autoPlay();
});

slider.addEventListener('mouseenter', stopPlay);
slider.addEventListener('mouseleave', autoPlay);

// hireme modal
hireMeBtn.addEventListener("click", () => {
    modalHire.style.display = "flex";
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

// Reviews
const reviews = [
    {
        text: "Exceptional service and attention to detail. Highly recommended!",
        avatar: "https://i.pravatar.cc/100?img=45",
        title: "UX Designer",
        name: "Mau Thomas"
    },
    {
        text: "Truly professional work. The website runs flawlessly and looks amazing!",
        avatar: "https://i.pravatar.cc/100?img=12",
        title: "Freelancer",
        name: "John Smith"
    },
    {
        text: "Timely delivery, clean code, and great communication throughout the project.",
        avatar: "https://i.pravatar.cc/100?img=25",
        title: "Project Manager",
        name: "Helen Lee"
    }
];

let currentReview = 0;

function updateReview(index) {
    currentReview = index;
    document.getElementById("review-text").textContent = reviews[index].text;
    document.getElementById("review-avatar").style.backgroundImage = `url(${reviews[index].avatar})`;
    document.getElementById("review-title").textContent = reviews[index].title;
    document.getElementById("review-name").textContent = reviews[index].name;

    document.querySelectorAll(".dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}

function nextReview(){
    currentReview = (currentReview + 1) % reviews.length;
    updateReview(currentReview);
}

document.addEventListener("DOMContentLoaded", () => {
    const dots = document.querySelectorAll(".review-section .dot");

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => updateReview(index));
    });

    updateReview(0);
    setInterval(nextReview, 5000);
});

// Categories
const categoryItems = document.querySelectorAll(".categories li");
const projectCards = document.querySelectorAll(".project-card");

categoryItems.forEach(item => {
    item.addEventListener("click", () => {
        categoryItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        const filter = item.getAttribute("data-filter");

        projectCards.forEach(card => {
            const categories = card.getAttribute("data-category").split(" ");
            const matches = filter === "all" || categories.includes(filter);

            card.style.display = matches ? "block" : "none";
        });
    });
});

// contact us form
const contactForm = document.getElementById('contactForm');
const modal = document.getElementById('thankYouModal');
const closeBtnContact = modal.querySelector('button');

contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);

    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const website = formData.get("website").trim();
    const message = formData.get("message").trim();

    if (!name || !email || !website || !message) {
        alert("All fields are required.");
        return;
    }

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.status === 1) {
            modal.style.display = 'flex';
            contactForm.reset();
        } else {
            alert("Something went wrong. Try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to send. Check your internet connection.");
    }
});

closeBtnContact.addEventListener('click', () => {
    modal.style.display = 'none';
});
