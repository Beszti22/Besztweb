(function(){
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduced || !fine) return; // touch / reduced-motion devices keep the native cursor

  var dot = document.createElement('div');
  dot.className = 'cursor-dot';
  dot.setAttribute('aria-hidden', 'true');

  var ring = document.createElement('div');
  ring.className = 'cursor-ring';
  ring.setAttribute('aria-hidden', 'true');

  document.body.appendChild(ring);
  document.body.appendChild(dot);
  document.documentElement.classList.add('custom-cursor-on');

  var dotX = window.innerWidth / 2, dotY = window.innerHeight / 2;
  var ringX = dotX, ringY = dotY;
  var visible = false;
  var active = false; // hovering an interactive target
  var pressed = false;

  var HOVER_SELECTOR = 'a, button, .work-card, .btn, .text-link, [role="button"]';

  function onMove(e){
    dotX = e.clientX; dotY = e.clientY;
    if (!visible){
      visible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }
    var hit = e.target.closest ? e.target.closest(HOVER_SELECTOR) : null;
    var next = !!hit;
    if (next !== active){
      active = next;
      ring.classList.toggle('is-active', active);
      dot.classList.toggle('is-active', active);
    }
  }

  function onLeaveWindow(){
    visible = false;
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  }

  function onDown(){ pressed = true; ring.classList.add('is-pressed'); }
  function onUp(){ pressed = false; ring.classList.remove('is-pressed'); }

  document.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerdown', onDown, { passive: true });
  document.addEventListener('pointerup', onUp, { passive: true });
  document.addEventListener('mouseleave', onLeaveWindow);
  window.addEventListener('blur', onLeaveWindow);

  function frame(){
    // dot tracks exactly; ring eases toward it for a trailing-gate feel
    ringX += (dotX - ringX) * 0.18;
    ringY += (dotY - ringY) * 0.18;
    dot.style.transform = 'translate3d(' + dotX + 'px,' + dotY + 'px,0) translate(-50%,-50%)';
    ring.style.transform = 'translate3d(' + ringX + 'px,' + ringY + 'px,0) translate(-50%,-50%)';
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
