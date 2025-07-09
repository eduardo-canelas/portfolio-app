import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './App.css';

const App = () => {
  const threeContainer = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    threeContainer.current.appendChild(renderer.domElement);

    // Plane taking off
    const planeGeometry = new THREE.BoxGeometry(1, 0.5, 1.5);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffe135 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(-5, -2, 0);
    scene.add(plane);

    // Simple representation of Orlando
    const orlando = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshNormalMaterial()
    );
    orlando.position.set(5, 2, -2);
    scene.add(orlando);

    // Roller coaster track
    const trackCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2, 1, -2),
      new THREE.Vector3(0, 3, 0),
      new THREE.Vector3(2, 1, 2),
      new THREE.Vector3(4, 2, 0),
    ]);
    const trackGeometry = new THREE.TubeGeometry(trackCurve, 40, 0.05, 8, false);
    const track = new THREE.Mesh(
      trackGeometry,
      new THREE.MeshBasicMaterial({ color: 0x00aaff })
    );
    scene.add(track);

    const cart = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    scene.add(cart);

    let planeProgress = 0;
    const start = new THREE.Vector3(-5, -2, 0);
    const end = new THREE.Vector3(5, 2, 0);

    const animate = () => {
      requestAnimationFrame(animate);
      if (planeProgress < 1) {
        planeProgress += 0.005;
        plane.position.lerpVectors(start, end, planeProgress);
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleMouseMove = (e) => {
      const t = e.clientX / window.innerWidth;
      const pos = trackCurve.getPoint(t);
      cart.position.copy(pos);
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      threeContainer.current.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const scrollContainer = document.querySelector('.scroll-container');

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        scrollContainer.scrollBy({
          left: e.deltaY > 0 ? window.innerWidth : -window.innerWidth,
          behavior: 'smooth',
        });
        e.preventDefault();
      }
    };

    scrollContainer.addEventListener('wheel', handleWheel);

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="App">
      <div className="three-container" ref={threeContainer}></div>
      <div className="scroll-container">
        <section className="section" style={{ backgroundColor: '#ff6347' }}>
          <h1>Eduardo Canelas</h1>
          <p>Scroll to explore</p>
        </section>
        <section className="section" style={{ backgroundColor: '#4682b4' }}>
          <h2>About Me</h2>
          <p>Ya wilker Digamos</p>
        </section>
        <section className="section" style={{ backgroundColor: '#32cd32' }}>
          <h2>Projects</h2>
          <p>L Digamos.</p>
          <p>G Digamos</p>
          <p>W Digamos</p>
        </section>
        <section className="section" style={{ backgroundColor: '#ff1493' }}>
          <h2>Contact</h2>
          <p>Feel free to reach out!</p>
        </section>
      </div>
    </div>
  );
};

export default App;