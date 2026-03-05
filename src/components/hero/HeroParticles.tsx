"use client";

import { useEffect, useRef } from "react";

// Lightweight WebGL particle system for hero background
export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    // Resize
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // Shaders
    const vsSource = `#version 300 es
      in vec2 aPos;
      in float aSize;
      in float aAlpha;
      in float aSpeed;
      in float aPhase;
      uniform float uTime;
      uniform vec2 uResolution;
      out float vAlpha;

      void main() {
        float t = uTime * aSpeed + aPhase;
        vec2 pos = aPos;
        pos.x += sin(t * 0.7) * 0.02;
        pos.y += cos(t * 0.5) * 0.015 + mod(t * 0.01, 2.0) - 1.0;
        pos.y = mod(pos.y + 1.0, 2.0) - 1.0;

        float breathe = 0.5 + 0.5 * sin(t * 1.5);
        vAlpha = aAlpha * (0.3 + 0.7 * breathe);

        gl_Position = vec4(pos, 0.0, 1.0);
        gl_PointSize = aSize * (uResolution.y / 900.0);
      }
    `;

    const fsSource = `#version 300 es
      precision mediump float;
      in float vAlpha;
      out vec4 fragColor;

      void main() {
        vec2 cxy = 2.0 * gl_PointCoord - 1.0;
        float r = dot(cxy, cxy);
        if (r > 1.0) discard;
        float soft = 1.0 - smoothstep(0.3, 1.0, r);
        // Brand blue tint: rgb(29, 147, 255) = (0.114, 0.576, 1.0)
        vec3 color = mix(vec3(0.114, 0.576, 1.0), vec3(0.545, 0.361, 0.965), r);
        fragColor = vec4(color, soft * vAlpha * 0.6);
      }
    `;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, vsSource);
    const fs = compile(gl.FRAGMENT_SHADER, fsSource);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Particles
    const COUNT = 200;
    const data = new Float32Array(COUNT * 5); // x, y, size, alpha, speed, phase
    const fullData = new Float32Array(COUNT * 6);
    for (let i = 0; i < COUNT; i++) {
      const j = i * 6;
      fullData[j] = Math.random() * 2 - 1; // x
      fullData[j + 1] = Math.random() * 2 - 1; // y
      fullData[j + 2] = 1.5 + Math.random() * 3; // size
      fullData[j + 3] = 0.1 + Math.random() * 0.5; // alpha
      fullData[j + 4] = 0.3 + Math.random() * 1.5; // speed
      fullData[j + 5] = Math.random() * Math.PI * 2; // phase
    }

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, fullData, gl.STATIC_DRAW);

    const stride = 6 * 4;
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, stride, 0);

    const aSize = gl.getAttribLocation(prog, "aSize");
    gl.enableVertexAttribArray(aSize);
    gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, stride, 8);

    const aAlpha = gl.getAttribLocation(prog, "aAlpha");
    gl.enableVertexAttribArray(aAlpha);
    gl.vertexAttribPointer(aAlpha, 1, gl.FLOAT, false, stride, 12);

    const aSpeed = gl.getAttribLocation(prog, "aSpeed");
    gl.enableVertexAttribArray(aSpeed);
    gl.vertexAttribPointer(aSpeed, 1, gl.FLOAT, false, stride, 16);

    const aPhase = gl.getAttribLocation(prog, "aPhase");
    gl.enableVertexAttribArray(aPhase);
    gl.vertexAttribPointer(aPhase, 1, gl.FLOAT, false, stride, 20);

    const uTime = gl.getUniformLocation(prog, "uTime");
    const uRes = gl.getUniformLocation(prog, "uResolution");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    const start = performance.now();
    const render = () => {
      const t = (performance.now() - start) / 1000;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.POINTS, 0, COUNT);
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
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7 }}
    />
  );
}
