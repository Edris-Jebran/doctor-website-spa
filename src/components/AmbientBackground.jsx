import React, { useEffect, useRef } from 'react';

const AmbientBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    let animationId;
    let time = 0;
    
    // Create flowing particles
    const particles = [];
    const numParticles = 80;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 4 + 2;
        this.color = Math.random() > 0.5 ? 
          `rgba(0, 94, 122, ${Math.random() * 0.15 + 0.05})` : 
          `rgba(224, 141, 60, ${Math.random() * 0.12 + 0.04})`;
        this.life = Math.random() * 150 + 100;
        this.maxLife = this.life;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        
        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        
        // Add some organic movement
        this.vx += (Math.random() - 0.5) * 0.02;
        this.vy += (Math.random() - 0.5) * 0.02;
        
        // Limit velocity
        this.vx = Math.max(-1.5, Math.min(1.5, this.vx));
        this.vy = Math.max(-1.5, Math.min(1.5, this.vy));
      }
      
      draw() {
        const alpha = this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    
    // Create swirls with more dynamic movement
    const swirls = [
      {
        x: canvas.width * 0.2,
        y: canvas.height * 0.3,
        radius: 180,
        speed: 0.004,
        color: 'rgba(0, 94, 122, 0.08)',
        direction: 1,
        vx: 0.3,
        vy: 0.15
      },
      {
        x: canvas.width * 0.8,
        y: canvas.height * 0.7,
        radius: 250,
        speed: 0.003,
        color: 'rgba(224, 141, 60, 0.07)',
        direction: -1,
        vx: -0.25,
        vy: 0.3
      },
      {
        x: canvas.width * 0.5,
        y: canvas.height * 0.2,
        radius: 150,
        speed: 0.005,
        color: 'rgba(0, 94, 122, 0.06)',
        direction: 1,
        vx: 0.15,
        vy: -0.35
      },
      {
        x: canvas.width * 0.1,
        y: canvas.height * 0.8,
        radius: 220,
        speed: 0.0035,
        color: 'rgba(224, 141, 60, 0.08)',
        direction: -1,
        vx: -0.3,
        vy: -0.15
      }
    ];

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      // Clear canvas with darker gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
      gradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.92)');
      gradient.addColorStop(1, 'rgba(51, 65, 85, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        
        // Remove dead particles and create new ones
        if (particle.life <= 0) {
          particles[index] = new Particle();
        }
      });

      // Draw dynamic swirls
      swirls.forEach((swirl, index) => {
        // Update swirl position
        swirl.x += swirl.vx;
        swirl.y += swirl.vy;
        
        // Bounce off edges
        if (swirl.x < swirl.radius || swirl.x > canvas.width - swirl.radius) {
          swirl.vx *= -1;
        }
        if (swirl.y < swirl.radius || swirl.y > canvas.height - swirl.radius) {
          swirl.vy *= -1;
        }
        
        // Add some organic movement
        swirl.vx += (Math.random() - 0.5) * 0.015;
        swirl.vy += (Math.random() - 0.5) * 0.015;
        
        // Limit velocity
        swirl.vx = Math.max(-0.8, Math.min(0.8, swirl.vx));
        swirl.vy = Math.max(-0.8, Math.min(0.8, swirl.vy));
        
        ctx.save();
        ctx.translate(swirl.x, swirl.y);
        ctx.rotate(time * swirl.speed * swirl.direction);
        
        // Create more organic swirl path
        ctx.beginPath();
        for (let i = 0; i < 360; i += 1) {
          const angle = (i * Math.PI) / 180;
          const radius = swirl.radius * (1 - i / 360) * (1 + Math.sin(time * 0.015 + i * 0.15) * 0.15);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        // Create gradient for swirl
        const swirlGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, swirl.radius);
        swirlGradient.addColorStop(0, swirl.color);
        swirlGradient.addColorStop(0.5, swirl.color.replace('0.08', '0.04').replace('0.07', '0.035').replace('0.06', '0.03'));
        swirlGradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
        
        ctx.fillStyle = swirlGradient;
        ctx.fill();
        ctx.restore();
      });

      // Draw connecting lines between nearby particles
      ctx.strokeStyle = 'rgba(0, 94, 122, 0.04)';
      ctx.lineWidth = 1.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const alpha = (120 - distance) / 120;
            ctx.strokeStyle = `rgba(0, 94, 122, ${alpha * 0.04})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Add some floating orbs for depth
      const orbs = [
        { x: canvas.width * 0.3, y: canvas.height * 0.4, size: 60, color: 'rgba(0, 94, 122, 0.03)' },
        { x: canvas.width * 0.7, y: canvas.height * 0.6, size: 80, color: 'rgba(224, 141, 60, 0.025)' },
        { x: canvas.width * 0.2, y: canvas.height * 0.7, size: 50, color: 'rgba(0, 94, 122, 0.02)' }
      ];

      orbs.forEach(orb => {
        ctx.save();
        ctx.globalAlpha = 0.6 + Math.sin(time * 0.01) * 0.2;
        ctx.fillStyle = orb.color;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      time += 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.3 }}
    />
  );
};

export default AmbientBackground;
