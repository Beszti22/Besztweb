(function(){
  var sections = document.querySelectorAll('.split');
  if(!sections.length) return;

  if(!window.IntersectionObserver){
    sections.forEach(function(s){ s.classList.add('in-view'); });
    return;
  }

  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  sections.forEach(function(s){ observer.observe(s); });
})();
