import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import './App.css';

const App = () => {
  const threeContainer = useRef(null);
  const scrollContainer = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x87ceeb, 10, 100);
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 8);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x87ceeb, 1);
    
    const container = threeContainer.current;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Create realistic airplane
    const createAirplane = () => {
      const airplane = new THREE.Group();
      
      // Fuselage
      const fuselageGeometry = new THREE.CylinderGeometry(0.3, 0.1, 4, 8);
      const fuselageMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
      const fuselage = new THREE.Mesh(fuselageGeometry, fuselageMaterial);
      fuselage.rotation.z = Math.PI / 2;
      fuselage.castShadow = true;
      airplane.add(fuselage);

      // Wings
      const wingGeometry = new THREE.BoxGeometry(3, 0.1, 0.8);
      const wingMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });
      const wings = new THREE.Mesh(wingGeometry, wingMaterial);
      wings.position.y = -0.1;
      wings.castShadow = true;
      airplane.add(wings);

      // Tail
      const tailGeometry = new THREE.BoxGeometry(0.3, 1.2, 0.1);
      const tailMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });
      const tail = new THREE.Mesh(tailGeometry, tailMaterial);
      tail.position.set(-1.8, 0.3, 0);
      tail.castShadow = true;
      airplane.add(tail);

      // Propeller
      const propGeometry = new THREE.BoxGeometry(0.1, 1.5, 0.05);
      const propMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
      const propeller = new THREE.Mesh(propGeometry, propMaterial);
      propeller.position.set(2, 0, 0);
      airplane.add(propeller);

      airplane.userData = { propeller };
      return airplane;
    };

    const airplane = createAirplane();
    airplane.position.set(-15, -3, 0);
    airplane.rotation.y = Math.PI / 6;
    scene.add(airplane);

    // Create clouds
    const createCloud = (x, y, z) => {
      const cloud = new THREE.Group();
      const cloudMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff, 
        transparent: true, 
        opacity: 0.8 
      });

      for (let i = 0; i < 5; i++) {
        const cloudPart = new THREE.Mesh(
          new THREE.SphereGeometry(Math.random() * 0.5 + 0.3, 8, 6),
          cloudMaterial
        );
        cloudPart.position.set(
          Math.random() * 2 - 1,
          Math.random() * 0.5,
          Math.random() * 2 - 1
        );
        cloud.add(cloudPart);
      }
      
      cloud.position.set(x, y, z);
      return cloud;
    };

    const clouds = [];
    for (let i = 0; i < 10; i++) {
      const cloud = createCloud(
        Math.random() * 50 - 25,
        Math.random() * 5 + 2,
        Math.random() * 20 - 10
      );
      clouds.push(cloud);
      scene.add(cloud);
    }

    // Create ground/landscape
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x4a5d23 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -10;
    ground.receiveShadow = true;
    scene.add(ground);

    // Create roller coaster track
    const createRollerCoasterTrack = () => {
      const points = [
        new THREE.Vector3(-8, 0, -5),
        new THREE.Vector3(-4, 4, -2),
        new THREE.Vector3(0, 2, 0),
        new THREE.Vector3(4, 6, 2),
        new THREE.Vector3(8, 1, 4),
        new THREE.Vector3(12, 8, 1),
        new THREE.Vector3(16, 3, -2),
        new THREE.Vector3(20, 5, -5)
      ];

      const curve = new THREE.CatmullRomCurve3(points);
      curve.closed = false;

      // Left rail
      const leftRailGeometry = new THREE.TubeGeometry(curve, 200, 0.05, 8, false);
      const railMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
      const leftRail = new THREE.Mesh(leftRailGeometry, railMaterial);
      leftRail.position.x = -0.2;
      
      // Right rail
      const rightRail = new THREE.Mesh(leftRailGeometry, railMaterial);
      rightRail.position.x = 0.2;

      // Support pillars
      const pillars = new THREE.Group();
      for (let i = 0; i < points.length - 1; i++) {
        const pillarGeometry = new THREE.CylinderGeometry(0.1, 0.15, points[i].y + 10, 8);
        const pillar = new THREE.Mesh(pillarGeometry, railMaterial);
        pillar.position.set(points[i].x, (points[i].y - 10) / 2, points[i].z);
        pillars.add(pillar);
      }

      const track = new THREE.Group();
      track.add(leftRail);
      track.add(rightRail);
      track.add(pillars);
      
      return { track, curve };
    };

    const { track: rollerCoasterTrack, curve: trackCurve } = createRollerCoasterTrack();
    scene.add(rollerCoasterTrack);

    // Create roller coaster cart
    const createCart = () => {
      const cart = new THREE.Group();
      
      const cartBody = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.4, 0.6),
        new THREE.MeshPhongMaterial({ color: 0xff4444 })
      );
      cartBody.castShadow = true;
      cart.add(cartBody);

      // Wheels
      const wheelGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.1, 8);
      const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
      
      const positions = [
        [-0.3, -0.25, 0.35],
        [0.3, -0.25, 0.35],
        [-0.3, -0.25, -0.35],
        [0.3, -0.25, -0.35]
      ];

      positions.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.position.set(...pos);
        wheel.rotation.z = Math.PI / 2;
        cart.add(wheel);
      });

      return cart;
    };

    const cart = createCart();
    scene.add(cart);

    // Animation state
    let animationState = {
      time: 0,
      airplaneProgress: 0,
      cartProgress: 0,
      isAirplaneFlying: true,
      isRollerCoasterActive: false
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      animationState.time += 0.016;

      // Animate clouds
      clouds.forEach((cloud, index) => {
        cloud.position.x -= 0.02 + index * 0.001;
        if (cloud.position.x < -30) {
          cloud.position.x = 30;
        }
      });

      // Propeller rotation
      if (airplane.userData.propeller) {
        airplane.userData.propeller.rotation.x += 0.3;
      }

      // Airplane flight path
      if (animationState.isAirplaneFlying && animationState.airplaneProgress < 1) {
        animationState.airplaneProgress += 0.003;
        
        // Create a curved flight path
        const t = animationState.airplaneProgress;
        const x = -15 + t * 35;
        const y = -3 + Math.sin(t * Math.PI) * 8 + t * 5;
        const z = Math.sin(t * Math.PI * 2) * 3;
        
        airplane.position.set(x, y, z);
        airplane.rotation.z = Math.sin(t * Math.PI * 4) * 0.2;
        airplane.rotation.y = Math.PI / 6 + Math.sin(t * Math.PI * 2) * 0.3;

        // When airplane reaches the end, start roller coaster
        if (animationState.airplaneProgress >= 0.7 && !animationState.isRollerCoasterActive) {
          animationState.isRollerCoasterActive = true;
        }
      }

      // Roller coaster animation
      if (animationState.isRollerCoasterActive) {
        animationState.cartProgress += 0.008;
        if (animationState.cartProgress > 1) {
          animationState.cartProgress = 0;
        }

        const position = trackCurve.getPoint(animationState.cartProgress);
        const tangent = trackCurve.getTangent(animationState.cartProgress);
        
        cart.position.copy(position);
        cart.lookAt(position.clone().add(tangent));
      }

      // Dynamic camera movement based on current section
      const targetCameraPos = {
        x: currentSection * 2 - 4,
        y: 2 + Math.sin(animationState.time * 0.5) * 0.5,
        z: 8 + Math.sin(animationState.time * 0.3) * 2
      };

      camera.position.lerp(new THREE.Vector3(targetCameraPos.x, targetCameraPos.y, targetCameraPos.z), 0.02);

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [currentSection]);

  // GSAP scroll animations
  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    
    // Animate each section
    sections.forEach((section, index) => {
      gsap.set(section, { 
        opacity: index === 0 ? 1 : 0,
        scale: index === 0 ? 1 : 0.8,
        rotationY: index === 0 ? 0 : 10
      });
    });
  }, [currentSection]);

  const handleSectionChange = useCallback((direction) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const newSection = Math.max(0, Math.min(3, currentSection + direction));
    
    if (newSection !== currentSection) {
      gsap.to(scrollContainer.current, {
        scrollLeft: newSection * window.innerWidth,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentSection(newSection);
          setIsTransitioning(false);
        }
      });
    } else {
      setIsTransitioning(false);
    }
  }, [currentSection, isTransitioning]);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        handleSectionChange(1);
      } else {
        handleSectionChange(-1);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleSectionChange(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handleSectionChange(-1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSectionChange]);

  return (
    <div className="App">
      <div className="three-container" ref={threeContainer}></div>
      
      {/* Navigation dots */}
      <div className="navigation-dots">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`dot ${currentSection === index ? 'active' : ''}`}
            onClick={() => !isTransitioning && handleSectionChange(index - currentSection)}
          />
        ))}
      </div>

      {/* Loading screen */}
      <div className={`loading-screen ${currentSection >= 0 ? 'hidden' : ''}`}>
        <div className="loading-content">
          <h1>Eduardo Canelas</h1>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
          <p>Preparing for takeoff...</p>
        </div>
      </div>

      <div className="scroll-container" ref={scrollContainer}>
        <section className="section hero-section">
          <div className="content-wrapper">
            <h1 className="hero-title">Eduardo Canelas</h1>
            <p className="hero-subtitle">Full Stack Developer & Creative Technologist</p>
            <p className="hero-description">
              Welcome aboard! Experience my portfolio through an interactive journey 
              from airplane flight to roller coaster adventure.
            </p>
            <div className="scroll-indicator">
              <span>Scroll or use arrow keys to explore</span>
              <div className="scroll-arrow">↓</div>
            </div>
          </div>
        </section>

        <section className="section about-section">
          <div className="content-wrapper">
            <h2>About Me</h2>
            <div className="about-content">
              <div className="about-text">
                <p>
                  I'm a passionate developer who loves creating immersive digital experiences. 
                  With expertise in modern web technologies, 3D graphics, and interactive design, 
                  I bring ideas to life through code.
                </p>
                <div className="skills-grid">
                  <div className="skill-item">React & Next.js</div>
                  <div className="skill-item">Three.js & WebGL</div>
                  <div className="skill-item">GSAP Animations</div>
                  <div className="skill-item">Node.js & Express</div>
                  <div className="skill-item">Python & Django</div>
                  <div className="skill-item">Cloud Technologies</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section projects-section">
          <div className="content-wrapper">
            <h2>Featured Projects</h2>
            <div className="projects-grid">
              <div className="project-card">
                <h3>Interactive 3D Portfolio</h3>
                <p>A immersive portfolio experience using Three.js, React, and GSAP animations.</p>
                <div className="project-tags">
                  <span>React</span>
                  <span>Three.js</span>
                  <span>GSAP</span>
                </div>
              </div>
              <div className="project-card">
                <h3>E-Commerce Platform</h3>
                <p>Full-stack e-commerce solution with modern UI and secure payment integration.</p>
                <div className="project-tags">
                  <span>Next.js</span>
                  <span>Node.js</span>
                  <span>MongoDB</span>
                </div>
              </div>
              <div className="project-card">
                <h3>Real-time Chat App</h3>
                <p>WebSocket-based chat application with modern design and emoji support.</p>
                <div className="project-tags">
                  <span>React</span>
                  <span>Socket.io</span>
                  <span>Express</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section contact-section">
          <div className="content-wrapper">
            <h2>Let's Connect</h2>
            <div className="contact-content">
              <p>Ready to start your next project? Let's discuss how we can work together!</p>
              <div className="contact-methods">
                <div className="contact-item">
                  <h3>Email</h3>
                  <p>eduardo.canelas@example.com</p>
                </div>
                <div className="contact-item">
                  <h3>LinkedIn</h3>
                  <p>linkedin.com/in/eduardo-canelas</p>
                </div>
                <div className="contact-item">
                  <h3>GitHub</h3>
                  <p>github.com/eduardo-canelas</p>
                </div>
              </div>
              <div className="cta-button">
                <button className="contact-btn">Get In Touch</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;