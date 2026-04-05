import { useEffect, useRef } from "react";

// Piece shapes only — color assigned randomly per piece
const PIECE_SHAPES = [
  [[0,1],[1,1],[2,1],[3,1]], // I
  [[0,0],[1,0],[0,1],[1,1]], // O
  [[1,0],[0,1],[1,1],[2,1]], // T
  [[1,0],[2,0],[0,1],[1,1]], // S
  [[0,0],[1,0],[1,1],[2,1]], // Z
  [[0,0],[0,1],[1,1],[2,1]], // J
  [[2,0],[0,1],[1,1],[2,1]], // L
];

// Softer retro palette — readable, but less "neon"
const COLORS = [
  "#7dd3fc", // sky (soft cyan)
  "#a5b4fc", // indigo
  "#c4b5fd", // violet
  "#f9a8d4", // pink
  "#fdba74", // orange
  "#facc15", // arcade coin yellow
  "#86efac", // green
  "#fca5a5", // red
];

// Pre-compute all 4 rotations, normalized to origin
const ROTATIONS = PIECE_SHAPES.map((shape) => {
  const rots: number[][][] = [shape];
  for (let r = 1; r < 4; r++) {
    const prev = rots[r - 1];
    rots.push(prev.map(([x, y]) => [y, -x]));
  }
  return rots.map((rot) => {
    const minX = Math.min(...rot.map((c) => c[0]));
    const minY = Math.min(...rot.map((c) => c[1]));
    return rot.map(([x, y]) => [x - minX, y - minY]);
  });
});

// Derived from screen width at runtime
const CELL_SIZE = 36;          // px per cell (approx — recalculated to fit exactly)
const FALL_SPEED = 1.4;        // rows/sec normal
const SOFT_DROP_SPEED = 10;    // rows/sec soft drop
const MOVE_INTERVAL_MS = 75;
const ROT_INTERVAL_MS = 130;
const CLEAR_DUR_MS = 400;
const BOARD_FADE_MS = 900;

// Stack must reach this height ratio before a full board wipe
const FILL_THRESHOLD_WEB = 0.50;
const FILL_THRESHOLD_MOBILE = 0.75;

type Cell = { colorIndex: number } | null;
type Board = Cell[][];

function createBoard(cols: number, rows: number): Board {
  return Array.from({ length: rows }, () => Array(cols).fill(null));
}

function collides(
  board: Board,
  cols: number,
  rows: number,
  shapeIdx: number,
  rot: number,
  x: number,
  y: number
): boolean {
  for (const [cx, cy] of ROTATIONS[shapeIdx][rot]) {
    const gx = x + cx;
    const gy = y + cy;
    if (gx < 0 || gx >= cols || gy >= rows) return true;
    if (gy >= 0 && board[gy][gx] !== null) return true;
  }
  return false;
}

function stackHeightRatio(board: Board, rows: number): number {
  for (let y = 0; y < rows; y++) {
    if (board[y].some((v) => v !== null)) return (rows - y) / rows;
  }
  return 0;
}

function computeTarget(
  board: Board,
  cols: number,
  rows: number,
  shapeIdx: number,
  currentX: number,
  currentY: number
): { targetX: number; targetRot: number } {
  const rots = ROTATIONS[shapeIdx];
  let best = -Infinity;
  let bestX = currentX;
  let bestRot = 0;

  for (let r = 0; r < rots.length; r++) {
    const cells = rots[r];
    const w = Math.max(...cells.map((c) => c[0])) + 1;
    for (let x = 0; x <= cols - w; x++) {
      let y = currentY;
      while (!collides(board, cols, rows, shapeIdx, r, x, y + 1)) y++;

      const sim = board.map((row) => row.slice());
      for (const [cx, cy] of cells) {
        const gy = y + cy;
        if (gy >= 0 && gy < rows) sim[gy][x + cx] = { colorIndex: 0 };
      }

      const lines = sim.filter((row) => row.every((v) => v !== null)).length;
      const heights = Array.from({ length: cols }, (_, i) => {
        for (let ry = 0; ry < rows; ry++) {
          if (sim[ry][i] !== null) return rows - ry;
        }
        return 0;
      });
      const maxH = Math.max(...heights);
      let holes = 0, bump = 0;
      for (let i = 0; i < cols; i++) {
        let seen = false;
        for (let ry = 0; ry < rows; ry++) {
          if (sim[ry][i] !== null) seen = true;
          else if (seen) holes++;
        }
        if (i < cols - 1) bump += Math.abs(heights[i] - heights[i + 1]);
      }
      const score =
        lines * 100 - holes * 8 - bump * 1.2 - maxH * 1.5 + (Math.random() - 0.5) * 4;
      if (score > best) { best = score; bestX = x; bestRot = r; }
    }
  }
  return { targetX: bestX, targetRot: bestRot };
}

export default function TetrisBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Grid dimensions — recalculated on resize
    let COLS = 10;
    let ROWS = 20;
    let CELL = 32;
    let W = 0, H = 0;
    let isMobile = false;

    // Sim state
    let board: Board = createBoard(COLS, ROWS);
    let shapeIdx = 0;
    let colorIdx = 0;
    let pieceRot = 0;
    let pieceX = 0;
    let pieceY = -2;
    let targetX = 0;
    let targetRot = 0;
    let moveTimer = 0;
    let rotTimer = 0;
    let fallTimer = 0;
    let softDrop = false;
    let clearAnim: { rows: number[]; t: number } | null = null;
    let clearTimer = 0;
    let boardFadeAnim: { t: number } | null = null;
    let boardFadeTimer = 0;
    let lastTime: number | null = null;
    let raf = 0;
    // Trail: each row-step the falling piece records ghost cells that fade out
    type TrailParticle = { x: number; y: number; colorIndex: number; spawnedAt: number };
    let trail: TrailParticle[] = [];
    const TRAIL_FADE_MS = 550;
    const TRAIL_MAX_ALPHA = 0.26;
    let nowMs = 0;

    function spawn() {
      shapeIdx = Math.floor(Math.random() * PIECE_SHAPES.length);
      colorIdx = Math.floor(Math.random() * COLORS.length);
      pieceRot = 0;
      const cells = ROTATIONS[shapeIdx][0];
      const w = Math.max(...cells.map((c) => c[0])) + 1;
      pieceX = Math.floor((COLS - w) / 2);
      pieceY = -2;
      fallTimer = 0;
      softDrop = false;
      const plan = computeTarget(board, COLS, ROWS, shapeIdx, pieceX, pieceY);
      targetX = plan.targetX;
      targetRot = plan.targetRot;
      moveTimer = 0;
      rotTimer = 0;
      trail = [];
    }

    function startBoardFade() {
      boardFadeAnim = { t: 0 };
      boardFadeTimer = 0;
    }

    function lockPiece() {
      const cells = ROTATIONS[shapeIdx][pieceRot];
      let topped = false;
      for (const [cx, cy] of cells) {
        const gy = pieceY + cy;
        if (gy < 0) { topped = true; continue; }
        if (gy < ROWS) board[gy][pieceX + cx] = { colorIndex: colorIdx };
      }
      if (topped) { startBoardFade(); return; }

      const fullRows: number[] = [];
      for (let y = 0; y < ROWS; y++) {
        if (board[y].every((v) => v !== null)) fullRows.push(y);
      }
      if (fullRows.length > 0) {
        clearAnim = { rows: fullRows, t: 0 };
        clearTimer = 0;
        return;
      }

      const threshold = isMobile ? FILL_THRESHOLD_MOBILE : FILL_THRESHOLD_WEB;
      if (stackHeightRatio(board, ROWS) >= threshold) {
        startBoardFade();
        return;
      }
      spawn();
    }

    function clearLines() {
      if (!clearAnim) return;
      const rowSet = new Set(clearAnim.rows);
      board = board.filter((_, i) => !rowSet.has(i));
      while (board.length < ROWS) board.unshift(Array(COLS).fill(null));
      clearAnim = null;
      spawn();
    }

    function update(dt: number) {
      if (boardFadeAnim) {
        boardFadeTimer += dt;
        boardFadeAnim.t = Math.min(1, boardFadeTimer / BOARD_FADE_MS);
        if (boardFadeTimer >= BOARD_FADE_MS) {
          board = createBoard(COLS, ROWS);
          boardFadeAnim = null;
          spawn();
        }
        return;
      }
      if (clearAnim) {
        clearTimer += dt;
        clearAnim.t = Math.min(1, clearTimer / CLEAR_DUR_MS);
        if (clearTimer >= CLEAR_DUR_MS) clearLines();
        return;
      }

      rotTimer += dt;
      if (rotTimer >= ROT_INTERVAL_MS && pieceRot !== targetRot) {
        const numRots = ROTATIONS[shapeIdx].length;
        const next = (pieceRot + 1) % numRots;
        if (!collides(board, COLS, ROWS, shapeIdx, next, pieceX, pieceY)) {
          pieceRot = next;
        } else {
          for (const k of [-1, 1, -2, 2]) {
            if (!collides(board, COLS, ROWS, shapeIdx, next, pieceX + k, pieceY)) {
              pieceRot = next; pieceX += k; break;
            }
          }
        }
        rotTimer = 0;
      }

      moveTimer += dt;
      if (moveTimer >= MOVE_INTERVAL_MS && pieceX !== targetX) {
        const dx = targetX > pieceX ? 1 : -1;
        if (!collides(board, COLS, ROWS, shapeIdx, pieceRot, pieceX + dx, pieceY))
          pieceX += dx;
        moveTimer = 0;
      }

      const aligned = pieceX === targetX && pieceRot === targetRot;
      if (aligned && !softDrop && Math.random() < 0.6) softDrop = true;

      const speed = softDrop && aligned ? SOFT_DROP_SPEED : FALL_SPEED;
      fallTimer += dt;
      const interval = 1000 / speed;
      while (fallTimer >= interval) {
        fallTimer -= interval;
        if (!collides(board, COLS, ROWS, shapeIdx, pieceRot, pieceX, pieceY + 1)) {
          pieceY++;
          // Record trail particles for each visible cell of the piece
          for (const [cx, cy] of ROTATIONS[shapeIdx][pieceRot]) {
            const gy = pieceY + cy;
            if (gy >= 0) trail.push({ x: pieceX + cx, y: gy, colorIndex: colorIdx, spawnedAt: nowMs });
          }
          // Keep trail array from growing indefinitely
          if (trail.length > 300) trail = trail.slice(trail.length - 300);
        } else {
          lockPiece();
          return;
        }
      }
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      const isDark = document.documentElement.classList.contains("dark");
      const gridColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
      const strokeColor = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.12)";

      // ox=0 because CELL = W/COLS exactly (float), so no leftover gap
      // oy anchors row 0 so that row ROWS-1 sits flush at the bottom
      const ox = 0;
      const oy = H - ROWS * CELL;

      // Grid lines drawn from the same ox/oy origin as the blocks
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= COLS; x++) {
        ctx.beginPath(); ctx.moveTo(ox + x * CELL, 0); ctx.lineTo(ox + x * CELL, H); ctx.stroke();
      }
      for (let y = 0; y <= ROWS + 2; y++) {
        ctx.beginPath(); ctx.moveTo(0, oy + y * CELL); ctx.lineTo(W, oy + y * CELL); ctx.stroke();
      }

      const boardAlpha = boardFadeAnim ? 1 - boardFadeAnim.t : 1;

      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 0.5;
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const cell = board[y][x];
          if (!cell) continue;
          let alpha = 0.72 * boardAlpha;
          if (clearAnim?.rows.includes(y)) {
            alpha = (0.4 + 0.6 * Math.sin(clearAnim.t * Math.PI)) * boardAlpha;
          }
          ctx.globalAlpha = alpha;
          ctx.fillStyle = COLORS[cell.colorIndex];
          ctx.fillRect(ox + x * CELL + 1, oy + y * CELL + 1, CELL - 2, CELL - 2);
          ctx.strokeRect(ox + x * CELL + 1.5, oy + y * CELL + 1.5, CELL - 3, CELL - 3);
        }
      }
      ctx.globalAlpha = 1;

      // Trail — fading ghost cells left behind as piece falls
      if (!clearAnim && !boardFadeAnim && trail.length > 0) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 0.5;
        const expiredBefore = nowMs - TRAIL_FADE_MS;
        // Purge old particles
        trail = trail.filter(p => p.spawnedAt > expiredBefore);
        for (const p of trail) {
          const age = nowMs - p.spawnedAt;
          const t = age / TRAIL_FADE_MS; // 0 = fresh, 1 = gone
          const alpha = TRAIL_MAX_ALPHA * (1 - t);
          if (alpha <= 0.01) continue;
          ctx.globalAlpha = alpha;
          ctx.fillStyle = COLORS[p.colorIndex];
          // Shrink inward as it fades for a clean ghost look
          const shrink = t * (CELL * 0.3);
          const s = CELL - 2 - shrink * 2;
          if (s <= 0) continue;
          ctx.fillRect(ox + p.x * CELL + 1 + shrink, oy + p.y * CELL + 1 + shrink, s, s);
          ctx.strokeRect(ox + p.x * CELL + 1.5 + shrink, oy + p.y * CELL + 1.5 + shrink, s - 1, s - 1);
        }
        ctx.globalAlpha = 1;
      }

      // Falling piece
      if (!clearAnim && !boardFadeAnim) {
        const cells = ROTATIONS[shapeIdx][pieceRot];
        ctx.globalAlpha = 0.82;
        ctx.fillStyle = COLORS[colorIdx];
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 0.5;
        for (const [cx, cy] of cells) {
          const gx = pieceX + cx, gy = pieceY + cy;
          if (gy < 0) continue;
          ctx.fillRect(ox + gx * CELL + 1, oy + gy * CELL + 1, CELL - 2, CELL - 2);
          ctx.strokeRect(ox + gx * CELL + 1.5, oy + gy * CELL + 1.5, CELL - 3, CELL - 3);
        }
        ctx.globalAlpha = 1;
      }
    }

    function loop(ts: number) {
      if (!lastTime) lastTime = ts;
      const dt = Math.min(ts - lastTime, 50);
      lastTime = ts;
      nowMs = ts;
      update(dt);
      draw();
      raf = requestAnimationFrame(loop);
    }

    function resize() {
      if (!canvas) return;
      if (!container) return;
      if (!ctx) return;
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      W = rect.width;
      H = rect.height;
      isMobile = W < 640;

      // Pick COLS so CELL divides W with no remainder — grid and blocks stay aligned
      COLS = Math.round(W / CELL_SIZE);
      CELL = W / COLS; // float division — no leftover gap, ox will be exactly 0

      // ROWS tall enough to fill height; pieces spawn above row 0
      ROWS = Math.ceil(H / CELL) + 2;

      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      board = createBoard(COLS, ROWS);
      spawn();
    }

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(container);
    resize();
    raf = requestAnimationFrame(loop);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden${
        className ? " " + className : ""
      }`}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
