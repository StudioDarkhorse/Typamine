"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/themeStore";
import { resolveDynamicBgColor, dynamicBgStyle } from "@/lib/dynamicStyle";

// Porting 1:1 (stesso raymarching SDF + BRDF chrome da studio) di
// sample/src/components/LiquidChromeHero.vue (Three.js + GLSL puro, nessuna
// libreria React-specific) — otto "corpi" fluidi grandi + sedici micro-bead,
// fuse con uno smooth-min, illuminate da un ambiente da studio fotografico
// (softbox dall'alto, due barre laterali strette, pannelli neri per il
// contrasto) e riflesse su una BRDF "ultra-chrome" con glint speculare,
// fresnel a bordo e un tocco di iridescenza. uMouse guida un attrattore in
// più: la massa liquida "insegue" leggermente il puntatore.
interface ChromeBlobHeroProps {
  /** Slot per titolo/sottotitolo/CTA — nessun contenuto imposto, massima flessibilità (badge, h1, p, bottoni: decide chi lo usa). */
  children?: React.ReactNode;
  align?: "left" | "center" | "right";
  vAlign?: "top" | "center" | "bottom";
  /** Overlay sopra il canvas (dyn-bg: "bg-white/40 dark:bg-black/40") — per scurire/schiarire il chrome e far risaltare il testo sopra. */
  overlayColorClassName?: string;
  /**
   * Colore del "mercurio" — stesso formato dei color picker granulari admin,
   * es. "bg-[#ec4899] dark:bg-[#34d399]" (rosa in light, verde in dark).
   * Omesso = cromo argento classico (nessuna tinta), comportamento identico
   * all'originale. Risolto via lib/dynamicStyle (stessa utility usata da
   * SimpleHero/GranularBGColorPicker) e passato allo shader come uniform.
   */
  blobColorClassName?: string;
  /**
   * Colore di sfondo del canvas (dove il raymarch non colpisce nulla) —
   * stesso formato di blobColorClassName, es. "bg-white dark:bg-[#09090b]".
   * Lo shader originale ha uno sfondo "studio" bianco fisso: senza questa
   * prop resta bianco anche in dark mode. Omesso = bianco in entrambe le
   * modalità (comportamento identico all'originale).
   */
  backgroundColorClassName?: string;
  /** Il liquido insegue il puntatore — off per un loop puramente ambientale. */
  interactive?: boolean;
  /**
   * Classe di altezza del contenitore (Tailwind). `min-h-*` (non `h-*`):
   * usato come hero normale resta un blocco alto quanto il viewport;
   * usato come wrapper di un'intera pagina cresce con `children` (il
   * canvas segue via ResizeObserver, vedi effect sotto — non serve altro).
   */
  heightClassName?: string;
  /**
   * Override completo delle classi del wrapper contenuto (di default un
   * flex-col centrato in stile hero, guidato da align/vAlign). Passalo per
   * usare il componente come wrapper di un'intera pagina invece che come
   * singolo hero: es. "relative z-10 w-full flex flex-col" — a quel punto
   * struttura tu le sezioni dentro (hero + griglia card + ecc), ognuna col
   * proprio allineamento; align/vAlign vengono ignorati.
   */
  contentClassName?: string;
  /**
   * Il canvas resta ancorato al viewport (position:fixed) invece di
   * scorrere via col resto della pagina — utile quando il componente
   * wrappa un'intera pagina più alta di uno schermo, così il "mercurio"
   * resta sempre visibile in sottofondo mentre scrolli invece di finire
   * fuori schermo dopo il primo viewport. Di default off (comportamento
   * normale da hero, il canvas scorre via col contenuto).
   */
  fixedBackground?: boolean;
  /**
   * Risoluzione interna del canvas, come moltiplicatore massimo dei CSS pixel.
   * Il fragment shader qui è un raymarcher: il costo è *lineare nei pixel
   * disegnati*, quindi il pixel ratio è la leva più diretta sulle performance
   * — ma anche l'unica cosa che determina la nitidezza dei bordi. Tutti i
   * bordi che si vedono (silhouette del blob, glint speculari con esponente
   * 4000, strisce del softbox) nascono dentro il fragment shader: non c'è
   * nessun antialias di pipeline che li recuperi, quindi sotto la
   * risoluzione nativa il compositor si limita a fare upscale bilineare e i
   * gradini si vedono.
   *   "auto"   → segue devicePixelRatio fino a 2× (default): nitidezza nativa
   *              su display retina.
   *   "high"   → identico ad "auto", esplicito quando il blob è il soggetto.
   *   "medium" → 1.5×: ~44% dei pixel di 2×, gradini quasi invisibili su
   *              retina. Il compromesso da preferire su pagine pesanti.
   *   "low"    → 1×: nessun supersampling. Solo per schede deboli/mobile,
   *              i bordi diventano visibilmente scalettati su retina.
   */
  quality?: ChromeBlobQuality;
  /**
   * Tetto di frame al secondo. L'animazione avanza a `uTime * 0.12`: è così
   * lenta che sopra i 30fps non c'è nessun guadagno percepibile, mentre su un
   * pannello 120/144Hz il renderer disegnerebbe 2-2.4 volte più frame del
   * necessario. 0 = nessun limite (segue il refresh dello schermo).
   */
  maxFps?: number;
  className?: string;
}

export type ChromeBlobQuality = "auto" | "high" | "medium" | "low";

// Tetto applicato a devicePixelRatio (non un valore assoluto: su un display
// non-retina, dpr 1, tutti i livelli tranne "low" rendono comunque a 1×).
const QUALITY_PIXEL_RATIO: Record<ChromeBlobQuality, number> = {
  auto: 2,
  high: 2,
  medium: 1.5,
  low: 1,
};

const ALIGN_MAP: Record<string, string> = { left: "items-start text-left", center: "items-center text-center", right: "items-end text-right" };
const V_ALIGN_MAP: Record<string, string> = { top: "justify-start", center: "justify-center", bottom: "justify-end" };

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uTintColor;
  uniform vec3 uBgColor;
  varying vec2 vUv;

  #define MAX_STEPS 90
  // I corpi sono confinati in un raggio di ~7.2 dall'origine (i micro-bead
  // arrivano a x 5.2 / y 3.6, piu' raggio e allargamento dello smooth-min) e
  // la camera sta a z = -8.2: nessun raggio puo' incontrare qualcosa oltre
  // ~15.2. I 40 di prima facevano marciare ogni pixel di sfondo per 25 unita'
  // di vuoto (o, piu' spesso, gli facevano esaurire tutti i 90 step).
  #define MAX_DIST 16.0
  // Raggio della bounding sphere usata per il rigetto analitico: 8.0 lascia
  // margine sopra i ~7.2 effettivi, cosi' non taglia mai la silhouette.
  #define SCENE_RADIUS 8.0
  #define SURF_DIST 0.001

  float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
  }

  float getSceneSDF(vec3 p) {
    float t = uTime * 0.12;
    vec2 mPos = (uMouse - 0.5) * 6.5;

    float d = length(p - vec3(mPos.x, mPos.y, 1.2)) - 0.9;

    for(int i = 0; i < 8; i++) {
        float fi = float(i);
        vec3 pos = vec3(
            sin(t * 0.7 + fi * 1.5) * 3.8,
            cos(t * 0.5 + fi * 2.2) * 2.2,
            sin(t * 0.9 + fi * 0.8) * 1.0
        );
        vec3 p_str = p - pos;
        p_str.y *= 0.8 + 0.3 * sin(t + fi);
        float r = 0.5 + 0.3 * sin(t * 0.8 + fi);
        d = smin(d, length(p_str) - r, 1.1);
    }

    for(int j = 0; j < 16; j++) {
        float fj = float(j);
        vec3 pos = vec3(
            sin(t * 1.3 + fj * 4.1) * 5.2,
            cos(t * 1.0 + fj * 2.8) * 3.6,
            sin(t * 1.6 + fj * 0.7) * 0.8
        );
        float r = 0.08 + 0.2 * abs(cos(t * 1.8 + fj * 1.2));
        d = smin(d, length(p - pos) - r, 0.45);
    }

    d += sin(p.x * 2.5 + t) * sin(p.y * 2.5 + t) * 0.06;
    return d;
  }

  vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.001, 0.0);
    vec3 n = vec3(
        getSceneSDF(p + e.xyy) - getSceneSDF(p - e.xyy),
        getSceneSDF(p + e.yxy) - getSceneSDF(p - e.yxy),
        getSceneSDF(p + e.yyx) - getSceneSDF(p - e.yyx)
    );
    return normalize(n);
  }

  vec3 getEnvironment(vec3 r) {
    vec3 col = vec3(1.0);

    float overhead = smoothstep(-0.5, 0.5, r.y);
    col = mix(vec3(0.85, 0.9, 0.96), vec3(1.0), overhead);

    float bar1 = pow(max(0.0, dot(r, normalize(vec3(1.5, 0.2, -0.8)))), 24.0);
    float bar2 = pow(max(0.0, dot(r, normalize(vec3(-1.2, 0.1, -0.4)))), 32.0);
    col += vec3(1.8) * bar1 * overhead;
    col += vec3(1.2) * bar2 * (1.0 - overhead);

    float panelA = smoothstep(0.4, 0.9, abs(r.x));
    float panelB = smoothstep(0.2, 0.7, abs(r.z));
    col = mix(col, vec3(0.0), panelA * 0.85 * (1.0 - overhead));
    col = mix(col, vec3(0.01), panelB * 0.65);

    float strips = pow(abs(cos(r.x * 2.5 + r.z * 1.5 + uTime * 0.05)), 60.0);
    col = mix(col, vec3(1.5), strips * 0.4 * overhead);

    return col;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;

    vec3 ro = vec3(0.0, 0.0, -8.2);
    vec3 rd = normalize(vec3(uv, 3.2));

    // Rigetto analitico contro la bounding sphere della scena, prima di
    // toccare il raymarcher: la SDF costa 24 sfere + uno smooth-min per
    // valutazione, quindi un raggio di sfondo che non intersecava nulla
    // bruciava fino a 90 x 24 length() per niente. Qui bastano una decina di
    // istruzioni per saperlo, e i pixel di sfondo — la maggioranza — escono
    // subito.
    float b = dot(ro, rd);
    float c = dot(ro, ro) - SCENE_RADIUS * SCENE_RADIUS;
    float h = b * b - c;

    // Fuori dalla sfera non c'e' geometria: dTotal oltre MAX_DIST marca il
    // pixel come sfondo senza entrare nel loop. Non si esce con un return
    // anticipato perche' la correzione gamma in fondo va applicata anche allo
    // sfondo.
    float dTotal = MAX_DIST + 1.0;

    if(h > 0.0) {
        h = sqrt(h);
        // Si parte dall'ingresso nella sfera (mai dietro la camera) e si
        // smette all'uscita: il vuoto prima e dopo non va marciato.
        float tExit = min(MAX_DIST, -b + h);
        dTotal = max(0.0, -b - h);

        // Epsilon di superficie proporzionale all'impronta del pixel: mezzo
        // pixel proiettato alla distanza corrente (il piano immagine sta a
        // 3.2, quindi un pixel vale 1/uResolution.y in unita' uv). Con una
        // soglia fissa a 0.001 i raggi lontani continuavano a fare passi
        // sub-pixel per una precisione che lo schermo non puo' rappresentare.
        float epsSlope = 0.5 / (uResolution.y * 3.2);

        for(int i = 0; i < MAX_STEPS; i++) {
            vec3 p = ro + rd * dTotal;
            float dS = getSceneSDF(p);
            float eps = SURF_DIST + dTotal * epsSlope;
            dTotal += dS;
            if(dTotal > tExit || abs(dS) < eps) break;
        }

        // tExit puo' essere piu' vicino di MAX_DIST: senza normalizzare, un
        // raggio uscito dalla sfera senza colpire nulla passerebbe comunque
        // il test "dTotal < MAX_DIST" qui sotto e verrebbe ombreggiato.
        if(dTotal > tExit) dTotal = MAX_DIST + 1.0;
    }

    vec3 col = uBgColor;

    if(dTotal < MAX_DIST) {
        vec3 p = ro + rd * dTotal;
        vec3 n = getNormal(p);
        vec3 v = -rd;
        vec3 r = reflect(rd, n);

        vec3 reflection = getEnvironment(r);

        col = reflection * vec3(0.98, 0.99, 1.0);

        vec3 lightPos = normalize(vec3((uMouse.x - 0.5) * 15.0, (uMouse.y - 0.5) * 15.0 + 5.0, -3.5));

        float specPeak = pow(max(0.0, dot(reflect(-lightPos, n), v)), 4000.0);
        col += vec3(3.5) * specPeak;

        float fres = pow(1.0 - max(0.0, dot(n, v)), 6.0);
        col = mix(col, vec3(1.0), fres * 0.75);

        col += fres * vec3(0.6, 0.8, 1.2) * 0.6;

        float specSoft = pow(max(0.0, dot(reflect(-lightPos, n), v)), 64.0);
        col += vec3(0.4, 0.6, 1.0) * specSoft * 0.35;

        float curve = 1.0 - abs(dot(n, vec3(0,0,1)));
        col *= mix(1.0, 0.7, pow(curve, 3.5));

        // Tinta del "mercurio" — moltiplicativa (non additiva) per non
        // spegnere i glint speculari, che restano bianchi/luminosi sopra la
        // base colorata. uTintColor = (1,1,1) => nessuna tinta, cromo argento.
        col *= mix(vec3(1.0), uTintColor * 1.35, 0.55);
    }

    col = pow(col, vec3(0.85));
    col = clamp(col, 0.0, 1.0);

    gl_FragColor = vec4(col, 1.0);
  }
`;

// "rgba(r, g, b, a)" -> [0..1, 0..1, 0..1]. resolveDynamicBgColor risolve
// sempre a questo formato (vedi lib/dynamicStyle.ts), sia per token della
// palette che per hex custom "bg-[#xxxxxx]".
function rgbaStringToVec3(rgba: string | undefined): [number, number, number] | null {
  if (!rgba) return null;
  const match = rgba.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (!match) return null;
  return [Number(match[1]) / 255, Number(match[2]) / 255, Number(match[3]) / 255];
}

export function ChromeBlobHero({
  children,
  align = "center",
  vAlign = "center",
  overlayColorClassName,
  blobColorClassName,
  backgroundColorClassName,
  interactive = true,
  heightClassName = "min-h-[100dvh]",
  contentClassName,
  fixedBackground = false,
  quality = "auto",
  maxFps = 30,
  className,
}: ChromeBlobHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const { theme } = useThemeStore();

  // Tinta risolta light/dark una volta sola (dipende solo dalla prop, non
  // rimonta il canvas quando cambia tema — solo l'uniform si aggiorna, vedi
  // effect sotto).
  const { light: lightTint, dark: darkTint } = resolveDynamicBgColor(blobColorClassName);
  const lightVec = rgbaStringToVec3(lightTint) ?? [1, 1, 1];
  const darkVec = rgbaStringToVec3(darkTint) ?? lightVec;

  const { light: lightBg, dark: darkBg } = resolveDynamicBgColor(backgroundColorClassName);
  const lightBgVec = rgbaStringToVec3(lightBg) ?? [1, 1, 1];
  const darkBgVec = rgbaStringToVec3(darkBg) ?? lightBgVec;

  // Aggiorna tinta + sfondo sul material già montato quando cambia tema,
  // senza ricreare il renderer/scene (evita un flash nero al toggle).
  useEffect(() => {
    const vec = theme === "dark" ? darkVec : lightVec;
    materialRef.current?.uniforms.uTintColor.value.set(vec[0], vec[1], vec[2]);
    const bgVec = theme === "dark" ? darkBgVec : lightBgVec;
    materialRef.current?.uniforms.uBgColor.value.set(bgVec[0], bgVec[1], bgVec[2]);
  }, [theme, lightVec[0], lightVec[1], lightVec[2], darkVec[0], darkVec[1], darkVec[2], lightBgVec[0], lightBgVec[1], lightBgVec[2], darkBgVec[0], darkBgVec[1], darkBgVec[2]]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationId = 0;
    const mouse = new THREE.Vector2(0.5, 0.5);
    const targetMouse = new THREE.Vector2(0.5, 0.5);

    const initialVec = theme === "dark" ? darkVec : lightVec;
    const initialBgVec = theme === "dark" ? darkBgVec : lightBgVec;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        // Il disegno è un unico quad fullscreen: non esiste un bordo
        // geometrico da antialiasare (tutti i bordi che si vedono nascono
        // dentro il fragment shader), quindi l'MSAA qui costava banda e un
        // resolve pass per niente.
        antialias: false,
        // Depth e stencil venivano allocati e mai usati: nessun test di
        // profondità su un singolo quad senza occlusioni.
        depth: false,
        stencil: false,
        // Nota: da three r163 il context viene creato comunque con
        // `alpha: true` (hardcoded in WebGLRenderer), quindi questo flag
        // governa solo l'alpha del clear color, non il canale del drawing
        // buffer. Il canvas resta di fatto opaco perché il fragment shader
        // scrive sempre alpha 1.0 su tutta la superficie.
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      // WebGL non disponibile (browser/headless/GPU disattivata) — niente
      // crash, l'hero resta comunque utilizzabile senza lo sfondo animato
      // (overlay + contenuto restano visibili sul background della sezione).
      return;
    }

    // In modalità wrapper-pagina (fixedBackground) il canvas è ancorato al
    // viewport (position:fixed) e non al contenitore, che può essere molto
    // più alto di uno schermo — dimensioni/resize seguono la finestra, non
    // il bounding box del contenitore.
    const getSize = () =>
      fixedBackground
        ? { width: window.innerWidth, height: window.innerHeight }
        : { width: container.getBoundingClientRect().width, height: container.getBoundingClientRect().height };

    const initialSize = getSize();
    renderer.setSize(initialSize.width, initialSize.height);
    // Vedi la prop `quality`: il costo di questo shader è lineare nei pixel
    // disegnati, quindi il pixel ratio è la leva più diretta che c'è.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, QUALITY_PIXEL_RATIO[quality]));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(initialSize.width, initialSize.height) },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uTintColor: { value: new THREE.Vector3(initialVec[0], initialVec[1], initialVec[2]) },
        uBgColor: { value: new THREE.Vector3(initialBgVec[0], initialBgVec[1], initialBgVec[2]) },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    // 0.08 (valore originale) lascia un lag visibile: muovendo il cursore
    // l'attrattore/luce resta sistematicamente indietro rispetto alla
    // posizione reale — a schermi larghi si legge come "insegue un punto un
    // po' più a sinistra" durante il movimento. 0.22 resta morbido (niente
    // scatti) ma molto più "attaccato" al puntatore reale.
    const MOUSE_LERP = 0.22;
    // Tetto di fps: si continua a chiedere un frame ad ogni rAF (così il lerp
    // del mouse resta agganciato al refresh reale e non "scatta" a 30Hz), ma
    // il render — l'unica parte cara — parte solo quando è passato
    // abbastanza tempo. La tolleranza di mezzo millisecondo evita di saltare
    // un frame per un arrotondamento quando il refresh è esattamente pari al
    // target (60Hz con maxFps 60).
    const frameInterval = maxFps > 0 ? 1000 / maxFps : 0;
    let lastRenderAt = -Infinity;
    const tick = (now: number) => {
      animationId = requestAnimationFrame(tick);
      mouse.x += (targetMouse.x - mouse.x) * MOUSE_LERP;
      mouse.y += (targetMouse.y - mouse.y) * MOUSE_LERP;
      if (now - lastRenderAt < frameInterval - 0.5) return;
      lastRenderAt = now;
      material.uniforms.uTime.value = performance.now() * 0.001;
      material.uniforms.uMouse.value.set(mouse.x, mouse.y);
      renderer!.render(scene, camera);
    };
    animationId = requestAnimationFrame(tick);

    const handleResize = () => {
      const s = getSize();
      renderer!.setSize(s.width, s.height);
      material.uniforms.uResolution.value.set(s.width, s.height);
    };

    // fixedBackground: il canvas segue la finestra (position:fixed), non il
    // contenitore — ResizeObserver sul contenitore non basta (può crescere
    // per motivi indipendenti dallo scroll), serve il resize della finestra.
    let resizeObserver: ResizeObserver | null = null;
    if (fixedBackground) {
      window.addEventListener("resize", handleResize);
    } else {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
    }

    // Coordinate relative al CONTENITORE quando l'hero e' incassato in una
    // pagina normale; relative alla FINESTRA quando fa da sfondo fisso a
    // un'intera pagina (piu' vicino al comportamento dell'originale Vue).
    const handlePointerMove = (e: PointerEvent) => {
      if (fixedBackground) {
        targetMouse.x = e.clientX / window.innerWidth;
        targetMouse.y = 1.0 - e.clientY / window.innerHeight;
        return;
      }
      const r = container.getBoundingClientRect();
      targetMouse.x = (e.clientX - r.left) / r.width;
      targetMouse.y = 1.0 - (e.clientY - r.top) / r.height;
    };
    if (interactive) {
      const target = fixedBackground ? window : container;
      target.addEventListener("pointermove", handlePointerMove as EventListener);
    }

    return () => {
      cancelAnimationFrame(animationId);
      if (fixedBackground) {
        window.removeEventListener("resize", handleResize);
      } else {
        resizeObserver?.disconnect();
      }
      if (interactive) {
        const target = fixedBackground ? window : container;
        target.removeEventListener("pointermove", handlePointerMove as EventListener);
      }
      mesh.geometry.dispose();
      material.dispose();
      renderer!.dispose();
      materialRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interactive, fixedBackground, quality, maxFps]);

  // Da hero singolo: canvas/overlay assoluti al contenitore, che ha
  // overflow-hidden (il classico blocco autonomo). Da wrapper di pagina
  // (fixedBackground): fixed al viewport, e niente overflow-hidden sul
  // contenitore — deve poter crescere quanto serve senza tagliare nulla.
  const layerPosition = fixedBackground ? "fixed" : "absolute";

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex",
        // In modalita' wrapper-pagina niente overflow-hidden (il contenuto deve
        // poter crescere in altezza), ma l'asse X va comunque tagliato: senza,
        // un figlio piu' largo del viewport (tipico su mobile con tracking
        // grandi) allarga il documento e crea scroll orizzontale di pagina.
        // `clip` solo su X non crea uno scroll container, quindi il canvas
        // position:fixed resta ancorato al viewport.
        fixedBackground ? "overflow-x-clip" : "overflow-hidden",
        heightClassName,
        className,
      )}
    >
      <canvas ref={canvasRef} className={cn(layerPosition, "inset-0 w-full h-full -z-20")} />

      {overlayColorClassName && <div className={cn(layerPosition, "inset-0 -z-10 dyn-bg")} style={dynamicBgStyle(overlayColorClassName)} />}

      <div
        className={
          contentClassName ??
          cn("relative z-10 flex flex-col gap-3 p-8 sm:p-16 w-full", ALIGN_MAP[align] || ALIGN_MAP.center, V_ALIGN_MAP[vAlign] || V_ALIGN_MAP.center)
        }
      >
        {children}
      </div>
    </div>
  );
}

export default ChromeBlobHero;
