const canvas = document.getElementById('particle-canvas');
const ctx    = canvas.getContext('2d');

let width  = canvas.width  = canvas.offsetWidth;
let height = canvas.height = canvas.offsetHeight;

let particles = [];
let mouse = { x: null, y: null };

window.addEventListener('mousemove', e => {
  // Only register mouse if it's inside hero
  const rect = canvas.getBoundingClientRect();
  if (e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top && e.clientY <= rect.bottom) {
    mouse.x = e.clientX - rect.left; // relative to canvas
    mouse.y = e.clientY - rect.top;
  } else {
    mouse.x = null;
    mouse.y = null;
  }
});

window.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 2 + 1;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;
    this.color = `rgba(255,${Math.floor(122 + Math.random()*50)},${Math.floor(24 + Math.random()*30)},${this.opacity})`;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    // Random movement
    this.x += this.vx;
    this.y += this.vy;

    // Bounce within canvas
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    // Repel from mouse
    if (mouse.x !== null && mouse.y !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const minDist = 80; // distance for repulsion
      if (dist < minDist) {
        const angle = Math.atan2(dy, dx);
        const force = (minDist - dist) / minDist;
        this.vx += Math.cos(angle) * force * 1.5;
        this.vy += Math.sin(angle) * force * 1.5;
      }
    }

    // Slight friction to prevent particles flying off too fast
    this.vx *= 0.98;
    this.vy *= 0.98;

    this.draw();
  }
}

function initParticles(n = 120) {
  particles = [];
  for (let i = 0; i < n; i++) particles.push(new Particle());
}

function animateParticles() {
  width  = canvas.offsetWidth;
  height = canvas.offsetHeight;
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => p.update());
  requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
  width  = canvas.offsetWidth;
  height = canvas.offsetHeight;
  initParticles();
});

initParticles();
animateParticles();
