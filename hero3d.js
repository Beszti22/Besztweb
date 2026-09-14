(function(){
  var canvas = document.getElementById('hero3d');
  if(!canvas || typeof THREE === 'undefined') return;

  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var renderer;
  try{
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  }catch(e){ return; }

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0.2, 10);

  scene.add(new THREE.AmbientLight(0xffffff, 0.65));
  var keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
  keyLight.position.set(4, 5, 6);
  scene.add(keyLight);
  var rimLight = new THREE.DirectionalLight(0x3e7bff, 0.6);
  rimLight.position.set(-5, -3, -4);
  scene.add(rimLight);

  var group = new THREE.Group();
  scene.add(group);

  // --- the Besztweb logo, extruded into two flat 3D "gate" plates ---
  // point data taken directly from the brand-mark SVG paths (viewBox 0 0 48 48),
  // centered on the origin and scaled down so the flags read as engineered plates
  function toShape(points){
    var shape = new THREE.Shape();
    points.forEach(function(p, i){
      var x = (p[0] - 24) / 7.5;
      var y = -(p[1] - 24) / 7.5;
      if(i === 0){ shape.moveTo(x, y); } else { shape.lineTo(x, y); }
    });
    return shape;
  }

  var redPoints  = [[6,38],[18,10],[24,10],[14,34],[22,34],[34,10],[40,10],[28,38],[22,38],[30,16],[24,16],[14,38],[6,38]];
  var bluePoints = [[14,38],[26,10],[32,10],[20,38],[14,38]];

  var extrudeSettings = { depth: 0.5, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.04, bevelSegments: 2 };

  var redGeo = new THREE.ExtrudeGeometry(toShape(redPoints), extrudeSettings);
  var redMat = new THREE.MeshStandardMaterial({ color: 0xE8384F, metalness: 0.35, roughness: 0.4 });
  var redFlag = new THREE.Mesh(redGeo, redMat);
  redFlag.position.z = -0.25;
  group.add(redFlag);

  var blueGeo = new THREE.ExtrudeGeometry(toShape(bluePoints), extrudeSettings);
  var blueMat = new THREE.MeshStandardMaterial({ color: 0x3E7BFF, metalness: 0.35, roughness: 0.4 });
  var blueFlag = new THREE.Mesh(blueGeo, blueMat);
  blueFlag.position.z = 0.3;
  group.add(blueFlag);

  // --- mechatronic gimbal: a precision shaft + two independently spinning rings,
  //     nodding to servo / gyroscope stabilisation hardware ---
  var metal = new THREE.MeshStandardMaterial({ color: 0xC7CCD6, metalness: 0.8, roughness: 0.25 });

  var shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 6.4, 20), metal);
  shaft.rotation.z = Math.PI / 2;
  group.add(shaft);

  var ringOuter = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.045, 16, 96), metal);
  ringOuter.rotation.x = 1.05;
  ringOuter.rotation.y = 0.35;
  group.add(ringOuter);

  var ringInner = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.04, 16, 96), metal);
  ringInner.rotation.x = -0.65;
  ringInner.rotation.y = 1.15;
  group.add(ringInner);

  // small hub spheres where the shaft meets the flags — reads as a joint/bearing
  var hubMat = new THREE.MeshStandardMaterial({ color: 0xF2F0EA, metalness: 0.5, roughness: 0.3 });
  [-3.1, 3.1].forEach(function(x){
    var hub = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 20), hubMat);
    hub.position.x = x;
    group.add(hub);
  });

  group.rotation.x = 0.2;
  group.rotation.y = -0.35;

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
  var baseRotX = group.rotation.x;

  if(prefersReduced){
    renderer.render(scene, camera);
  } else {
    var clock = new THREE.Clock();
    (function animate(){
      requestAnimationFrame(animate);
      var t = clock.getElapsedTime();
      group.rotation.y = baseRotY + t * 0.15 + mouseX * 0.25;
      group.rotation.x = baseRotX + mouseY * 0.15;
      ringOuter.rotation.z = t * 0.6;
      ringInner.rotation.z = -t * 0.9;
      renderer.render(scene, camera);
    })();
  }
})();
