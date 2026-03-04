const canvas = document.getElementById('particle-canvas');
const ctx    = canvas.getContext('2d');

let width  = canvas.width  = window.innerWidth;
let height = canvas.height = window.innerHeight;

let particles = [];
let mouse = { x: null, y: null };

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 3 + 1;
    this.vx = (Math.random() - 0.5) * (0.3 + Math.random() * 0.7);
    this.vy = (Math.random() - 0.5) * (0.3 + Math.random() * 0.7);
    this.opacity = Math.random() * 0.5 + 0.2;
    this.color = `rgba(255,${Math.floor(122 + Math.random()*50)},${Math.floor(24 + Math.random()*30)},${this.opacity})`;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    // move
    this.x += this.vx;
    this.y += this.vy;

    // bounce off edges
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    // repel from cursor
    if (mouse.x !== null && mouse.y !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const minDist = 100;
      if (dist < minDist) {
        const angle = Math.atan2(dy, dx);
        const force = (minDist - dist) / minDist;
        this.vx += Math.cos(angle) * force * 1.5;
        this.vy += Math.sin(angle) * force * 1.5;
      }
    }

    // gradual slow down
    this.vx *= 0.98;
    this.vy *= 0.98;

    this.draw();
  }
}

function initParticles(n = 400) {
  particles = [];
  for (let i = 0; i < n; i++) particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => p.update());
  requestAnimationFrame(animateParticles);
}

// resize handler
window.addEventListener('resize', () => {
  width  = canvas.width  = window.innerWidth;
  height = canvas.height = window.innerHeight;
  initParticles();
});

// initialize
initParticles();
animateParticles();
