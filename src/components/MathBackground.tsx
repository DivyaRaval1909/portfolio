import { useEffect, useRef } from 'react';

export default function MathBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let scrollY = window.scrollY;
    let time = 0;

    // Dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;

    function resize() {
      if (!canvas || !ctx) return;
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    }

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    resize();

    // Mathematical equations to float in background
    const equations = [
      { text: 'e^{i\\pi} + 1 = 0', x: 0.15, y: 0.25, size: 14 },
      { text: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}', x: 0.8, y: 0.15, size: 13 },
      { text: 'f(t) = \\sum_{n=-\\infty}^{\\infty} c_n e^{in\\omega_0 t}', x: 0.1, y: 0.55, size: 14 },
      { text: '\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}', x: 0.75, y: 0.45, size: 13 },
      { text: '\\zeta(s) = \\sum_{n=1}^{\\infty} \\frac{1}{n^s}', x: 0.82, y: 0.75, size: 14 },
      { text: 'i\\hbar\\frac{\\partial}{\\partial t}\\Psi = \\hat{H}\\Psi', x: 0.12, y: 0.85, size: 15 }
    ];

    function draw() {
      if (!ctx || !canvas) return;

      const isDark = document.documentElement.classList.contains('dark');
      time += 1;

      // Colors based on theme
      const gridColor = isDark ? 'rgba(255, 255, 255, 0.015)' : 'rgba(0, 0, 0, 0.025)';
      const axisColor = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.05)';
      const graphColor = isDark ? 'rgba(255, 215, 0, 0.07)' : 'rgba(0, 0, 0, 0.06)';
      const labelColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.09)';
      const textColor = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.04)';

      ctx.clearRect(0, 0, width, height);

      // Scroll statistics
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollY / docHeight : 0;

      // 1. Draw Grid (scrolls with the page)
      const cellSize = 60;
      const gridOffsetY = -scrollY % cellSize;

      ctx.lineWidth = 1;
      ctx.strokeStyle = gridColor;

      // Vertical lines
      for (let x = 0; x < width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = gridOffsetY; y < height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw Subtle Mathematical Formulas
      ctx.font = 'italic 14px "JetBrains Mono", monospace';
      ctx.fillStyle = textColor;
      equations.forEach((eq) => {
        // Shift equation y position based on scroll to make them feel integrated with content
        const eqY = (eq.y * height - (scrollY * 0.15)) % (height + 100);
        const yPos = eqY < -50 ? eqY + height + 100 : eqY;
        ctx.font = `italic ${eq.size}px "JetBrains Mono", Courier, monospace`;
        ctx.fillText(eq.text, eq.x * width, yPos);
      });

      // 3. Draw Side Subplots (Left and Right margins)
      const padding = 80;
      const plotWidth = 120;
      const plotHeight = 120;

      // --- Left Plot: Morphing Lissajous Curve ---
      // Position adapts subtly to scroll
      const leftPlotX = padding;
      const leftPlotY = height * 0.35;

      // Draw plot border
      ctx.strokeStyle = axisColor;
      ctx.strokeRect(leftPlotX - plotWidth/2, leftPlotY - plotHeight/2, plotWidth, plotHeight);
      
      // Draw sub-axes
      ctx.beginPath();
      ctx.moveTo(leftPlotX - plotWidth/2, leftPlotY);
      ctx.lineTo(leftPlotX + plotWidth/2, leftPlotY);
      ctx.moveTo(leftPlotX, leftPlotY - plotHeight/2);
      ctx.lineTo(leftPlotX, leftPlotY + plotHeight/2);
      ctx.stroke();

      // Lissajous curve values
      const lissA = 40;
      const lissB = 40;
      // Frequency values morph based on scroll position
      const lissFreqX = 3 + Math.sin(scrollPercent * Math.PI);
      const lissFreqY = 2 + Math.cos(scrollPercent * Math.PI * 2);
      const lissDelta = time * 0.015;

      ctx.beginPath();
      ctx.strokeStyle = graphColor;
      ctx.lineWidth = 1.5;
      for (let t = 0; t <= Math.PI * 2; t += 0.02) {
        const xVal = leftPlotX + lissA * Math.sin(lissFreqX * t + lissDelta);
        const yVal = leftPlotY + lissB * Math.sin(lissFreqY * t);
        if (t === 0) ctx.moveTo(xVal, yVal);
        else ctx.lineTo(xVal, yVal);
      }
      ctx.stroke();

      // Label
      ctx.fillStyle = labelColor;
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText(`Lissajous: f_x=${lissFreqX.toFixed(1)}, f_y=${lissFreqY.toFixed(1)}`, leftPlotX - 55, leftPlotY + plotHeight/2 + 15);


      // --- Right Plot: Fourier Harmonics ---
      const rightPlotX = width - padding;
      const rightPlotY = height * 0.55;

      // Draw plot border
      ctx.strokeStyle = axisColor;
      ctx.strokeRect(rightPlotX - plotWidth/2, rightPlotY - plotHeight/2, plotWidth, plotHeight);

      // Draw sub-axes
      ctx.beginPath();
      ctx.moveTo(rightPlotX - plotWidth/2, rightPlotY);
      ctx.lineTo(rightPlotX + plotWidth/2, rightPlotY);
      ctx.moveTo(rightPlotX, rightPlotY - plotHeight/2);
      ctx.lineTo(rightPlotX, rightPlotY + plotHeight/2);
      ctx.stroke();

      // Harmonics count changes with scroll (1 to 11 terms)
      const harmonics = 1 + Math.floor(scrollPercent * 8);

      ctx.beginPath();
      ctx.strokeStyle = graphColor;
      ctx.lineWidth = 1.5;
      for (let px = -plotWidth/2; px <= plotWidth/2; px++) {
        // Map px to angle range [-PI, PI]
        const theta = (px / (plotWidth/2)) * Math.PI;
        let sum = 0;
        // Fourier series of a square wave
        for (let n = 1; n <= harmonics * 2; n += 2) {
          sum += Math.sin(n * (theta + time * 0.015)) / n;
        }
        const py = rightPlotY - (sum * (plotHeight/2.5));
        if (px === -plotWidth/2) ctx.moveTo(rightPlotX + px, py);
        else ctx.lineTo(rightPlotX + px, py);
      }
      ctx.stroke();

      // Label
      ctx.fillStyle = labelColor;
      ctx.fillText(`Fourier N=${harmonics}`, rightPlotX - 45, rightPlotY + plotHeight/2 + 15);


      // 4. Draw Center Flowing Waves (running vertically in background)
      const waveStartX = width * 0.25;
      const waveEndX = width * 0.75;
      ctx.beginPath();
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.01)' : 'rgba(0, 0, 0, 0.015)';
      ctx.lineWidth = 2;
      for (let px = waveStartX; px <= waveEndX; px += 2) {
        // Multi-frequency wave packet
        const tVal = (px - waveStartX) / (waveEndX - waveStartX) * Math.PI * 6;
        const waveY = height * 0.75 + 
          30 * Math.sin(tVal - time * 0.01) * Math.cos(tVal * 0.5 + scrollPercent * Math.PI);
        if (px === waveStartX) ctx.moveTo(px, waveY);
        else ctx.lineTo(px, waveY);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(draw);
    }

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none block select-none"
    />
  );
}
