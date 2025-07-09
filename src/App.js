import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const Cube = () => {
  const mesh = useRef();
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00ff00" />
    </mesh>
  );
};

const App = () => {
  useEffect(() => {
    gsap.utils.toArray('.section').forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }, []);

  return (
    <div className="scroll-container">
      <section className="section hero" style={{ backgroundColor: '#ff6347' }}>
        <h1>Eduardo Canelas</h1>
        <p>Scroll to explore</p>
        <div className="canvas-wrapper">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Cube />
            <OrbitControls />
          </Canvas>
        </div>
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
};
export default App;
