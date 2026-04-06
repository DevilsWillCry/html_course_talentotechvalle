import { data } from "./data.js";

const navbar = document.getElementsByClassName("nav_menu");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar[0].classList.add("scrolled");
  } else {
    navbar[0].classList.remove("scrolled");
  }
});

const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slide").length;

//add timer to change slide every 5 seconds

setInterval(() => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
}, 4000);

let currentIndex = 0;

document.querySelector(".next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  console.log(currentIndex);
  updateCarousel();
});

document.querySelector(".prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
});

function updateCarousel() {
  const offset = -currentIndex * 100;
  slides.style.transform = `translateX(${offset}%)`;
}

function chunkArray(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

const pages = chunkArray(data, 3);

const slidesContainterTopPicks = document.getElementById("slides_top_picks");

pages.forEach((page) => {
  const pageDiv = document.createElement("div");
  pageDiv.classList.add("page");

  page.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="card_image">
            <div class="card-content">
                <span>${item.category}</span>
                <h3>${item.title}</h3>
                <p>${item.description[1]}</p>
                <small>${item.year} - Rating: ${item.rating}</small>
            </div>`;
    pageDiv.appendChild(card);
  });

  slidesContainterTopPicks.appendChild(pageDiv);
});

let index = 0;

document.querySelector(".next_top_picks").onclick = () => {
  index = (index + 1) % pages.length;
  update();
};

document.querySelector(".prev_top_picks").onclick = () => {
  index = (index - 1 + pages.length) % pages.length;
  update();
};

function update() {
  slidesContainterTopPicks.style.transform = `translateX(-${index * 100}%)`;
}


setInterval(() => {
  index = (index + 1) % pages.length;
  update();
}, 5000);