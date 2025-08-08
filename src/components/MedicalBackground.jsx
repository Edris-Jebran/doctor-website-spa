import React, { useEffect, useRef } from 'react';

// Subtle medical-themed animated background
// - Gradient backdrop
// - Animated ECG waveform
// - Soft bokeh "cells" and medical cross shapes drifting
export default function MedicalBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * DPR);
      canvas.height = Math.floor(window.innerHeight * DPR);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Bokeh cells
    const cells = Array.from({ length: 24 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 24 + 10,
      a: Math.random() * 0.12 + 0.05,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      hue: Math.random() < 0.5 ? 195 : 28 // clinic palette: teal/accent
    }));

    // Medical crosses
    const crosses = Array.from({ length: 10 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      s: Math.random() * 10 + 6,
      a: Math.random() * 0.08 + 0.06,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.002
    }));

    let t = 0;
    let rafId;

    const drawGradient = () => {
      const g = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
      g.addColorStop(0, 'rgba(15, 23, 42, 0.96)'); // slate-900-ish
      g.addColorStop(1, 'rgba(2, 44, 53, 0.94)'); // deep teal
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const drawCells = () => {
      cells.forEach(c => {
        c.x += c.vx;
        c.y += c.vy;
        if (c.x < -50) c.x = window.innerWidth + 50;
        if (c.x > window.innerWidth + 50) c.x = -50;
        if (c.y < -50) c.y = window.innerHeight + 50;
        if (c.y > window.innerHeight + 50) c.y = -50;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${c.hue}, 70%, 60%, ${c.a})`;
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawCrosses = () => {
      crosses.forEach(cr => {
        cr.rot += cr.vr;
        ctx.save();
        ctx.translate(cr.x, cr.y);
        ctx.rotate(cr.rot);
        ctx.globalAlpha = cr.a;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        const s = cr.s;
        // simple medical cross
        ctx.fillRect(-s * 0.15, -s, s * 0.3, s * 2);
        ctx.fillRect(-s, -s * 0.15, s * 2, s * 0.3);
        ctx.restore();
      });
      ctx.globalAlpha = 1;
    };

    const drawECG = () => {
      const h = window.innerHeight;
      const w = window.innerWidth;
      const baseline = h * 0.35; // keep it behind hero

      ctx.save();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(0, 209, 255, 0.45)'; // teal glow
      ctx.shadowColor = 'rgba(0, 209, 255, 0.35)';
      ctx.shadowBlur = 12;

      ctx.beginPath();
      const speed = 120; // px per second
      const phase = (t * speed) % (w + 200);

      // ECG segment pattern function
      const segment = (x0) => {
        const amp = 26;
        const step = 10;
        let x = x0;
        // flat
        for (let i = 0; i < 10; i++) { x += step; ctx.lineTo(x, baseline + Math.sin((x + t * 20) * 0.01) * 1.5); }
        // small dip (Q)
        x += step; ctx.lineTo(x, baseline + amp * 0.25);
        // spike (R)
        x += step; ctx.lineTo(x, baseline - amp);
        // overshoot (S)
        x += step; ctx.lineTo(x, baseline + amp * 0.55);
        // recovery + T wave
        for (let i = 0; i < 16; i++) { x += step; ctx.lineTo(x, baseline + Math.sin((i / 16) * Math.PI) * amp * 0.35); }
        // flat
        for (let i = 0; i < 18; i++) { x += step; ctx.lineTo(x, baseline + Math.sin((x + t * 20) * 0.01) * 1.5); }
        return x;
      };

      let xStart = -phase - 200;
      ctx.moveTo(xStart, baseline);
      while (xStart < w + 200) {
        xStart = segment(xStart);
      }
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      drawGradient();
      drawCells();
      drawCrosses();
      drawECG();
      t += 0.016;
      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
  );
}
