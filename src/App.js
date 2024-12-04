import React, { useEffect } from 'react';
import * as THREE from 'three';
import './App.css';

const App = () => {
  useEffect(() => {
    // Set up the Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add a simple geometry (e.g., a cube)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Animation loop
    const animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Clean up on component unmount
    return () => {
      document.body.removeChild(renderer.domElement);
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
  );
}

export default App;