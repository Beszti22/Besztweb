(function(){
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduced || !fine) return; // touch / reduced-motion devices keep the plain CSS hover

  var cards = document.querySelectorAll('.work-card');
  cards.forEach(function(card){
    var raf = null;

    function update(e){
      var rect = card.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width;
      var py = (e.clientY - rect.top) / rect.height;
      var rx = (0.5 - py) * 9; // deg
      var ry = (px - 0.5) * 9;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function(){
        card.style.setProperty('--rx', rx.toFixed(2) + 'deg');
        card.style.setProperty('--ry', ry.toFixed(2) + 'deg');
        card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      });
    }

    function reset(){
      if (raf) cancelAnimationFrame(raf);
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    }

    card.addEventListener('pointermove', update);
    card.addEventListener('pointerleave', reset);
    card.addEventListener('pointercancel', reset);
  });
})();
