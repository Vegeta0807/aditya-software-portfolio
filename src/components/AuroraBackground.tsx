import { useEffect, useRef, useState } from 'react';

// WebGL shader-based aurora with configurable speed and palette
// Smoothly interpolates palette and speed for seamless transitions
// Includes graceful CSS fallback when WebGL is unavailable
// Props:
// - speed: motion multiplier (default 1.8)
// - palette: { orange, blue, base } RGB colors in 0..1

type RGB = [number, number, number];

interface AuroraProps {
  speed?: number;
  palette?: {
    orange?: RGB; // primary band
    blue?: RGB;   // secondary band
    base?: RGB;   // base background
  };
}

const DEFAULT_PALETTE = {
  orange: [1.0, 0.42, 0.22] as RGB,
  blue: [0.20, 0.44, 1.0] as RGB,
  base: [0.04, 0.06, 0.08] as RGB,
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const to255 = (v: number) => Math.round(clamp01(v) * 255);
const rgb = (c: RGB) => `rgb(${to255(c[0])}, ${to255(c[1])}, ${to255(c[2])})`;
const rgba = (c: RGB, a: number) => `rgba(${to255(c[0])}, ${to255(c[1])}, ${to255(c[2])}, ${clamp01(a)})`;

const AuroraBackground = ({ speed = 1.8, palette = {} }: AuroraProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformRef = useRef<{
    u_res: WebGLUniformLocation | null;
    u_time: WebGLUniformLocation | null;
    u_mouse: WebGLUniformLocation | null;
    u_speed: WebGLUniformLocation | null;
    u_orange: WebGLUniformLocation | null;
    u_blue: WebGLUniformLocation | null;
    u_base: WebGLUniformLocation | null;
  } | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const startRef = useRef<number>(0);
  const [fallback, setFallback] = useState(false);

  // Palette/speed interpolation refs
  const currentPaletteRef = useRef<RGB[]>([
    [...(palette.orange ?? DEFAULT_PALETTE.orange)] as RGB,
    [...(palette.blue ?? DEFAULT_PALETTE.blue)] as RGB,
    [...(palette.base ?? DEFAULT_PALETTE.base)] as RGB,
  ]);
  const targetPaletteRef = useRef<RGB[]>([
    [...(palette.orange ?? DEFAULT_PALETTE.orange)] as RGB,
    [...(palette.blue ?? DEFAULT_PALETTE.blue)] as RGB,
    [...(palette.base ?? DEFAULT_PALETTE.base)] as RGB,
  ]);

  const currentSpeedRef = useRef<number>(speed);
  const targetSpeedRef = useRef<number>(speed);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      setFallback(true);
      return;
    }

    glRef.current = gl;

    const handleContextLost = () => setFallback(true);
    canvas.addEventListener('webglcontextlost', handleContextLost, { passive: true } as EventListenerOptions);

    const vertSrc = `
      attribute vec2 a_pos;
      void main() {
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    const fragSrc = `
      precision highp float;
      uniform vec2 u_res;      // viewport in physical pixels
      uniform float u_time;    // seconds
      uniform vec2 u_mouse;    // 0..1
      uniform float u_speed;   // motion multiplier
      uniform vec3 u_orange;   // band A color
      uniform vec3 u_blue;     // band B color
      uniform vec3 u_base;     // base color

      vec2 rotateAround(vec2 p, vec2 c, float ang) {
        vec2 d = p - c;
        float s = sin(ang), cA = cos(ang);
        return c + vec2(cA * d.x - s * d.y, s * d.x + cA * d.y);
      }

      vec2 swirl(vec2 uv, vec2 c, float strength) {
        vec2 d = uv - c;
        float r = length(d);
        float ang = strength * exp(-r * 6.0);
        float s = sin(ang), cA = cos(ang);
        return c + vec2(cA * d.x - s * d.y, s * d.x + cA * d.y);
      }

      vec2 flow(vec2 uv, float t) {
        // Balanced motion for smoother feel
        float w1 = 0.028;
        float w2 = 0.020;
        vec2 u1 = uv + vec2( sin(uv.y * 8.0 - t*0.9), cos(uv.x * 7.0 + t*0.7) ) * w1;
        vec2 u2 = uv + vec2( sin((uv.y + u1.x) * 13.0 + t*1.2), cos((uv.x + u1.y) * 11.0 - t*1.0) ) * w2;
        return u2;
      }

      float band(vec2 uv, float center, float width) {
        float d = (uv.y - center) / width;
        return exp(-0.5 * d * d);
      }

      void main() {
        vec2 res = u_res;
        vec2 uv = gl_FragCoord.xy / res; // 0..1

        // aspect-correct to keep bands proportionate
        float aspect = res.x / max(1.0, res.y);
        vec2 uvc = uv - 0.5;
        uvc.x *= aspect;
        uv = uvc + 0.5;

        float t = u_time * u_speed;

        // Global rotation
        uv = rotateAround(uv, vec2(0.5), 0.04 * sin(t * 0.2));

        // Mouse interaction (kept responsive but calmer)
        vec2 m = u_mouse;
        uv = swirl(uv, m, 3.2);
        uv += (m - 0.5) * 0.065;

        // Domain warp
        vec2 duv = flow(uv, t);

        // Bands
        float topO   = band(duv, 0.12, 0.092);
        float botO   = band(duv, 0.88, 0.092);
        float blueB  = band(duv, 0.78, 0.118);
        float highlight = band(duv, 0.30, 0.102);

        // Compose
        vec3 col = u_base;
        col += u_orange * (topO * 1.12);
        col += u_orange * (botO * 1.02);
        col += u_blue   * (blueB * 1.12);
        col += vec3(1.0) * (highlight * 0.05);

        // Breathing pulse
        float breathe = 0.05 * sin(t * 0.55);
        col *= 1.0 + breathe;

        // Vignette
        float r = length(uvc);
        float vign = smoothstep(0.95, 0.35, r);
        col *= mix(0.66, 1.0, vign);

        // Gamma/contrast tweak
        col = pow(col, vec3(0.93));
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const createShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = createShader(gl.VERTEX_SHADER, vertSrc);
    const fs = createShader(gl.FRAGMENT_SHADER, fragSrc);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(prog));
      return;
    }

    programRef.current = prog;
    gl.useProgram(prog);

    const a_pos = gl.getAttribLocation(prog, 'a_pos');
    const u_res = gl.getUniformLocation(prog, 'u_res');
    const u_time = gl.getUniformLocation(prog, 'u_time');
    const u_mouse = gl.getUniformLocation(prog, 'u_mouse');
    const u_speed = gl.getUniformLocation(prog, 'u_speed');
    const u_orange = gl.getUniformLocation(prog, 'u_orange');
    const u_blue = gl.getUniformLocation(prog, 'u_blue');
    const u_base = gl.getUniformLocation(prog, 'u_base');
    uniformRef.current = { u_res, u_time, u_mouse, u_speed, u_orange, u_blue, u_base };

    // Fullscreen big triangle
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    const verts = new Float32Array([
      -1, -1,
       3, -1,
      -1,  3,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(a_pos);
    gl.vertexAttribPointer(a_pos, 2, gl.FLOAT, false, 0, 0);

    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    const resize = () => {
      const w = Math.max(1, Math.floor(window.innerWidth * dpr));
      const h = Math.max(1, Math.floor(window.innerHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      gl.viewport(0, 0, w, h);
      if (uniformRef.current?.u_res) gl.uniform2f(uniformRef.current.u_res, w, h);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseRef.current.x = clamp01(x);
      mouseRef.current.y = clamp01(y);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const t0 = e.touches[0];
      const x = (t0.clientX - rect.left) / rect.width;
      const y = (t0.clientY - rect.top) / rect.height;
      mouseRef.current.x = clamp01(x);
      mouseRef.current.y = clamp01(y);
    };

    startRef.current = performance.now();

    const render = () => {
      const t = (performance.now() - startRef.current) / 1000;

      // Smoothly update palette towards target
      const cur = currentPaletteRef.current;
      const tgt = targetPaletteRef.current;
      const sCur = currentSpeedRef.current;
      const sTgt = targetSpeedRef.current;
      const ease = 0.05; // smoother transitions
      for (let i = 0; i < 3; i++) {
        cur[i][0] = lerp(cur[i][0], tgt[i][0], ease);
        cur[i][1] = lerp(cur[i][1], tgt[i][1], ease);
        cur[i][2] = lerp(cur[i][2], tgt[i][2], ease);
      }
      currentSpeedRef.current = lerp(sCur, sTgt, ease);

      if (uniformRef.current?.u_time) gl.uniform1f(uniformRef.current.u_time, t);
      if (uniformRef.current?.u_mouse) gl.uniform2f(uniformRef.current.u_mouse, mouseRef.current.x, 1.0 - mouseRef.current.y);
      if (uniformRef.current?.u_speed) gl.uniform1f(uniformRef.current.u_speed, currentSpeedRef.current);
      if (uniformRef.current?.u_orange) gl.uniform3f(uniformRef.current.u_orange, cur[0][0], cur[0][1], cur[0][2]);
      if (uniformRef.current?.u_blue) gl.uniform3f(uniformRef.current.u_blue, cur[1][0], cur[1][1], cur[1][2]);
      if (uniformRef.current?.u_base) gl.uniform3f(uniformRef.current.u_base, cur[2][0], cur[2][1], cur[2][2]);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      rafRef.current = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('webglcontextlost', handleContextLost as EventListener);

      const glCleanup = glRef.current;
      if (glCleanup && programRef.current) {
        const ext = glCleanup.getExtension('WEBGL_lose_context');
        ext?.loseContext();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update targets when props change
  useEffect(() => {
    targetPaletteRef.current = [
      [...(palette.orange ?? DEFAULT_PALETTE.orange)] as RGB,
      [...(palette.blue ?? DEFAULT_PALETTE.blue)] as RGB,
      [...(palette.base ?? DEFAULT_PALETTE.base)] as RGB,
    ];
    targetSpeedRef.current = speed;
  }, [palette.orange, palette.blue, palette.base, speed]);

  // Compute fallback style from incoming palette
  const fallOrange = (palette.orange ?? DEFAULT_PALETTE.orange) as RGB;
  const fallBlue = (palette.blue ?? DEFAULT_PALETTE.blue) as RGB;
  const fallBase = (palette.base ?? DEFAULT_PALETTE.base) as RGB;

  const fallbackStyle: React.CSSProperties = fallback
    ? {
        position: 'absolute',
        inset: 0,
        backgroundColor: rgb(fallBase),
        backgroundImage: [
          `radial-gradient(85% 55% at 50% -10%, ${rgba(fallOrange, 0.9)}, ${rgba(fallOrange, 0)} 60%)`,
          `radial-gradient(95% 65% at 50% 112%, ${rgba(fallOrange, 0.85)}, ${rgba(fallOrange, 0)} 60%)`,
          `radial-gradient(95% 70% at 50% 120%, ${rgba(fallBlue, 0.8)}, ${rgba(fallBlue, 0)} 60%)`,
        ].join(', '),
        filter: 'saturate(1.05) contrast(1.02)',
        transition: 'background-color 600ms ease, filter 600ms ease',
      }
    : {};

  return (
    <div className="aurora-bg" aria-hidden>
      {fallback ? (
        <div className="aurora-canvas" style={fallbackStyle} />
      ) : (
        <canvas ref={canvasRef} className="aurora-canvas" />
      )}
    </div>
  );
};

export default AuroraBackground;
