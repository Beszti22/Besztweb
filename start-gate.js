(function(){
  var el = document.getElementById('startGate');
  if (!el) return;

  if (document.documentElement.classList.contains('skip-intro')){
    el.remove();
    return;
  }

  document.documentElement.classList.add('intro-lock');

  var clockEl = document.getElementById('startGateClock');
  var t0 = null;
  var RANDOMIZE_MS = 620; // lights ignite during this window (see CSS delays)

  function tick(ts){
    if (t0 === null) t0 = ts;
    var elapsed = ts - t0;
    if (elapsed < RANDOMIZE_MS){
      if (clockEl) clockEl.textContent = (Math.random() * 9).toFixed(2);
      requestAnimationFrame(tick);
    } else {
      if (clockEl) clockEl.textContent = '0.00';
      el.classList.add('is-go');
      setTimeout(leave, 220);
    }
  }
  requestAnimationFrame(tick);

  function leave(){
    el.classList.add('is-leaving');
    document.documentElement.classList.remove('intro-lock');
    setTimeout(function(){
      el.remove();
      try { sessionStorage.setItem('besztweb-intro-seen', '1'); } catch(e){}
    }, 620);
  }

  // Safety net: never let a stalled rAF loop trap the page behind the overlay.
  setTimeout(function(){
    if (document.body.contains(el) && !el.classList.contains('is-leaving')){
      el.classList.add('is-go');
      leave();
    }
  }, 2200);
})();
