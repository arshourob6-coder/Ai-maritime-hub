import React, { useEffect, useRef } from 'react';

interface WaveCanvasProps {
  isDarkMode?: boolean;
}

export const WaveCanvas: React.FC<WaveCanvasProps> = ({ isDarkMode = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let step = 0;

    const render = () => {
      step += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (isDarkMode) {
        bgGrad.addColorStop(0, '#040b19');
        bgGrad.addColorStop(0.5, '#0a192f');
        bgGrad.addColorStop(1, '#020617');
      } else {
        bgGrad.addColorStop(0, '#f0f7ff');
        bgGrad.addColorStop(0.5, '#e0f2fe');
        bgGrad.addColorStop(1, '#bae6fd');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle animated sine waves
      const waveCount = 3;
      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        const amplitude = 15 + i * 10;
        const wavelength = 0.005 - i * 0.001;
        const speedOffset = step * (1 + i * 0.3);
        const yOffset = height * 0.65 + i * 35;

        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 10) {
          const y = Math.sin(x * wavelength + speedOffset) * amplitude + yOffset;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();

        if (isDarkMode) {
          ctx.fillStyle = i === 0 ? 'rgba(14, 165, 233, 0.07)' : i === 1 ? 'rgba(3, 105, 161, 0.09)' : 'rgba(2, 132, 199, 0.05)';
        } else {
          ctx.fillStyle = i === 0 ? 'rgba(14, 165, 233, 0.15)' : i === 1 ? 'rgba(56, 189, 248, 0.2)' : 'rgba(186, 230, 253, 0.25)';
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
    />
  );
};
