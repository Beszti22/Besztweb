(function(){
  var canvas = document.getElementById('hero3d');
  if(!canvas || typeof THREE === 'undefined') return;

  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var renderer;
  try{
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  }catch(e){ return; }

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0.4, 9.5);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  var keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
  keyLight.position.set(4, 5, 6);
  scene.add(keyLight);
  var rimLight = new THREE.DirectionalLight(0x3e7bff, 0.5);
  rimLight.position.set(-5, -2, -4);
  scene.add(rimLight);

  // group holds everything so we can rotate/tilt it as one unit
  var group = new THREE.Group();
  scene.add(group);

  // an S-shaped carve path, echoing the site's "carve line" motif
  var curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-3.2, 3.0, 0.2),
    new THREE.Vector3(-1.4, 1.4, 1.1),
    new THREE.Vector3(0.4, 0.1, -0.9),
    new THREE.Vector3(-0.4, -1.5, 0.7),
    new THREE.Vector3(1.6, -2.5, -0.6),
    new THREE.Vector3(3.3, -3.3, 0.3)
  ]);

  var tubularSegments = 140;
  var radialSegments = 14;
  var tubeGeo = new THREE.TubeGeometry(curve, tubularSegments, 0.17, radialSegments, false);

  var colorRed = new THREE.Color(0xE8384F);
  var colorBlue = new THREE.Color(0x3E7BFF);
  var colors = [];
  for(var i=0;i<=tubularSegments;i++){
    var t = i/tubularSegments;
    var c = colorRed.clone().lerp(colorBlue, t);
    for(var j=0;j<=radialSegments;j++){ colors.push(c.r, c.g, c.b); }
  }
  tubeGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  var tubeMat = new THREE.MeshStandardMaterial({ vertexColors: true, metalness: 0.4, roughness: 0.32 });
  var tube = new THREE.Mesh(tubeGeo, tubeMat);
  group.add(tube);

  // two small "gate" markers at the start/end of the carve, nodding to slalom gates
  var gateStart = new THREE.Mesh(
    new THREE.SphereGeometry(0.32, 24, 24),
    new THREE.MeshStandardMaterial({ color: 0xE8384F, metalness: 0.3, roughness: 0.4 })
  );
  gateStart.position.copy(curve.getPointAt(0));
  group.add(gateStart);

  var gateEnd = new THREE.Mesh(
    new THREE.SphereGeometry(0.32, 24, 24),
    new THREE.MeshStandardMaterial({ color: 0x3E7BFF, metalness: 0.3, roughness: 0.4 })
  );
  gateEnd.position.copy(curve.getPointAt(1));
  group.add(gateEnd);

  group.rotation.x = 0.15;
  group.rotation.y = -0.3;

  function resize(){
    var w = canvas.clientWidth || 1;
    var h = canvas.clientHeight || 1;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  var ro = window.ResizeObserver ? new ResizeObserver(resize) : null;
  if(ro) ro.observe(canvas);
  window.addEventListener('resize', resize);
  resize();

  var mouseX = 0, mouseY = 0;
  window.addEventListener('pointermove', function(e){
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  var baseRotY = group.rotation.y;

  if(prefersReduced){
    renderer.render(scene, camera);
  } else {
    var clock = new THREE.Clock();
    (function animate(){
      requestAnimationFrame(animate);
      var t = clock.getElapsedTime();
      group.rotation.y = baseRotY + t * 0.18 + mouseX * 0.25;
      group.rotation.x = 0.15 + mouseY * 0.15;
      renderer.render(scene, camera);
    })();
  }
})();
