(function(){
  var canvas = document.getElementById('heroCodeBg');
  if(!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  // Real fragments from this site's own source — the "code" behind the headline
  // is genuinely what builds the pages, not decorative filler.
  var LINES = [
    "<section id=\"work\" class=\"split container\">",
    "const translations = { hu: {...}, en: {...} };",
    "function applyLang(lang){",
    "  document.querySelectorAll('[data-i18n]')",
    "    .forEach(el => { ... });",
    "}",
    ".work-card:hover{ transform: translateY(-6px); }",
    "border: 1px solid var(--line);",
    "aspect-ratio: 1 / 1;",
    "background: linear-gradient(var(--gate-red), var(--gate-blue));",
    "git commit -m \"feat: munkáim szekció\"",
    "git push origin main",
    "export default function Hero(){",
    "  return <canvas ref={ref} />;",
    "}",
    "@media (prefers-reduced-motion: reduce){",
    "  .split{ opacity:1; transform:none; }",
    "}",
    "<meta name=\"viewport\" content=\"width=device-width\">",
    "object-fit: cover;",
    "const rail = document.querySelector('.rail');",
    "npm run build && vercel --prod",
    "<img loading=\"lazy\" alt=\"...\" src=\"...\">",
    "color: var(--ink);",
    "if (prefersReducedMotion) return;",
    "requestAnimationFrame(draw);",
    "h1{ font-size: clamp(2.1rem,5vw,3.4rem); }",
    "addEventListener('scroll', reveal, {passive:true});",
    "transition: 320ms cubic-bezier(.4,0,.2,1);"
  ];

  var KEYWORDS = /\b(const|function|return|export|default|if|border|background|color|transition|transform|aspect-ratio|object-fit|section|import|addEventListener|requestAnimationFrame|git|npm|commit|push|build)\b/;
  var STRINGS = /("[^"]*"|'[^']*')/;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0;
  var cols = [];
  var FONT_SIZE = 14;
  var LINE_HEIGHT = 22;
  var COL_WIDTH = 300;

  function resize(){
    var rect = canvas.parentElement.getBoundingClientRect();
    W = rect.width; H = rect.height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var count = Math.max(2, Math.ceil(W / COL_WIDTH) + 1);
    cols = [];
    for (var i = 0; i < count; i++){
      cols.push({
        x: i * COL_WIDTH + (COL_WIDTH - 260) / 2,
        offset: Math.random() * H,
        speed: 6 + Math.random() * 5, // px/sec, gentle
        lineStart: Math.floor(Math.random() * LINES.length)
      });
    }
  }

  function drawLine(text, x, y){
    // crude token coloring: strings accent red, keywords accent blue, rest muted
    var parts = [];
    var m = STRINGS.exec(text);
    if (m){
      parts.push({t: text.slice(0, m.index), c: 'kw'});
      parts.push({t: m[0], c: 'str'});
      parts.push({t: text.slice(m.index + m[0].length), c: 'kw'});
    } else {
      parts.push({t: text, c: 'kw'});
    }
    var cx = x;
    parts.forEach(function(p){
      // split by keyword matches within non-string parts
      var remaining = p.t;
      if (p.c === 'str'){
        ctx.fillStyle = 'rgba(232,56,79,0.38)'; // gate-red, faint
        ctx.fillText(remaining, cx, y);
        cx += ctx.measureText(remaining).width;
        return;
      }
      while (remaining.length){
        var km = KEYWORDS.exec(remaining);
        if (!km){
          ctx.fillStyle = 'rgba(154,160,172,0.26)'; // ink-muted, faint
          ctx.fillText(remaining, cx, y);
          cx += ctx.measureText(remaining).width;
          break;
        }
        var pre = remaining.slice(0, km.index);
        ctx.fillStyle = 'rgba(154,160,172,0.26)';
        ctx.fillText(pre, cx, y);
        cx += ctx.measureText(pre).width;
        ctx.fillStyle = 'rgba(62,123,255,0.42)'; // gate-blue, faint
        ctx.fillText(km[0], cx, y);
        cx += ctx.measureText(km[0]).width;
        remaining = remaining.slice(km.index + km[0].length);
      }
    });
  }

  function draw(dt){
    ctx.clearRect(0, 0, W, H);
    ctx.font = FONT_SIZE + 'px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
    ctx.textBaseline = 'top';

    cols.forEach(function(col){
      col.offset -= col.speed * dt;
      var wrap = (Math.ceil(H / LINE_HEIGHT) + 2) * LINE_HEIGHT;
      if (col.offset < -wrap) col.offset += wrap;

      var startIndex = Math.floor(-col.offset / LINE_HEIGHT);
      var y0 = col.offset + startIndex * LINE_HEIGHT;
      var rows = Math.ceil(H / LINE_HEIGHT) + 2;
      for (var r = 0; r < rows; r++){
        var lineIdx = (col.lineStart + startIndex + r) % LINES.length;
        if (lineIdx < 0) lineIdx += LINES.length;
        var y = y0 + r * LINE_HEIGHT;
        if (y > -LINE_HEIGHT && y < H + LINE_HEIGHT){
          drawLine(LINES[lineIdx], col.x, y);
        }
      }
    });
  }

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var last = null;
  var running = true;

  function frame(ts){
    if (!running) return;
    if (last === null) last = ts;
    var dt = Math.min((ts - last) / 1000, 0.1);
    last = ts;
    draw(dt);
    if (!reduceMotion) requestAnimationFrame(frame);
  }

  function start(){
    resize();
    if (reduceMotion){
      draw(0); // single static frame, no motion
      return;
    }
    requestAnimationFrame(frame);
  }

  document.addEventListener('visibilitychange', function(){
    running = document.visibilityState === 'visible';
    if (running && !reduceMotion){ last = null; requestAnimationFrame(frame); }
  });

  window.addEventListener('resize', function(){
    resize();
    if (reduceMotion) draw(0);
  });

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
