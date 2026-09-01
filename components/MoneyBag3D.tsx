import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * PiggyBank3D
 * A premium, studio-lit 3D Bitcoin piggy bank.
 * Drag to rotate. Auto-rotates gently when idle.
 */
export default function PiggyBank3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ---------- Core setup ----------
    const scene = new THREE.Scene();
    // Transparent background — only the model + its ground shadow render.
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      32,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.55, 8.2);
    camera.lookAt(0, 0.55, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);

    // ---------- Lighting (soft studio) ----------
    const hemi = new THREE.HemisphereLight(0xffffff, 0xffe3da, 0.55);
    scene.add(hemi);

    const key = new THREE.DirectionalLight(0xfff3ea, 1.55);
    key.position.set(4.2, 6.5, 4.5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -4;
    key.shadow.camera.right = 4;
    key.shadow.camera.top = 4;
    key.shadow.camera.bottom = -4;
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 20;
    key.shadow.bias = -0.0005;
    key.shadow.radius = 6;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xdfeeff, 0.45);
    fill.position.set(-5, 3, 2.5);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffffff, 0.9);
    rim.position.set(-2, 4, -5);
    scene.add(rim);

    const goldBounce = new THREE.PointLight(0xffcf8f, 0.6, 6);
    goldBounce.position.set(0.4, 2.3, 1.2);
    scene.add(goldBounce);

    // ---------- Ground + soft contact shadow ----------
    const groundGeo = new THREE.PlaneGeometry(40, 40);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.22 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.42;
    ground.receiveShadow = true;
    scene.add(ground);

    // radial soft blob shadow (extra premium contact shadow, like product photography)
    function makeRadialTexture() {
      const size = 256;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      const grad = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      );
      grad.addColorStop(0, "rgba(0,0,0,0.32)");
      grad.addColorStop(0.6, "rgba(0,0,0,0.14)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(canvas);
    }
    const blobTex = makeRadialTexture();
    const blobMat = new THREE.MeshBasicMaterial({
      map: blobTex,
      transparent: true,
      depthWrite: false,
    });
    const blob = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 3.6), blobMat);
    blob.rotation.x = -Math.PI / 2;
    blob.position.y = -1.415;
    scene.add(blob);

    // ---------- Materials ----------
    const pigMat = new THREE.MeshPhysicalMaterial({
      color: 0xffc7cf,
      roughness: 0.28,
      metalness: 0.0,
      clearcoat: 0.55,
      clearcoatRoughness: 0.25,
      sheen: 0.4,
      sheenColor: new THREE.Color(0xffe6ea),
      reflectivity: 0.35,
    });
    const pigMatDark = new THREE.MeshPhysicalMaterial({
      color: 0xffb4bf,
      roughness: 0.32,
      metalness: 0.0,
      clearcoat: 0.5,
      clearcoatRoughness: 0.3,
    });
    const eyeMat = new THREE.MeshPhysicalMaterial({
      color: 0x1c1c22,
      roughness: 0.15,
      clearcoat: 0.8,
    });
    const eyeHighlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const nostrilMat = new THREE.MeshPhysicalMaterial({
      color: 0xd88b96,
      roughness: 0.5,
    });
    const slotMat = new THREE.MeshStandardMaterial({
      color: 0x2b2b2b,
      roughness: 0.6,
    });

    // ---------- Piggy group ----------
    const pig = new THREE.Group();
    scene.add(pig);

    // Body (slightly egg-shaped sphere)
    const bodyGeo = new THREE.SphereGeometry(1, 64, 48);
    bodyGeo.scale(1.18, 1.02, 1.32);
    const body = new THREE.Mesh(bodyGeo, pigMat);
    body.position.set(0, 0, 0);
    body.castShadow = true;
    body.receiveShadow = true;
    pig.add(body);

    // Head blend (slightly smaller sphere merged into front)
    const headGeo = new THREE.SphereGeometry(0.86, 48, 40);
    headGeo.scale(1.02, 1.0, 1.0);
    const head = new THREE.Mesh(headGeo, pigMat);
    head.position.set(0, 0.03, 1.02);
    head.castShadow = true;
    head.receiveShadow = true;
    pig.add(head);

    // Snout
    const snoutGeo = new THREE.CylinderGeometry(0.34, 0.36, 0.28, 32);
    const snout = new THREE.Mesh(snoutGeo, pigMatDark);
    snout.rotation.x = Math.PI / 2;
    snout.position.set(0, -0.12, 1.78);
    snout.castShadow = true;
    pig.add(snout);

    // Nostrils
    [-0.11, 0.11].forEach((x) => {
      const nostrilGeo = new THREE.SphereGeometry(0.045, 16, 16);
      const nostril = new THREE.Mesh(nostrilGeo, nostrilMat);
      nostril.scale.set(0.7, 1, 0.5);
      nostril.position.set(x, -0.12, 1.92);
      pig.add(nostril);
    });

    // Ears
    function makeEar(xSign: number) {
      const earShape = new THREE.SphereGeometry(0.42, 24, 24);
      earShape.scale(0.75, 1, 0.35);
      const ear = new THREE.Mesh(earShape, pigMat);
      ear.position.set(xSign * 0.52, 0.92, 1.28);
      ear.rotation.set(-0.35, xSign * 0.5, xSign * 0.35);
      ear.castShadow = true;
      return ear;
    }
    pig.add(makeEar(-1));
    pig.add(makeEar(1));

    // Coin slot on top of head
    const slotGeo = new THREE.BoxGeometry(0.34, 0.045, 0.09);
    const slot = new THREE.Mesh(slotGeo, slotMat);
    slot.position.set(0, 0.92, 0.98);
    slot.rotation.y = 0.02;
    slot.rotation.x = -0.12;
    pig.add(slot);

    // Eyes — positioned exactly on the head's ellipsoid surface (with a hair of
    // proud offset) so they read clearly instead of hiding inside the mesh.
    function makeEye(xSign: number) {
      const g = new THREE.Group();

      // small recessed socket ring so the eye reads as set-into the face
      const socket = new THREE.Mesh(
        new THREE.SphereGeometry(0.135, 20, 20),
        pigMatDark
      );
      socket.scale.set(0.9, 0.9, 0.55);
      g.add(socket);

      const eyeGeo = new THREE.SphereGeometry(0.105, 24, 24);
      const eye = new THREE.Mesh(eyeGeo, eyeMat);
      eye.scale.set(0.9, 1, 0.7);
      eye.position.z = 0.05;
      g.add(eye);

      const hi = new THREE.Mesh(new THREE.SphereGeometry(0.03, 12, 12), eyeHighlightMat);
      hi.position.set(0.04, 0.045, 0.11);
      g.add(hi);

      // point sitting just outside the head ellipsoid (center 0,0.03,1.02 / radii 0.877,0.86,0.86)
      g.position.set(xSign * 0.45, 0.33, 1.75);
      g.rotation.y = xSign * 0.5;
      return g;
    }
    pig.add(makeEye(-1));
    pig.add(makeEye(1));

    // Legs — the top of each leg (including a wide "shoulder" cap) is driven
    // deep enough into the body ellipsoid that it is naturally swallowed by
    // the body surface, so there is no visible seam or gap at the join.
    function makeLeg(x: number, z: number) {
      const g = new THREE.Group();

      const upperGeo = new THREE.CylinderGeometry(0.235, 0.205, 0.68, 24);
      const upper = new THREE.Mesh(upperGeo, pigMat);
      upper.castShadow = true;
      g.add(upper);

      // foot pad
      const capBottom = new THREE.Mesh(new THREE.SphereGeometry(0.205, 20, 16), pigMat);
      capBottom.position.y = -0.34;
      capBottom.scale.set(1, 0.32, 1);
      g.add(capBottom);

      // wide shoulder blend — sinks into the torso so the leg reads as
      // grown out of the body rather than glued underneath it
      const capTop = new THREE.Mesh(new THREE.SphereGeometry(0.3, 20, 16), pigMat);
      capTop.position.y = 0.3;
      capTop.scale.set(1, 0.75, 1);
      g.add(capTop);

      g.position.set(x, -0.9, z);
      return g;
    }
    pig.add(makeLeg(-0.56, 0.78));
    pig.add(makeLeg(0.56, 0.78));
    pig.add(makeLeg(-0.56, -0.78));
    pig.add(makeLeg(0.56, -0.78));

    // Tail (curly)
    const tailCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.12, 0.14, -0.05),
      new THREE.Vector3(0.02, 0.24, -0.16),
      new THREE.Vector3(-0.1, 0.16, -0.1),
      new THREE.Vector3(-0.02, 0.06, 0.02),
    ]);
    const tailGeo = new THREE.TubeGeometry(tailCurve, 32, 0.045, 12, false);
    const tail = new THREE.Mesh(tailGeo, pigMatDark);
    tail.position.set(0, 0.35, -1.32);
    tail.castShadow = true;
    pig.add(tail);

    pig.position.y = -0.05;

    // ---------- Bitcoin coin ----------
    // Built as a plain metal rim + two raised, textured medallion faces so
    // the ₿ glyph reads as embossed relief rather than a flat sticker.
    function makeCoinTexture() {
      const size = 1024;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      const c = size / 2;

      // base metal gradient — warm gold with a hot highlight, cooler edge
      const grad = ctx.createRadialGradient(
        c - size * 0.12,
        c - size * 0.14,
        size * 0.05,
        c,
        c,
        size * 0.5
      );
      grad.addColorStop(0, "#fff3cf");
      grad.addColorStop(0.32, "#ffdf8f");
      grad.addColorStop(0.62, "#f0b93f");
      grad.addColorStop(0.85, "#d1932a");
      grad.addColorStop(1, "#b5761e");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(c, c, c - 6, 0, Math.PI * 2);
      ctx.fill();

      // outer bevel rings (reads as a milled coin edge lip)
      ctx.strokeStyle = "#9c6a1a";
      ctx.lineWidth = size * 0.014;
      ctx.beginPath();
      ctx.arc(c, c, c - size * 0.02, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,0.55)";
      ctx.lineWidth = size * 0.006;
      ctx.beginPath();
      ctx.arc(c, c, c - size * 0.035, 0, Math.PI * 2);
      ctx.stroke();

      // inner recessed ring that frames the glyph
      ctx.strokeStyle = "#9c6a1a";
      ctx.lineWidth = size * 0.008;
      ctx.beginPath();
      ctx.arc(c, c, c * 0.82, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.lineWidth = size * 0.003;
      ctx.beginPath();
      ctx.arc(c, c, c * 0.82 - size * 0.006, 0, Math.PI * 2);
      ctx.stroke();

      // dotted mint mark border, classic coin detailing
      const dotCount = 72;
      const dotRadius = c * 0.92;
      for (let i = 0; i < dotCount; i++) {
        const a = (i / dotCount) * Math.PI * 2;
        const dx = c + Math.cos(a) * dotRadius;
        const dy = c + Math.sin(a) * dotRadius;
        ctx.beginPath();
        ctx.arc(dx, dy, size * 0.0045, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(120, 78, 18, 0.55)";
        ctx.fill();
      }

      // ₿ glyph — bold B with a shadow pass (depth) + bright pass (relief highlight)
      ctx.save();
      ctx.translate(c, c);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "800 520px Georgia, 'Times New Roman', serif";

      ctx.fillStyle = "rgba(120, 78, 18, 0.55)";
      ctx.fillText("B", size * 0.006, size * 0.012);

      ctx.fillStyle = "#8a5a14";
      ctx.fillText("B", 0, 0);

      ctx.fillStyle = "rgba(255, 240, 205, 0.55)";
      ctx.fillText("B", -size * 0.004, -size * 0.008);

      // the two vertical accent ticks that make a B read as the bitcoin symbol
      ctx.strokeStyle = "#8a5a14";
      ctx.lineWidth = size * 0.028;
      ctx.lineCap = "round";
      const tickX1 = -size * 0.02;
      const tickX2 = size * 0.065;
      const tickTop = -size * 0.335;
      const tickBottom = size * 0.335;
      ctx.beginPath();
      ctx.moveTo(tickX1, tickTop - size * 0.05);
      ctx.lineTo(tickX1, tickTop + size * 0.05);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(tickX2, tickTop - size * 0.05);
      ctx.lineTo(tickX2, tickTop + size * 0.05);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(tickX1, tickBottom - size * 0.05);
      ctx.lineTo(tickX1, tickBottom + size * 0.05);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(tickX2, tickBottom - size * 0.05);
      ctx.lineTo(tickX2, tickBottom + size * 0.05);
      ctx.stroke();
      ctx.restore();

      return new THREE.CanvasTexture(canvas);
    }
    const coinTex = makeCoinTexture();
    coinTex.colorSpace = THREE.SRGBColorSpace;
    coinTex.anisotropy = 8;

    const coinMat = new THREE.MeshPhysicalMaterial({
      color: 0xe9ac3a,
      metalness: 0.92,
      roughness: 0.24,
      clearcoat: 0.75,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9,
    });
    const coinFaceMat = new THREE.MeshPhysicalMaterial({
      map: coinTex,
      metalness: 0.8,
      roughness: 0.26,
      clearcoat: 0.65,
      clearcoatRoughness: 0.18,
    });

    const coinGroup = new THREE.Group();

    // outer metal rim (plain gold, gives the coin real thickness/structure)
    const coinRimGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.11, 64);
    const coinRimMesh = new THREE.Mesh(coinRimGeo, coinMat);
    coinRimMesh.castShadow = true;
    coinGroup.add(coinRimMesh);

    // raised medallion faces (front + back) carrying the embossed glyph
    const medallionGeo = new THREE.CylinderGeometry(0.385, 0.385, 0.022, 64);
    const medallionTop = new THREE.Mesh(medallionGeo, coinFaceMat);
    medallionTop.position.y = 0.066;
    medallionTop.castShadow = true;
    coinGroup.add(medallionTop);

    const medallionBottom = new THREE.Mesh(medallionGeo, coinFaceMat);
    medallionBottom.position.y = -0.066;
    medallionBottom.rotation.x = Math.PI;
    medallionBottom.castShadow = true;
    coinGroup.add(medallionBottom);

    coinGroup.position.set(0.05, 2.05, 1.15);
    coinGroup.rotation.set(0.08, 0.3, Math.PI / 2 - 0.18);
    scene.add(coinGroup);

    // ---------- Interaction: drag to rotate ----------
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotY = 0.35;
    let targetRotX = 0.05;
    let currentRotY = targetRotY;
    let currentRotX = targetRotX;
    let idleTime = 0;
    let userInteracted = false;

    pig.rotation.y = currentRotY;
    pig.rotation.x = currentRotX;

    const dom = renderer.domElement;
    dom.style.cursor = "grab";
    dom.style.touchAction = "none";

    function onPointerDown(e: PointerEvent) {
      isDragging = true;
      userInteracted = true;
      prevX = e.clientX;
      prevY = e.clientY;
      dom.style.cursor = "grabbing";
      dom.setPointerCapture(e.pointerId);
    }
    function onPointerMove(e: PointerEvent) {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;
      targetRotY += dx * 0.008;
      targetRotX += dy * 0.006;
      targetRotX = Math.max(-0.5, Math.min(0.5, targetRotX));
    }
    function onPointerUp(e: PointerEvent) {
      isDragging = false;
      dom.style.cursor = "grab";
      try {
        dom.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }

    dom.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // ---------- Resize handling ----------
    function handleResize() {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);

    // ---------- Animation loop ----------
    let raf = 0;
    const clock = new THREE.Clock();

    function animate() {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!isDragging && !userInteracted) {
        targetRotY += 0.0028;
      }

      currentRotY += (targetRotY - currentRotY) * 0.08;
      currentRotX += (targetRotX - currentRotX) * 0.08;
      pig.rotation.y = currentRotY;
      pig.rotation.x = currentRotX;

      // gentle float for whole pig
      pig.position.y = -0.05 + Math.sin(t * 1.1) * 0.02;

      // coin float + spin
      coinGroup.position.y = 2.05 + Math.sin(t * 1.6) * 0.07;
      coinGroup.rotation.z = Math.PI / 2 - 0.18 + Math.sin(t * 0.8) * 0.05;
      coinGroup.rotation.y = 0.3 + t * 0.6;

      goldBounce.position.x = Math.sin(t * 0.5) * 0.6;

      renderer.render(scene, camera);
    }
    animate();
    setLoading(false);

    // ---------- Cleanup ----------
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      dom.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      renderer.dispose();
      pigMat.dispose();
      pigMatDark.dispose();
      eyeMat.dispose();
      coinMat.dispose();
      coinFaceMat.dispose();
      coinTex.dispose();
      blobTex.dispose();
      if (mount && renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "560px",
      }}
    />
  );
}