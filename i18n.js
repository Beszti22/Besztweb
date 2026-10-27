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
      aboutP1: `Kettős képzésben tanulok a BME-n: műszaki menedzser szakon (pénzügymenedzsment specializáció) és mechatronikai mérnöki szakon egyszerre, közben egy féléves Erasmus cserét is elvégeztem az észt TalTechen. Dolgoztam már a Siemens Energynél, az IBM-nél és az Egis Gyógyszergyárban — pénzügyi, minőségügyi és üzemfenntartási területen. Tíz évig versenyszerűen judóztam, most alpesi síben versenyzek nemzetközi szinten, jártam junior világbajnokságon is. Ugyanezt a fegyelmet és pontosságot hozom a weboldalakba: kontrollált folyamat, tartott határidők.`,
      aboutSpec1Label: `Tanulmányok`,
      aboutSpec1Val: `BME — műszaki menedzser & mechatronikai mérnöki`,
      aboutSpec2Label: `Tapasztalat`,
      aboutSpec2Val: `Siemens Energy, IBM, Egis`,
      aboutSpec3Label: `Verseny`,
      aboutSpec3Val: `Alpesi sí (jr. világbajnokság), 10 év judo`,
      workH2: `Munkáim`,
      caseDesc: `Kétnyelvű klubhonlap saját kapcsolati-form backenddel, optimalizált galériával és automata deploy folyamattal.`,
      caseSpec1Label: `Nyelvek`,
      caseSpec2Label: `Backend`,
      caseSpec3Label: `Galéria`,
      caseSpec3Val: `87%-kal kisebb képméret`,
      caseLink: `Élő oldal megtekintése`,
      case2Desc: `Közösségi sportegyesületi oldal a Mátra lábánál, hat szakosztállyal — évszakonként váltó, interaktív hős-szekcióval és jelentkezési formmal.`,
      case2Spec1Label: `Szakosztályok`,
      case2Spec1Val: `6 (sí, túra, multisport, vízi sport, tenisz, kosár)`,
      case2Spec3Label: `Interaktív`,
      case2Spec3Val: `Évszakváltós műholdkép- és domborzat-vizualizáció`,
      case3Desc: `Kétnyelvű síszerviz oldal interaktív, Three.js-alapú 3D síléc-bemutatóval — görgetésre bomlik ki a léc szerkezete rétegenként.`,
      case3Spec3Label: `3D bemutató`,
      case3Spec3Val: `Scroll-vezérelt Three.js síléc-viewer`,
      case4Desc: `Síkölcsönző és -szerviz oldal két egykori versenyzőtől — bérlési és időpontfoglalási folyamat, galériával és kapcsolati formmal.`,
      case4Spec2Label: `Szolgáltatás`,
      case4Spec2Val: `Kölcsönzés + élezés, waxolás, kötésbeállítás`,
      case4Spec3Label: `Helyszín`,
      case4Spec3Val: `MOM Park felett, Budapest`,
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
      aboutP1: `I'm doing a double degree at BME: a Technical Management BSc (finance specialisation) alongside a Mechatronics Engineering BSc, plus an Erasmus exchange semester at TalTech in Estonia. I've worked at Siemens Energy, IBM, and Egis — across finance, quality, and maintenance engineering. I spent ten years racing competitively in judo, and now race alpine skiing internationally, including a junior world championship. I bring that same discipline and precision to websites: a controlled process, deadlines that hold.`,
      aboutSpec1Label: `Studies`,
      aboutSpec1Val: `BME — Technical Management & Mechatronics Engineering`,
      aboutSpec2Label: `Experience`,
      aboutSpec2Val: `Siemens Energy, IBM, Egis`,
      aboutSpec3Label: `Racing`,
      aboutSpec3Val: `Alpine skiing (jr. world championship), 10 years judo`,
      workH2: `Work`,
      caseDesc: `A bilingual club website with a custom contact-form backend, an optimised gallery, and automatic deployment.`,
      caseSpec1Label: `Languages`,
      caseSpec2Label: `Backend`,
      caseSpec3Label: `Gallery`,
      caseSpec3Val: `87% smaller image sizes`,
      caseLink: `View live site`,
      case2Desc: `A community sports club at the foot of the Mátra mountains, with six sections — a season-switching interactive hero and a sign-up form.`,
      case2Spec1Label: `Sections`,
      case2Spec1Val: `6 (skiing, hiking, multisport, water sports, tennis, basketball)`,
      case2Spec3Label: `Interactive`,
      case2Spec3Val: `Season-switching satellite and terrain visualisation`,
      case3Desc: `A bilingual ski-service website with an interactive Three.js 3D ski showcase — the ski's structure unfolds layer by layer as you scroll.`,
      case3Spec3Label: `3D showcase`,
      case3Spec3Val: `Scroll-driven Three.js ski viewer`,
      case4Desc: `A ski rental and service website from two former racers — a rental and booking flow, with a gallery and contact form.`,
      case4Spec2Label: `Service`,
      case4Spec2Val: `Rental + sharpening, waxing, binding adjustment`,
      case4Spec3Label: `Location`,
      case4Spec3Val: `Above MOM Park, Budapest`,
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
