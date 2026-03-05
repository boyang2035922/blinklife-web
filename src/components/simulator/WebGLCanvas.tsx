"use client";

import { useEffect, useRef, useCallback } from "react";

interface WebGLCanvasProps {
  dots: Array<{ x: number; time: number }>;
  pulses: Array<{ x: number; y: number; createdAt: number }>;
  timelineProgress: number;
}

export function WebGLCanvas({ dots, pulses, timelineProgress }: WebGLCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const progRef = useRef<WebGLProgram | null>(null);
  const animRef = useRef<number>(0);
  const dotsRef = useRef(dots);
  const pulsesRef = useRef(pulses);

  dotsRef.current = dots;
  pulsesRef.current = pulses;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });
    if (!gl) return;
    glRef.current = gl;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // Full-screen quad shader for pulse effects
    const vsSource = `#version 300 es
      in vec2 aPos;
      void main() {
        gl_Position = vec4(aPos, 0.0, 1.0);
      }
    `;

    const fsSource = `#version 300 es
      precision highp float;
      uniform vec2 uResolution;
      uniform float uTime;
      uniform int uPulseCount;
      uniform vec2 uPulses[16];
      uniform float uPulseAges[16];
      uniform float uTimelineY;
      uniform float uProgress;
      uniform int uDotCount;
      uniform float uDotPositions[32];
      out vec4 fragColor;

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution;
        vec3 color = vec3(0.0);
        float alpha = 0.0;

        // Timeline bar
        float timelineWidth = 0.8;
        float timelineStart = (1.0 - timelineWidth) / 2.0;
        float timelineEnd = timelineStart + timelineWidth;
        float tlY = uTimelineY;
        float tlDist = abs(uv.y - tlY);

        // Timeline glow
        if (uv.x > timelineStart && uv.x < timelineEnd) {
          // Base line
          float lineGlow = exp(-tlDist * 300.0) * 0.3;
          color += vec3(0.114, 0.576, 1.0) * lineGlow;
          alpha += lineGlow;

          // Progress fill
          float progressX = timelineStart + uProgress * timelineWidth;
          if (uv.x < progressX) {
            float fillGlow = exp(-tlDist * 400.0) * 0.5;
            color += vec3(0.114, 0.576, 1.0) * fillGlow;
            alpha += fillGlow;
          }
        }

        // Dot markers on timeline
        for (int i = 0; i < 32; i++) {
          if (i >= uDotCount) break;
          float dotX = timelineStart + uDotPositions[i] * timelineWidth;
          float dotDist = distance(uv, vec2(dotX, tlY));

          // Dot glow
          float dotGlow = exp(-dotDist * 80.0) * 0.8;
          color += vec3(0.925, 0.282, 0.6) * dotGlow;
          alpha += dotGlow;

          // Clip brackets (vertical lines)
          float bracketWidth = 0.012;
          float leftBracket = dotX - bracketWidth;
          float rightBracket = dotX + bracketWidth;

          if (abs(uv.x - leftBracket) < 0.001 && abs(uv.y - tlY) < 0.03) {
            color += vec3(0.114, 0.576, 1.0) * 0.4;
            alpha += 0.4;
          }
          if (abs(uv.x - rightBracket) < 0.001 && abs(uv.y - tlY) < 0.03) {
            color += vec3(0.114, 0.576, 1.0) * 0.4;
            alpha += 0.4;
          }
        }

        // Pulse ripples
        for (int i = 0; i < 16; i++) {
          if (i >= uPulseCount) break;
          vec2 pulseCenter = uPulses[i];
          float age = uPulseAges[i];
          float dist = distance(uv, pulseCenter);

          // Expanding ring
          float radius = age * 0.5;
          float ringWidth = 0.008;
          float ring = smoothstep(radius - ringWidth, radius, dist)
                     - smoothstep(radius, radius + ringWidth, dist);
          float decay = exp(-age * 4.0);

          color += vec3(0.114, 0.576, 1.0) * ring * decay;
          alpha += ring * decay * 0.8;

          // Central flash
          float flash = exp(-dist * 40.0) * decay * 1.5;
          color += vec3(1.0, 1.0, 1.0) * flash;
          alpha += flash;

          // Signal arc (line from pulse to right)
          float signalProgress = min(age * 5.0, 1.0);
          float signalY = pulseCenter.y;
          float signalEndX = pulseCenter.x + 0.3 * signalProgress;
          if (uv.x > pulseCenter.x && uv.x < signalEndX && abs(uv.y - signalY) < 0.002) {
            float signalAlpha = (1.0 - (uv.x - pulseCenter.x) / 0.3) * decay;
            color += vec3(0.545, 0.361, 0.965) * signalAlpha;
            alpha += signalAlpha * 0.6;
          }
        }

        // Subtle grid
        vec2 grid = fract(uv * 40.0);
        float gridLine = step(0.97, grid.x) + step(0.97, grid.y);
        color += vec3(1.0) * gridLine * 0.015;
        alpha += gridLine * 0.015;

        fragColor = vec4(color, alpha);
      }
    `;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
      }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, vsSource);
    const fs = compile(gl.FRAGMENT_SHADER, fsSource);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    progRef.current = prog;

    // Full-screen quad
    const quadVerts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quadVerts, gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    const startTime = performance.now();

    const render = () => {
      const t = (performance.now() - startTime) / 1000;
      gl.useProgram(prog);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform2f(gl.getUniformLocation(prog, "uResolution"), canvas.width, canvas.height);
      gl.uniform1f(gl.getUniformLocation(prog, "uTime"), t);
      gl.uniform1f(gl.getUniformLocation(prog, "uTimelineY"), 0.35);
      gl.uniform1f(gl.getUniformLocation(prog, "uProgress"), (t * 0.02) % 1.0);

      // Pulses
      const now = performance.now();
      const activePulses = pulsesRef.current.filter((p) => now - p.createdAt < 1500);
      gl.uniform1i(gl.getUniformLocation(prog, "uPulseCount"), Math.min(activePulses.length, 16));
      for (let i = 0; i < Math.min(activePulses.length, 16); i++) {
        gl.uniform2f(gl.getUniformLocation(prog, `uPulses[${i}]`), activePulses[i].x, activePulses[i].y);
        gl.uniform1f(gl.getUniformLocation(prog, `uPulseAges[${i}]`), (now - activePulses[i].createdAt) / 1000);
      }

      // Dot positions on timeline
      const currentDots = dotsRef.current;
      gl.uniform1i(gl.getUniformLocation(prog, "uDotCount"), Math.min(currentDots.length, 32));
      for (let i = 0; i < Math.min(currentDots.length, 32); i++) {
        gl.uniform1f(gl.getUniformLocation(prog, `uDotPositions[${i}]`), currentDots[i].time);
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full rounded-3xl"
    />
  );
}
