// for accordion

document.querySelectorAll(".faqbutton").forEach((button) => {
  button.addEventListener("click", () => {

    // icon change
    const icon = button.querySelector(".faqPlus i");
    icon.classList.toggle("fa-plus");
    icon.classList.toggle("fa-minus");

    // parent border change
    const parent = button.closest('[data-accordion="collapse"]');
    parent.classList.toggle("border-transparent");
    parent.classList.toggle("border-[#4285FA]");

  });
});

// document.querySelectorAll(".pm-accordion button").forEach((button) => {

//   const icon = button.querySelector(".pm-icon");
//   const targetId = button.getAttribute("data-accordion-target");
//   const target = document.querySelector(targetId);

//   button.addEventListener("click", () => {

//     const isHidden = target.classList.contains("hidden");

//     target.classList.toggle("hidden");

//     icon.textContent = isHidden ? "-" : "+";

//   });

// });

document.querySelectorAll("[data-accordion-icon]").forEach((icon) => {
  const button = icon.closest("button");
  const targetId = button.getAttribute("data-accordion-target");
  const target = document.querySelector(targetId);

  button.addEventListener("click", () => {
    const isOpen = !target.classList.contains("hidden");

    // Accordion body toggle
    target.classList.toggle("hidden");

    // Icon rotate
    if (isOpen) {
      icon.classList.add("rotate-180");
    } else {
      icon.classList.remove("rotate-180");
    }
  });
});

// for carosel

const track = document.querySelector(".track");
const items = document.querySelectorAll(".item");
const paginationContainer = document.getElementById("pagination-lines");

let currentIndex = 0;
let autoPlayInterval;

function getVisibleCards() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

function getGapSize() {
  if (window.innerWidth >= 768) return 20;
  return 12;
}

function createPagination() {
  paginationContainer.innerHTML = "";
  let visibleCards = getVisibleCards();
  const totalSteps = items.length - visibleCards + 1;

  for (let i = 0; i < totalSteps; i++) {
    const line = document.createElement("div");

    line.className = `h-1.5 w-10 rounded-full transition-all duration-500 cursor-pointer ${
      i === currentIndex ? "bg-red-500" : "bg-red-200"
    }`;
    line.onclick = () => {
      currentIndex = i;
      updateSlider();
      resetAutoPlay();
    };
    paginationContainer.appendChild(line);
  }
}

function updateSlider() {
  const container = document.querySelector(".slider-container");
  if (!container) return;

  const containerWidth = container.offsetWidth;
  const visibleCards = getVisibleCards();
  const gap = getGapSize();

  const itemWidth = (containerWidth - gap * (visibleCards - 1)) / visibleCards;

  items.forEach((item) => {
    item.style.width = `${itemWidth}px`;
  });

  const moveDistance = currentIndex * (itemWidth + gap);
  track.style.transform = `translateX(-${moveDistance}px)`;

  const lines = document.querySelectorAll("#pagination-lines div");
  lines.forEach((line, index) => {
    if (index === currentIndex) {
      line.classList.replace("bg-red-200", "bg-red-500");
    } else {
      line.classList.replace("bg-red-500", "bg-red-200");
    }
  });
}

function startAutoPlay() {
  stopAutoPlay();
  autoPlayInterval = setInterval(() => {
    let visibleCards = getVisibleCards();
    if (currentIndex >= items.length - visibleCards) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    updateSlider();
  }, 3000);
}

function stopAutoPlay() {
  if (autoPlayInterval) clearInterval(autoPlayInterval);
}

function resetAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

window.addEventListener("resize", () => {
  createPagination();
  updateSlider();
});

createPagination();
updateSlider();
startAutoPlay();
