"use client";

import { useEffect, useRef } from "react";

interface Raindrop {
  x: number;
  y: number;
  speedY: number;
  len: number;
  opacity: number;
}

export default function RainCanvas({ count = 300 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dropsRef = useRef<Raindrop[]>([]);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const createDrop = (): Raindrop => ({
      x: Math.random() * width,
      y: Math.random() * -height,
      speedY: 8 + Math.random() * 14,
      len: 8 + Math.random() * 18,
      opacity: 0.2 + Math.random() * 0.5
    });

    dropsRef.current = Array.from({ length: count }, createDrop);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // subtle wind
      const windX = Math.sin(performance.now() / 1500) * 0.8;

      ctx.strokeStyle = "rgba(255,255,255,0.7)";
      ctx.lineWidth = 1;
      ctx.lineCap = "round";

      for (const d of dropsRef.current) {
        ctx.globalAlpha = d.opacity;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + windX * d.len * 0.5, d.y + d.len);
        ctx.stroke();

        d.x += windX;
        d.y += d.speedY;
        if (d.y - d.len > height) {
          d.x = Math.random() * width;
          d.y = -Math.random() * 100;
          d.speedY = 8 + Math.random() * 14;
          d.len = 8 + Math.random() * 18;
          d.opacity = 0.2 + Math.random() * 0.5;
        }
      }

      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [count]);

  return <canvas ref={canvasRef} className="rain-canvas" aria-hidden="true" />;
}
