const progress = document.getElementById("progress");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const circles = document.querySelectorAll(".circle");

const totalActive = circles.length; // dynamic
let currentActive = 1; // 1-based index (first circle)

function update() {
  circles.forEach((circle, idx) => {
    if (idx < currentActive) {
      circle.classList.add('active')
    } else {
      circle.classList.remove('active')
    }
  })

  progress.style.width = (currentActive - 1) / (totalActive - 1) * 100 + '%';

  if (currentActive === 1) {
    prev.disabled = true
  } else if (currentActive === totalActive) {
    next.disabled = true
  } else {
    prev.disabled = false
    next.disabled = false
  }
}

next.addEventListener("click", () => {
  currentActive++;
  
  if (currentActive > totalActive) {
    currentActive = totalActive;
  }

  update();
});

prev.addEventListener("click", () => {
  currentActive--;
  
    if (currentActive < 1) {
      currentActive = 1;
    }

    update();
});


