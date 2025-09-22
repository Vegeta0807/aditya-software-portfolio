import { useEffect, useRef, useState } from 'react';

type RGB = [number, number, number];

interface AuroraProps {
  speed?: number;
  palette?: {
    orange?: RGB;
    blue?: RGB;
    base?: RGB;
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
  const uniformRef = useRef<any>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const startRef = useRef<number>(0);
  const [fallback, setFallback] = useState(false);

  const currentPaletteRef = useRef([
    [...(palette.orange ?? DEFAULT_PALETTE.orange)],
    [...(palette.blue ?? DEFAULT_PALETTE.blue)],
    [...(palette.base ?? DEFAULT_PALETTE.base)],
  ]);
  const targetPaletteRef = useRef([
    [...(palette.orange ?? DEFAULT_PALETTE.orange)],
    [...(palette.blue ?? DEFAULT_PALETTE.blue)],
    [...(palette.base ?? DEFAULT_PALETTE.base)],
  ]);
  const currentSpeedRef = useRef(speed);
  const targetSpeedRef = useRef(speed);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: true,
      powerPreference: 'high-performance',
    });

    if (!gl) {
      setFallback(true);
      return;
    }
    glRef.current = gl;

    const handleContextLost = () => setFallback(true);
    canvas.addEventListener('webglcontextlost', handleContextLost as any);

    const vertSrc = `
      attribute vec2 a_pos;
      void main() {
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    const fragSrc = `
      precision mediump float;
      uniform vec2 u_res;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_speed;
      uniform vec3 u_orange;
      uniform vec3 u_blue;
      uniform vec3 u_base;

      vec2 rotateAround(vec2 p, vec2 c, float ang) {
        vec2 d = p - c;
        float s = sin(ang);
        float cA = cos(ang);
        return c + vec2(cA*d.x - s*d.y, s*d.x + cA*d.y);
      }

      vec2 swirl(vec2 uv, vec2 c, float strength) {
        vec2 d = uv - c;
        float r = length(d);
        float ang = strength * exp(-r*6.0);
        float s = sin(ang);
        float cA = cos(ang);
        return c + vec2(cA*d.x - s*d.y, s*d.x + cA*d.y);
      }

      float band(vec2 uv, float center, float width) {
        float d = abs(uv.y - center)/width;
        return 1.0 - smoothstep(0.0, 1.0, d);
      }

      void main() {
        vec2 res = u_res;
        vec2 uv = gl_FragCoord.xy / res;
        float aspect = res.x / max(1.0, res.y);
        vec2 uvc = uv - 0.5;
        uvc.x *= aspect;
        uv = uvc + 0.5;

        float t = u_time * u_speed;

        // ==== INITIAL WAVES ====
uv.x += sin((uv.y + t*0.08)*6.0) * 0.007;
uv.y += cos((uv.x + t*0.1)*5.0) * 0.006;
uv.x += sin((uv.y + t*0.05)*8.0) * 0.004;
uv.y += cos((uv.x + t*0.06)*10.0) * 0.003;

        // ==== ROTATION + SWIRL ====
uv = rotateAround(uv, vec2(0.5), 0.03 * sin(t * 0.1));
        uv = swirl(uv, u_mouse, 3.2);
        uv += (u_mouse - 0.5) * 0.065;

        float topO = band(uv, 0.12, 0.092);
        float botO = band(uv, 0.88, 0.092);
        float blueB = band(uv, 0.78, 0.118);
        float highlight = band(uv, 0.30, 0.102);

        vec3 col = u_base;
        col += u_orange * (topO * 0.5);
        col += u_orange * (botO * 0.4);
        col += u_blue * (blueB * 0.5);
        col += vec3(1.0) * (highlight * 0.02);

        float breathe = 0.05 * sin(t * 0.55);
        col *= 1.0 + breathe;

        float r = length(uvc);
        float vign = smoothstep(0.95, 0.35, r);
        col *= mix(0.66, 1.0, vign);
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
    gl.useProgram(prog);

    const a_pos = gl.getAttribLocation(prog, 'a_pos');
    uniformRef.current = {
      u_res: gl.getUniformLocation(prog, 'u_res'),
      u_time: gl.getUniformLocation(prog, 'u_time'),
      u_mouse: gl.getUniformLocation(prog, 'u_mouse'),
      u_speed: gl.getUniformLocation(prog, 'u_speed'),
      u_orange: gl.getUniformLocation(prog, 'u_orange'),
      u_blue: gl.getUniformLocation(prog, 'u_blue'),
      u_base: gl.getUniformLocation(prog, 'u_base'),
    };

    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(a_pos);
    gl.vertexAttribPointer(a_pos, 2, gl.FLOAT, false, 0, 0);

    let dpr = Math.min(1.5, window.devicePixelRatio || 1);
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

    let lastMove = 0;
    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastMove < 30) return;
      lastMove = now;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = clamp01((e.clientX - rect.left) / rect.width);
      mouseRef.current.y = clamp01((e.clientY - rect.top) / rect.height);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const t0 = e.touches[0];
      mouseRef.current.x = clamp01((t0.clientX - rect.left) / rect.width);
      mouseRef.current.y = clamp01((t0.clientY - rect.top) / rect.height);
    };

    startRef.current = performance.now();
    let lastFrame = 0;
    const render = (time: number) => {
      if (time - lastFrame > 33) {
        lastFrame = time;
        const t = (performance.now() - startRef.current) / 1000;

        const cur = currentPaletteRef.current;
        const tgt = targetPaletteRef.current;
        const sCur = currentSpeedRef.current;
        const sTgt = targetSpeedRef.current;
        const ease = 0.05;
        for (let i = 0; i < 3; i++) {
          cur[i][0] = lerp(cur[i][0], tgt[i][0], ease);
          cur[i][1] = lerp(cur[i][1], tgt[i][1], ease);
          cur[i][2] = lerp(cur[i][2], tgt[i][2], ease);
        }
        currentSpeedRef.current = lerp(sCur, sTgt, ease);

        if (uniformRef.current?.u_time) gl.uniform1f(uniformRef.current.u_time, t);
        if (uniformRef.current?.u_mouse)
          gl.uniform2f(uniformRef.current.u_mouse, mouseRef.current.x, 1.0 - mouseRef.current.y);
        if (uniformRef.current?.u_speed) gl.uniform1f(uniformRef.current.u_speed, currentSpeedRef.current);
        if (uniformRef.current?.u_orange) gl.uniform3f(uniformRef.current.u_orange, cur[0][0], cur[0][1], cur[0][2]);
        if (uniformRef.current?.u_blue) gl.uniform3f(uniformRef.current.u_blue, cur[1][0], cur[1][1], cur[1][2]);
        if (uniformRef.current?.u_base) gl.uniform3f(uniformRef.current.u_base, cur[2][0], cur[2][1], cur[2][2]);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
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
      canvas.removeEventListener('webglcontextlost', handleContextLost as any);
      const glCleanup = glRef.current;
      if (glCleanup) {
        const ext = glCleanup.getExtension('WEBGL_lose_context');
        ext?.loseContext();
      }
    };
  }, []);

  useEffect(() => {
    targetPaletteRef.current = [
      [...(palette.orange ?? DEFAULT_PALETTE.orange)],
      [...(palette.blue ?? DEFAULT_PALETTE.blue)],
      [...(palette.base ?? DEFAULT_PALETTE.base)],
    ];
    targetSpeedRef.current = speed;
  }, [palette.orange, palette.blue, palette.base, speed]);

  const fallOrange = palette.orange ?? DEFAULT_PALETTE.orange;
  const fallBlue = palette.blue ?? DEFAULT_PALETTE.blue;
  const fallBase = palette.base ?? DEFAULT_PALETTE.base;

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
      }
    : {};

  return (
    <div className="aurora-bg" aria-hidden>
      {fallback ? (
        <div className="aurora-canvas" style={fallbackStyle} />
      ) : (
        <canvas
          ref={canvasRef}
          className="aurora-canvas absolute inset-0 z-[-1] pointer-events-none"
        />
      )}
    </div>
  );
};

export default AuroraBackground;
