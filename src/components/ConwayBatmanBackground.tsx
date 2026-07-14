import { useEffect, useRef } from 'react';

export default function ConwayBatmanBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let lastUpdateTime = 0;
        const updateInterval = 120; // ms per generation

        const cellSize = 12;
        let cols = 0;
        let rows = 0;
        let width = 0;
        let height = 0;
        let grid: number[][] = [];
        let nextGrid: number[][] = [];

        function resize() {
            if (!canvas || !ctx) return;
            const parent = canvas.parentElement;
            width = parent?.clientWidth || window.innerWidth;
            height = parent?.clientHeight || window.innerHeight;
            
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            
            ctx.resetTransform();
            ctx.scale(dpr, dpr);

            cols = Math.ceil(width / cellSize);
            rows = Math.ceil(height / cellSize);
            
            grid = Array(rows).fill(null).map(() => 
                Array(cols).fill(null).map(() => (Math.random() < 0.08 ? 1 : 0))
            );
            nextGrid = Array(rows).fill(null).map(() => Array(cols).fill(0));
            
            seedBatman(grid);
        }

        function seedBatman(g: number[][]) {
            const midY = Math.floor(rows / 2);
            const midX = Math.floor(cols / 2);
            if (midY > 10 && midX > 20) {
                const batCoords = [
                    // Ears
                    [-3, -3], [-3, 3],
                    [-2, -3], [-2, -2], [-2, 2], [-2, 3],
                    // Head center
                    [-1, -1], [-1, 0], [-1, 1],
                    // Wings top edge
                    [-2, -8], [-2, -7], [-2, 7], [-2, 8],
                    [-1, -9], [-1, -8], [-1, -7], [-1, -6], [-1, 6], [-1, 7], [-1, 8], [-1, 9],
                    [0, -10], [0, -9], [0, -8], [0, -7], [0, -6], [0, -5], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [0, 10],
                    // Body / Center
                    [1, -4], [1, -3], [1, -2], [1, -1], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4],
                    [2, -2], [2, -1], [2, 0], [2, 1], [2, 2],
                    [3, -1], [3, 0], [3, 1],
                    [4, 0]
                ];
                batCoords.forEach(([dy, dx]) => {
                    const r = midY + dy;
                    const c = midX + dx;
                    if (r >= 0 && r < rows && c >= 0 && c < cols) {
                        g[r][c] = 1;
                    }
                });
            }
        }

        window.addEventListener('resize', resize);
        resize();

        function countNeighbours(r: number, c: number): number {
            let count = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) continue;
                    const newR = (r + i + rows) % rows;
                    const newC = (c + j + cols) % cols;
                    if (grid[newR]) {
                        count += grid[newR][newC] || 0;
                    }
                }
            }
            return count;
        }

        function step() {
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const neighbours = countNeighbours(r, c);
                    const state = grid[r][c];
                    if (state === 1) {
                        if (neighbours < 2 || neighbours > 3) {
                            nextGrid[r][c] = 0;
                        } else {
                            nextGrid[r][c] = 1;
                        }
                    } else {
                        if (neighbours === 3) {
                            nextGrid[r][c] = 1;
                        } else {
                            nextGrid[r][c] = 0;
                        }
                    }
                }
            }
            const temp = grid;
            grid = nextGrid;
            nextGrid = temp;
        }

        function draw() {
            if (!ctx || !canvas) return;
            const isDark = document.documentElement.classList.contains('dark');
            ctx.fillStyle = isDark ? 'rgba(18, 18, 20, 0.25)' : 'rgba(255, 255, 255, 0.25)';
            ctx.fillRect(0, 0, width, height);

            // Draw grid dots
            ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.03)';
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    ctx.fillRect(c * cellSize + cellSize / 2 - 0.5, r * cellSize + cellSize / 2 - 0.5, 1, 1);
                }
            }

            ctx.fillStyle = isDark ? 'rgba(255, 215, 0, 0.75)' : 'rgba(0, 0, 0, 0.75)';
            ctx.shadowBlur = isDark ? 6 : 0;
            ctx.shadowColor = isDark ? '#ffd700' : 'transparent';

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    if (grid[r] && grid[r][c] === 1) {
                        ctx.beginPath();
                        ctx.arc(
                            c * cellSize + cellSize / 2,
                            r * cellSize + cellSize / 2,
                            cellSize / 2 - 3,
                            0,
                            Math.PI * 2
                        );
                        ctx.fill();
                    }
                }
            }
            ctx.shadowBlur = 0;
        }

        function loop(timestamp: number) {
            if (timestamp - lastUpdateTime > updateInterval) {
                step();
                lastUpdateTime = timestamp;
            }
            draw();
            animationFrameId = requestAnimationFrame(loop);
        }

        function handleMouseMove(e: MouseEvent) {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const c = Math.floor(x / cellSize);
            const r = Math.floor(y / cellSize);

            if (r >= 0 && r < rows && c >= 0 && c < cols) {
                if (grid[r]) grid[r][c] = 1;
                if (grid[r-1]) grid[r-1][c] = 1;
                if (grid[r]) grid[r][c-1] = 1;
                if (grid[r+1]) grid[r+1][c] = 1;
                if (grid[r]) grid[r][c+1] = 1;
            }
        }

        canvas.addEventListener('mousemove', handleMouseMove);
        animationFrameId = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
            if (canvas) {
                canvas.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block pointer-events-auto opacity-30 select-none"
        />
    );
}
