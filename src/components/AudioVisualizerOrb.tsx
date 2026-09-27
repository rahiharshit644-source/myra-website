import React, { useEffect, useRef, useState } from "react";

export type OrbState = "idle" | "listening" | "processing" | "speaking" | "error";

interface AudioVisualizerOrbProps {
  initialState?: OrbState;
  interactive?: boolean;
  size?: number;
  className?: string;
}

export const AudioVisualizerOrb: React.FC<AudioVisualizerOrbProps> = ({
  initialState = "idle",
  interactive = true,
  size = 280,
  className = "",
}) => {
  const [orbState, setOrbState] = useState<OrbState>(initialState);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    setOrbState(initialState);
  }, [initialState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const render = () => {
      time += 0.035;
      ctx.clearRect(0, 0, size, size);

      const centerX = size / 2;
      const centerY = size / 2;
      const baseRadius = size * 0.32;

      // Color scheme matching state
      let primaryColor = "rgba(14, 165, 233, 0.9)"; // Cyan / Blue default (Material 3 accent)
      let secondaryColor = "rgba(56, 189, 248, 0.4)";
      let glowColor = "rgba(14, 165, 233, 0.25)";
      let pulseSpeed = 1.0;
      let waveCount = 3;

      if (orbState === "listening") {
        primaryColor = "rgba(16, 185, 129, 0.9)"; // Green for listening
        secondaryColor = "rgba(52, 211, 153, 0.4)";
        glowColor = "rgba(16, 185, 129, 0.3)";
        pulseSpeed = 2.4;
        waveCount = 5;
      } else if (orbState === "processing") {
        primaryColor = "rgba(168, 85, 247, 0.9)"; // Purple for reasoning
        secondaryColor = "rgba(192, 132, 252, 0.4)";
        glowColor = "rgba(168, 85, 247, 0.3)";
        pulseSpeed = 1.8;
        waveCount = 4;
      } else if (orbState === "speaking") {
        primaryColor = "rgba(6, 182, 212, 0.95)"; // Cyan for speech streaming
        secondaryColor = "rgba(103, 232, 249, 0.5)";
        glowColor = "rgba(6, 182, 212, 0.35)";
        pulseSpeed = 3.0;
        waveCount = 6;
      } else if (orbState === "error") {
        primaryColor = "rgba(239, 68, 68, 0.9)"; // Red for error
        secondaryColor = "rgba(248, 113, 113, 0.4)";
        glowColor = "rgba(239, 68, 68, 0.3)";
        pulseSpeed = 0.8;
      }

      // 1. Subtle Outer Glow
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        baseRadius * 0.5,
        centerX,
        centerY,
        baseRadius * 1.55
      );
      glowGrad.addColorStop(0, glowColor);
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 1.55, 0, Math.PI * 2);
      ctx.fill();

      // 2. Multi-layered Harmonic Waves
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const layerOffset = (w * Math.PI) / waveCount;
        const currentRadius = baseRadius + Math.sin(time * pulseSpeed + layerOffset) * 6;

        for (let a = 0; a <= Math.PI * 2; a += 0.05) {
          const distortion =
            Math.sin(a * 4 + time * pulseSpeed + layerOffset) * (orbState === "speaking" ? 7 : 3.5) +
            Math.cos(a * 2 - time * 1.5) * 3;
          const r = currentRadius + distortion;
          const x = centerX + Math.cos(a) * r;
          const y = centerY + Math.sin(a) * r;
          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();

        ctx.strokeStyle = w === 0 ? primaryColor : secondaryColor;
        ctx.lineWidth = w === 0 ? 2 : 1;
        ctx.stroke();
      }

      // 3. Central Core Sphere
      const coreGrad = ctx.createRadialGradient(
        centerX - baseRadius * 0.25,
        centerY - baseRadius * 0.25,
        baseRadius * 0.1,
        centerX,
        centerY,
        baseRadius
      );
      coreGrad.addColorStop(0, primaryColor);
      coreGrad.addColorStop(0.7, secondaryColor);
      coreGrad.addColorStop(1, "rgba(10, 10, 10, 0.8)");

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 0.9, 0, Math.PI * 2);
      ctx.fill();

      // 4. Subtle Specular Highlight
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.beginPath();
      ctx.arc(centerX - baseRadius * 0.35, centerY - baseRadius * 0.35, baseRadius * 0.2, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [orbState, size]);

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: size, height: size }}
          className="rounded-full select-none"
        />
      </div>

      {interactive && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
          {(["idle", "listening", "processing", "speaking", "error"] as OrbState[]).map((st) => (
            <button
              key={st}
              onClick={() => setOrbState(st)}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors capitalize ${
                orbState === st
                  ? "bg-neutral-800 text-neutral-100 border border-neutral-700 shadow-xs"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
