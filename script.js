// --- ANILAR ARRAY'İ ---
// --- ANILAR ARRAY'İ ---
const memories = [
  { id: 0, img: "assets/foto1.jpeg" },
  { id: 1, img: "assets/foto2.jpeg" },
  { id: 2, img: "assets/foto3.jpeg" },
  { id: 3, img: "assets/foto7.png" },
  { id: 4, img: "assets/foto4.jpeg" },
  { id: 5, img: "assets/foto5.jpeg" },
  { id: 6, img: "assets/foto6.jpeg" },
];

// --- HTML ELEMANLARI ---
const bgMusic = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
const startBtn = document.getElementById("start-btn");
const introScreen = document.getElementById("intro-screen");
const mainScreen = document.getElementById("main-screen");
const modal = document.getElementById("memory-modal");
const closeBtn = document.querySelector(".close-btn");
const modalImg = document.getElementById("modal-img");
const modalPlaceholder = document.getElementById("modal-placeholder");
const modalDate = document.getElementById("modal-date");
const modalDesc = document.getElementById("modal-desc");

// --- TYPEWRITER EFEKTİ ---
const introText = "Merhaba Sevgilim... Senin için küçük bir dünya yarattım.";
let i = 0;
const speed = 42;

function typeWriter() {
  if (i < introText.length) {
    document.getElementById("typewriter-text").innerHTML += introText.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  } else {
    startBtn.classList.remove("hidden");
  }
}
window.onload = typeWriter;

// --- BAŞLA BUTONU (Müzik ve Parçacıklar burada tetiklenir!) ---
startBtn.addEventListener("click", () => {
  bgMusic.volume = 0.2; // Müzik sesini baştan düşük yaparak başlatıyoruz
  introScreen.style.opacity = "0";
  setTimeout(() => {
    introScreen.classList.add("hidden");
    mainScreen.classList.remove("hidden");
    startParticles(); // Parçacıkları başlatan sihirli dokunuş!
  }, 1000);

  bgMusic
    .play()

    .then(() => {
      musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    })
    .catch(() => {
      musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    });
});

// --- MÜZİK KONTROLÜ ---
musicBtn.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic
      .play()
      .then(() => {
        musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        bgMusic.volume = 0.2; // Ses seviyesini yarıya düşür
      })
      .catch(() => {
        musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
      });
  } else {
    bgMusic.pause();
    musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
});

// --- ZARİF SAKURA PARÇACIK SİSTEMİ ---
const particleEmoji = ["🌸", "✦", "❀", ""];
let particleTimer;

function spawnParticle() {
  const el = document.createElement("div");
  el.classList.add("particle");
  const symbol =
    particleEmoji[Math.floor(Math.random() * particleEmoji.length)];
  el.textContent = symbol || "🌸";

  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = Math.random() * 9 + 12 + "px";
  el.style.animationDuration = Math.random() * 8 + 9 + "s";
  el.style.animationDelay = Math.random() * 1.2 + "s";
  el.style.setProperty("--drift", (Math.random() * 18 - 9).toFixed(1) + "vw");
  el.style.opacity = (Math.random() * 0.34 + 0.34).toFixed(2);

  document.getElementById("particles").appendChild(el);

  setTimeout(() => el.remove(), 18000);
}

function startParticles() {
  for (let p = 0; p < 16; p++) {
    setTimeout(spawnParticle, p * 160);
  }
  particleTimer = setInterval(spawnParticle, 900);
}

// --- BALONCUKLARA TIKLAMA VE MODAL İŞLEMLERİ ---
const bubbles = document.querySelectorAll(".bubble");

modalImg.addEventListener("load", () => {
  modalImg.classList.remove("hidden");
  modalPlaceholder.classList.add("hidden");
});

modalImg.addEventListener("error", () => {
  modalImg.classList.add("hidden");
  modalPlaceholder.classList.remove("hidden");
});

bubbles.forEach((bubble) => {
  bubble.addEventListener("click", function () {
    const id = this.getAttribute("data-id");
    const memory = memories.find((m) => m.id == id);

    if (memory) {
      modalImg.classList.add("hidden");
      modalPlaceholder.classList.remove("hidden");
      modalImg.src = memory.img;
      modalDate.innerText = memory.date;
      modalDesc.innerText = memory.text;
      modal.classList.remove("hidden");
    }
  });
});

// Modal Kapatma İşlemleri
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.classList.add("hidden");
  }
});

const cat = document.getElementById("cat-gif");

let isHolding = false;
let offsetX = 0;
let offsetY = 0;

// 📱 + 🖱️ TIKLA / DOKUN → AL / BIRAK
cat.addEventListener("click", toggleHold);
cat.addEventListener("touchstart", (e) => {
  e.preventDefault(); // 🔥 önemli
  toggleHold(e.touches[0]);
});

function toggleHold(e) {
  isHolding = !isHolding;

  const rect = cat.getBoundingClientRect();

  offsetX = rect.width / 2;
  offsetY = rect.height / 2;

  cat.style.cursor = isHolding ? "grabbing" : "grab";
}

// 🖱️ PC TAKİP
document.addEventListener("mousemove", (e) => {
  if (!isHolding) return;

  moveCat(e.clientX, e.clientY);
});

// 📱 MOBİL TAKİP
document.addEventListener("touchmove", (e) => {
  if (!isHolding) return;

  const touch = e.touches[0];
  moveCat(touch.clientX, touch.clientY);
});

// ortak hareket fonksiyonu
function moveCat(x, y) {
  cat.style.left = x - offsetX + "px";
  cat.style.top = y - offsetY + "px";
}
