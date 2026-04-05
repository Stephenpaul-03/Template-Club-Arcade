"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { useTheme } from "./theme/theme-provider";

const SnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  const [isGameOver, setIsGameOver] = useState(false);

  // refs for instant updates
  const snakeRef = useRef<{ x: number; y: number }[]>([]);
  const directionRef = useRef<string | null>(null);
  const nextDirectionRef = useRef<string | null>(null);
  const foodRef = useRef<{ x: number; y: number }>({ x: 60, y: 80 });

  const speed = 150;
  const box = 20;

  // initialize snake at center
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const centerX = Math.floor(canvas.width / 2 / box) * box;
    const centerY = Math.floor(canvas.height / 2 / box) * box;
    snakeRef.current = [{ x: centerX, y: centerY }];
  }, []);

  const restart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const centerX = Math.floor(canvas.width / 2 / box) * box;
    const centerY = Math.floor(canvas.height / 2 / box) * box;

    snakeRef.current = [{ x: centerX, y: centerY }];
    foodRef.current = { x: 60, y: 80 };
    directionRef.current = null;
    nextDirectionRef.current = null;
    setIsGameOver(false);
  };

  // handle keypresses
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (["w", "a", "s", "d"].includes(key)) e.preventDefault();

      nextDirectionRef.current = (() => {
        const dir = directionRef.current;
        if (key === "a" && dir !== "RIGHT") return "LEFT";
        if (key === "w" && dir !== "DOWN") return "UP";
        if (key === "d" && dir !== "LEFT") return "RIGHT";
        if (key === "s" && dir !== "UP") return "DOWN";
        return dir;
      })();
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    const drawGrid = () => {
      ctx.fillStyle = isDark ? "#1a1a1a" : "#f9fafb";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = isDark ? "#353535" : "#e5e7eb";
      ctx.lineWidth = 1;

      for (let i = 0; i <= canvas.width; i += box) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }

      for (let i = 0; i <= canvas.height; i += box) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }
    };

    const drawSnakeAndFood = () => {
      snakeRef.current.forEach((seg, i) => {
        ctx.fillStyle =
          i === 0
            ? isDark
              ? "#f9fafb"
              : "#111827"
            : isDark
            ? "#9ca3af"
            : "#4b5563";
        ctx.fillRect(seg.x, seg.y, box, box);
      });

      const food = foodRef.current;
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(food.x, food.y, box, box);
    };

    const gameLoop = () => {
      if (isGameOver) return;

      drawGrid();
      drawSnakeAndFood();

      if (nextDirectionRef.current) {
        directionRef.current = nextDirectionRef.current;
        nextDirectionRef.current = null;
      }

      let snakeX = snakeRef.current[0].x;
      let snakeY = snakeRef.current[0].y;
      const dir = directionRef.current;

      if (dir === "LEFT") snakeX -= box;
      if (dir === "UP") snakeY -= box;
      if (dir === "RIGHT") snakeX += box;
      if (dir === "DOWN") snakeY += box;

      // wrap around edges
      if (snakeX < 0) snakeX = canvas.width - box;
      if (snakeX >= canvas.width) snakeX = 0;
      if (snakeY < 0) snakeY = canvas.height - box;
      if (snakeY >= canvas.height) snakeY = 0;

      const newHead = { x: snakeX, y: snakeY };
      const newSnake = [newHead, ...snakeRef.current];

      // check food collision
      const food = foodRef.current;
      if (snakeX === food.x && snakeY === food.y) {
        foodRef.current = {
          x: Math.floor(Math.random() * (canvas.width / box)) * box,
          y: Math.floor(Math.random() * (canvas.height / box)) * box,
        };
      } else {
        newSnake.pop();
      }

      // check self collision
      if (newSnake.slice(1).some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
        setIsGameOver(true);
        return;
      }

      snakeRef.current = newSnake;
    };

    const interval = setInterval(gameLoop, speed);
    return () => clearInterval(interval);
  }, [isGameOver, theme]);

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative">
        <button
          onClick={restart}
          className="absolute top-1 right-1 p-1 bg-white/70 dark:bg-black/70 hover:scale-110 transition-all rounded z-50"
        >
          <RotateCcw size={16} />
        </button>

        <canvas
          ref={canvasRef}
          width={200}
          height={200}
          className="border transition-colors"
        />

        {isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm transition-colors">
            <p className="font-heading text-red-500 font-extrabold text-2xl">Game Over</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnakeGame;
