const heartCount = 200;
const hearts = [];

// Generate hearts randomly
for (let i = 0; i < heartCount; i++) {
  const heart = document.createElement("div");
  heart.className = "heart";
  
  const size = Math.random() * 8 + 8;
  heart.style.setProperty("--size", size + "px");
  
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * document.body.scrollHeight;
  
  heart.dataset.origX = x;
  heart.dataset.origY = y;
  
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  
  document.body.appendChild(heart);
  hearts.push(heart);
}

// Function to move hearts toward a point
function moveHeartsTo(x, y) {
  hearts.forEach((heart, index) => {
    // Only move hearts within 150px radius
    const hx = parseFloat(heart.dataset.origX);
    const hy = parseFloat(heart.dataset.origY);
    const dx = x - hx;
    const dy = y - hy;
    const distance = Math.sqrt(dx*dx + dy*dy);
    
    if (distance < 150) {
      // Move heart toward touch point smoothly
      heart.style.left = hx + dx * 0.7 + "px";
      heart.style.top = hy + dy * 0.7 + "px";
    }
  });
}

// Function to reset hearts
function resetHearts() {
  hearts.forEach((heart) => {
    heart.style.left = heart.dataset.origX + "px";
    heart.style.top = heart.dataset.origY + "px";
  });
}

// Mobile: touch events
let touchActive = false;

document.addEventListener("touchstart", (e) => {
  touchActive = true;
  const touch = e.touches[0];
  moveHeartsTo(touch.clientX, touch.clientY);
});

document.addEventListener("touchmove", (e) => {
  if (!touchActive) return;
  const touch = e.touches[0];
  moveHeartsTo(touch.clientX, touch.clientY);
});

document.addEventListener("touchend", () => {
  touchActive = false;
  resetHearts();
});

// Desktop fallback (optional)
document.addEventListener("mousedown", (e) => {
  touchActive = true;
  moveHeartsTo(e.clientX, e.clientY);
});

document.addEventListener("mousemove", (e) => {
  if (!touchActive) return;
  moveHeartsTo(e.clientX, e.clientY);
});

document.addEventListener("mouseup", () => {
  touchActive = false;
  resetHearts();
});
