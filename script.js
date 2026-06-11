// --- ANILAR ARRAY'İ ---
// --- ANILAR ARRAY'İ ---
const memories = [
  {
    id: 0,
    img: "assets/foto1.jpg",
    date: "14 Şubat 2023",
    text: "Seninle ilk göz göze geldiğimiz o an... Hayatımdaki en güzel başlangıçtı."
  },
  {
    id: 1,
    img: "assets/foto2.jpg",
    date: "Yaz Tatili",
    text: "O sahilde yürürken ellerini tuttuğum anı hiç unutmuyorum."
  },
  {
    id: 2,
    img: "assets/foto3.jpg",
    date: "Uzak ama Yakın",
    text: "Aramızda kilometreler olsa da kalbimin tam ortasındasın."
  },
  {
    id: 3,
    img: "assets/yildiz.jpg", /* Tepe yıldızı anısı */
    date: "Parlayan Yıldızım",
    text: "Gecemi aydınlatan tek yıldızsın."
  },
  // İŞTE ÇALIŞMAYAN SAĞ DALLAR BURASIYDI, EKLENDİ!
  {
    id: 4,
    img: "assets/foto4.jpg",
    date: "Gece Yürüyüşü",
    text: "Ay ışığında ettiğimiz o uzun sohbetleri dünyalara değişmem."
  },
  {
    id: 5,
    img: "assets/foto5.jpg",
    date: "Bizim Şarkımız",
    text: "Bu şarkı ne zaman çalsa aklıma direkt senin o güzel gülüşün geliyor."
  },
  {
    id: 6,
    img: "assets/final.jpg",
    date: "Sonsuza Kadar",
    text: "Seni her şeyden çok seviyorum! Sevgililer Günümüz Kutlu Olsun ❤️"
  }
];

// --- HTML ELEMANLARI ---
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
const startBtn = document.getElementById('start-btn');
const introScreen = document.getElementById('intro-screen');
const mainScreen = document.getElementById('main-screen');
const modal = document.getElementById('memory-modal');
const closeBtn = document.querySelector('.close-btn');
const modalImg = document.getElementById('modal-img');
const modalPlaceholder = document.getElementById('modal-placeholder');
const modalDate = document.getElementById('modal-date');
const modalDesc = document.getElementById('modal-desc');

// --- TYPEWRITER EFEKTİ ---
const introText = "Merhaba Sevgilim... Senin için küçük bir dünya yarattım. Hazır mısın?";
let i = 0;
const speed = 42;

function typeWriter() {
  if (i < introText.length) {
    document.getElementById("typewriter-text").innerHTML += introText.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  } else {
    startBtn.classList.remove('hidden');
  }
}
window.onload = typeWriter;

// --- BAŞLA BUTONU (Müzik ve Parçacıklar burada tetiklenir!) ---
startBtn.addEventListener('click', () => {
  introScreen.style.opacity = '0';
  setTimeout(() => {
    introScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
    startParticles(); // Parçacıkları başlatan sihirli dokunuş!
  }, 1000);

  bgMusic.play()
    .then(() => {
      musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    })
    .catch(() => {
      musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    });
});

// --- MÜZİK KONTROLÜ ---
musicBtn.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play()
      .then(() => {
        musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
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
const particleEmoji = ['🌸', '✦', '❀', ''];
let particleTimer;

function spawnParticle() {
  const el = document.createElement('div');
  el.classList.add('particle');
  const symbol = particleEmoji[Math.floor(Math.random() * particleEmoji.length)];
  el.textContent = symbol || '🌸';

  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = Math.random() * 9 + 12 + "px";
  el.style.animationDuration = Math.random() * 8 + 9 + "s";
  el.style.animationDelay = Math.random() * 1.2 + "s";
  el.style.setProperty('--drift', (Math.random() * 18 - 9).toFixed(1) + "vw");
  el.style.opacity = (Math.random() * 0.34 + 0.34).toFixed(2);

  document.getElementById('particles').appendChild(el);

  setTimeout(() => el.remove(), 18000);
}

function startParticles() {
  for (let p = 0; p < 16; p++) {
    setTimeout(spawnParticle, p * 160);
  }
  particleTimer = setInterval(spawnParticle, 900);
}

// --- BALONCUKLARA TIKLAMA VE MODAL İŞLEMLERİ ---
const bubbles = document.querySelectorAll('.bubble');

modalImg.addEventListener('load', () => {
  modalImg.classList.remove('hidden');
  modalPlaceholder.classList.add('hidden');
});

modalImg.addEventListener('error', () => {
  modalImg.classList.add('hidden');
  modalPlaceholder.classList.remove('hidden');
});

bubbles.forEach(bubble => {
  bubble.addEventListener('click', function () {
    const id = this.getAttribute('data-id');
    const memory = memories.find(m => m.id == id);

    if (memory) {
      modalImg.classList.add('hidden');
      modalPlaceholder.classList.remove('hidden');
      modalImg.src = memory.img;
      modalDate.innerText = memory.date;
      modalDesc.innerText = memory.text;
      modal.classList.remove('hidden');
    }
  });
});

// Modal Kapatma İşlemleri
closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
  if (e.target == modal) {
    modal.classList.add('hidden');
  }
});
