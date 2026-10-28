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
      aboutP1: `Elvégeztem a műszaki menedzser alapszakot (pénzügymenedzsment specializáció) a BME-n, most pedig mechatronikai mérnöki szakon tanulok tovább, cyber-fizikai rendszerek specializáción — közben egy féléves Erasmus cserét is elvégeztem az észt TalTechen. Dolgoztam már a Siemens Energynél, az IBM-nél és az Egis Gyógyszergyárban — pénzügyi, minőségügyi és üzemfenntartási területen. Tíz évig versenyszerűen judóztam, most alpesi síben versenyzek nemzetközi szinten, jártam junior világbajnokságon is. Ugyanezt a fegyelmet és pontosságot hozom a weboldalakba: kontrollált folyamat, tartott határidők.`,
      aboutSpec1Label: `Tanulmányok`,
      aboutSpec1Val: `BME — műszaki menedzser (elvégezve), mechatronikai mérnöki (folyamatban)`,
      aboutSpec2Label: `Tapasztalat`,
      aboutSpec2Val: `Siemens Energy, IBM, Egis`,
      aboutSpec3Label: `Verseny`,
      aboutSpec3Val: `Alpesi sí (jr. világbajnokság), 10 év judo`,
      workH2: `Munkáim`,
      workLead: `Öt élő projekt, pirossal és kékkel jelölve — ugyanúgy, ahogy a kapukat kirakják egy lesiklópályán.`,
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
      case5Desc: `Kétnyelvű virágüzlet-oldal egyedi csokor-igénylő űrlappal (alkalom, virágtípus, büdzsé), galériával és vásárlói értékelésekkel.`,
      case5Spec2Label: `Rendelés`,
      case5Spec2Val: `Egyedi csokor-igénylő űrlap`,
      case5Spec3Label: `Értékelés`,
      case5Spec3Val: `4,7/5 — 131 vélemény`,
      caseStudyLink: `Esettanulmány`,
      contactH2: `Beszéljünk a projektedről`,
      contactSub: `Írj pár sort arról, mire van szükséged — hamarosan válaszolok.`,
      contactCta: `Írj emailt`,

      csBack: `← Vissza a munkáimhoz`,
      csEyebrow: `Esettanulmány`,
      csTitle: `Snowline Alpesi Síklub`,
      csMeta: `Ügyfél: Snowline Alpesi Síklub · Szerep: teljes weboldal tervezés, fejlesztés és folyamatos karbantartás`,
      csChallengeH: `A kihívás`,
      csChallengeBody: `A klub korábbi oldala tömörítetlen galériaképeket és egy élő kapcsolatfelvételi csatorna nélküli kapcsolati oldalt vitt tovább. A cél egy új, kétnyelvű (HU/EN), gyors és karbantartható oldal volt, ami jól tükrözi a klub arculatát, és működő email-csatornát ad az érdeklődőknek.`,
      csSolutionH: `A megoldás`,
      cs1H: `Teljesítmény — galéria modernizáció`,
      cs1Body: `<ul><li>Képek WebP formátumra konvertálva: <strong>87%-kal kisebb</strong> fájlméret</li><li>Lazy loading bevezetve minden galériaképen</li><li>Pinterest-stílusú mozaik (masonry) elrendezés</li><li>Lightbox frissítve: előző/következő navigáció, billentyűzet- és swipe-támogatás, képszámláló</li></ul>`,
      cs2H: `Funkcionalitás — kapcsolatfelvétel`,
      cs2Body: `<ul><li>Szerver-oldali kapcsolati form (Vercel serverless function) + Resend email API</li><li>A domain DNS-szinten hitelesítve a Resend-nél, dedikált feladó címmel</li><li>Korábban nem létezett automatizált email-csatorna — mostantól minden beküldött űrlap közvetlenül a klub kapcsolattartójához fut be</li></ul>`,
      cs3H: `Élő naptár-integráció és automata értesítés`,
      cs3Body: `<ul><li>A naptár oldal élőben húzza be a klub Google Calendar-jából a közelgő edzéseket/versenyeket, automatikusan felismert kategóriacímkékkel; API-hiba esetén csendben visszaesik a statikus tartalomra</li><li>Kétlépcsős (double opt-in) hírlevél-feliratkozás, aláírt, időkorlátos linkekkel</li><li>Napi automata ellenőrzés (Vercel Cron): ha változik a naptár, automatikusan megy ki az értesítő a teljes listának</li></ul>`,
      csResultsH: `Eredmények számokban`,
      csResRow1Label: `Galéria képméret`,
      csResRow1Val: `−87%`,
      csResRow2Label: `Kapcsolatfelvételi csatorna`,
      csResRow2Val: `0 → automata, domain-hitelesített email`,
      csResRow3Label: `Naptárfrissítés → értesítés`,
      csResRow3Val: `manuális → napi automata ellenőrzés és kiküldés`,
      csResRow4Label: `Deploy folyamat`,
      csResRow4Val: `manuális → automata (push-on-main)`,
      csTechH: `Technológia`,
      csTechBody: `HTML / CSS / vanilla JS · egyedi <code>i18n.js</code> fordítási réteg · Vercel (hosting + serverless function + Cron + Edge Config) · Google Calendar API · Resend (tranzakciós email + Audience broadcast) · GitHub (verziókezelés, automata deploy)`,
      csCtaH: `Szeretnél hasonlót a saját oldaladnak?`,
      csCtaBtn: `Kérj ajánlatot`,
      csCtaLink: `Élő oldal megtekintése`
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
      aboutP1: `I completed a Technical Management BSc (finance specialisation) at BME, and I'm now continuing with a Mechatronics Engineering degree, specialising in cyber-physical systems — I also did an Erasmus exchange semester at TalTech in Estonia along the way. I've worked at Siemens Energy, IBM, and Egis — across finance, quality, and maintenance engineering. I spent ten years racing competitively in judo, and now race alpine skiing internationally, including a junior world championship. I bring that same discipline and precision to websites: a controlled process, deadlines that hold.`,
      aboutSpec1Label: `Studies`,
      aboutSpec1Val: `BME — Technical Management (completed), Mechatronics Engineering (in progress)`,
      aboutSpec2Label: `Experience`,
      aboutSpec2Val: `Siemens Energy, IBM, Egis`,
      aboutSpec3Label: `Racing`,
      aboutSpec3Val: `Alpine skiing (jr. world championship), 10 years judo`,
      workH2: `Work`,
      workLead: `Five live projects, marked red and blue — the same way gates are set on a downhill course.`,
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
      case5Desc: `A bilingual flower shop site with a custom bouquet request form (occasion, flower type, budget), a gallery, and customer reviews.`,
      case5Spec2Label: `Ordering`,
      case5Spec2Val: `Custom bouquet request form`,
      case5Spec3Label: `Rating`,
      case5Spec3Val: `4.7/5 — 131 reviews`,
      caseStudyLink: `Case study`,
      contactH2: `Let's talk about your project`,
      contactSub: `Send a few lines about what you need — I'll get back to you soon.`,
      contactCta: `Send an email`,

      csBack: `← Back to my work`,
      csEyebrow: `Case study`,
      csTitle: `Snowline Alpine Ski Club`,
      csMeta: `Client: Snowline Alpine Ski Club · Role: full website design, development and ongoing maintenance`,
      csChallengeH: `The challenge`,
      csChallengeBody: `The club's previous site carried over uncompressed gallery images and a contact page with no working way to actually get in touch. The goal was a new, bilingual (HU/EN), fast and maintainable site that reflects the club's identity well and gives visitors a working email channel.`,
      csSolutionH: `The solution`,
      cs1H: `Performance — gallery modernisation`,
      cs1Body: `<ul><li>Images converted to WebP: <strong>87% smaller</strong> file sizes</li><li>Lazy loading added across the gallery</li><li>Pinterest-style masonry layout</li><li>Lightbox upgraded: prev/next navigation, keyboard and swipe support, image counter</li></ul>`,
      cs2H: `Functionality — getting in touch`,
      cs2Body: `<ul><li>Server-side contact form (Vercel serverless function) + Resend email API</li><li>The domain verified at the DNS level with Resend, with a dedicated sending address</li><li>No automated email channel existed before — every submitted form now reaches the club's contact directly</li></ul>`,
      cs3H: `Live calendar integration and automatic notifications`,
      cs3Body: `<ul><li>The schedule page pulls upcoming trainings/races live from the club's Google Calendar, with automatically detected category tags; on an API error it silently falls back to static content</li><li>Double opt-in newsletter signup, with signed, time-limited links</li><li>Daily automated check (Vercel Cron): if the calendar changes, a notification goes out to the whole list automatically</li></ul>`,
      csResultsH: `Results in numbers`,
      csResRow1Label: `Gallery image size`,
      csResRow1Val: `−87%`,
      csResRow2Label: `Contact channel`,
      csResRow2Val: `0 → automatic, domain-verified email`,
      csResRow3Label: `Calendar update → notification`,
      csResRow3Val: `manual → daily automatic check and send`,
      csResRow4Label: `Deploy process`,
      csResRow4Val: `manual → automatic (push-on-main)`,
      csTechH: `Technology`,
      csTechBody: `HTML / CSS / vanilla JS · custom <code>i18n.js</code> translation layer · Vercel (hosting + serverless function + Cron + Edge Config) · Google Calendar API · Resend (transactional email + Audience broadcast) · GitHub (version control, automatic deploy)`,
      csCtaH: `Want something similar for your own site?`,
      csCtaBtn: `Get a quote`,
      csCtaLink: `View live site`
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
