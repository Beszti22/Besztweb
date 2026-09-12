(function(){
  var translations = {
    hu: {
      navServices: `Szolgáltatások`,
      navAbout: `Rólam`,
      navWork: `Munkáim`,
      navContact: `Kapcsolat`,
      heroH1: `Precíz weboldalak,<br>versenyzői tempóban.`,
      heroSub: `Egyszemélyes webfejlesztés mechatronikai háttérrel — gyors, pontos munka az első vázlattól az élesítésig.`,
      heroCta1: `Kérj ajánlatot`,
      heroCta2: `Munkáim megnézése`,
      servicesH2: `Amit csinálok`,
      service1Title: `Weboldal fejlesztés`,
      service1Desc: `Egyedi, gyors, karbantartható oldalak — statikus vagy dinamikus felépítésben, a célodhoz igazítva.`,
      service2Title: `UI/UX tervezés`,
      service2Desc: `Letisztult, célra tervezett felületek, amik nem csak szépek, hanem működnek is.`,
      service3Title: `Karbantartás & support`,
      service3Desc: `Gyors hibajavítás, tartalomfrissítés, apró funkciók — amikor sürgős.`,
      aboutH2: `Mérnöki pontosság, versenyzői hozzáállás`,
      aboutP1: `Mechatronikai mérnök hallgató vagyok a BME-n, IBM és Egis háttérrel. Versenyszerűen síelek, jártam junior világbajnokságon is — ott tanultam meg, hogy a részletek és a határidő nem alku tárgya. Ugyanezt hozom a weboldalakba: precíz kivitelezés, végig kontrollált folyamat.`,
      aboutSpec1Label: `Tanulmányok`,
      aboutSpec1Val: `BME, mechatronikai mérnöki`,
      aboutSpec2Label: `Tapasztalat`,
      aboutSpec2Val: `IBM, Egis`,
      aboutSpec3Label: `Verseny`,
      aboutSpec3Val: `Junior világbajnokság, síelés`,
      workH2: `Munkáim`,
      caseDesc: `Kétnyelvű klubhonlap saját kapcsolati-form backenddel, optimalizált galériával és automata deploy folyamattal.`,
      caseSpec1Label: `Nyelvek`,
      caseSpec2Label: `Backend`,
      caseSpec3Label: `Galéria`,
      caseSpec3Val: `87%-kal kisebb képméret`,
      caseLink: `Élő oldal megtekintése`,
      contactH2: `Beszéljünk a projektedről`,
      contactSub: `Írj pár sort arról, mire van szükséged — hamarosan válaszolok.`,
      contactCta: `Írj emailt`
    },
    en: {
      navServices: `Services`,
      navAbout: `About`,
      navWork: `Work`,
      navContact: `Contact`,
      heroH1: `Precise websites,<br>built at racing speed.`,
      heroSub: `One-person web development with an engineering background — fast, precise work from first draft to launch.`,
      heroCta1: `Get a quote`,
      heroCta2: `See my work`,
      servicesH2: `What I do`,
      service1Title: `Website development`,
      service1Desc: `Custom, fast, maintainable sites — static or dynamic, built around what you actually need.`,
      service2Title: `UI/UX design`,
      service2Desc: `Clean, purpose-built interfaces that don't just look good, but work.`,
      service3Title: `Maintenance & support`,
      service3Desc: `Quick fixes, content updates, small features — when it's urgent.`,
      aboutH2: `Engineering precision, a racer's mindset`,
      aboutP1: `I'm a mechatronics engineering student at BME, with experience at IBM and Egis. I also race competitively as an alpine skier and have raced at a junior world championship — where I learned that details and deadlines aren't negotiable. I bring the same standard to websites: precise execution, a controlled process from start to finish.`,
      aboutSpec1Label: `Studies`,
      aboutSpec1Val: `BME, Mechatronics Engineering`,
      aboutSpec2Label: `Experience`,
      aboutSpec2Val: `IBM, Egis`,
      aboutSpec3Label: `Racing`,
      aboutSpec3Val: `Junior World Championship, alpine skiing`,
      workH2: `Work`,
      caseDesc: `A bilingual club website with a custom contact-form backend, an optimised gallery, and automatic deployment.`,
      caseSpec1Label: `Languages`,
      caseSpec2Label: `Backend`,
      caseSpec3Label: `Gallery`,
      caseSpec3Val: `87% smaller image sizes`,
      caseLink: `View live site`,
      contactH2: `Let's talk about your project`,
      contactSub: `Send a few lines about what you need — I'll get back to you soon.`,
      contactCta: `Send an email`
    }
  };

  function applyLang(lang){
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var key = el.getAttribute('data-i18n');
      var dict = translations[lang];
      if(dict && dict[key] !== undefined){ el.innerHTML = dict[key]; }
    });
    document.documentElement.lang = lang;
    var btnHu = document.getElementById('btnHu');
    var btnEn = document.getElementById('btnEn');
    if(btnHu) btnHu.setAttribute('aria-pressed', lang === 'hu' ? 'true' : 'false');
    if(btnEn) btnEn.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
  }

  var STORAGE_KEY = 'besztweb-lang';

  function getSavedLang(){
    try{ return localStorage.getItem(STORAGE_KEY); }
    catch(e){ return null; }
  }
  function saveLang(lang){
    try{ localStorage.setItem(STORAGE_KEY, lang); }
    catch(e){ /* localStorage unavailable — language just won't persist */ }
  }

  var btnHu = document.getElementById('btnHu');
  var btnEn = document.getElementById('btnEn');
  if(btnHu) btnHu.addEventListener('click', function(){ applyLang('hu'); saveLang('hu'); });
  if(btnEn) btnEn.addEventListener('click', function(){ applyLang('en'); saveLang('en'); });

  applyLang(getSavedLang() || 'hu');
  window.applyLang = applyLang;
})();
