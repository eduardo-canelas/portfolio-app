import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  DownloadSimple,
  GithubLogo,
  LinkedinLogo,
  Moon,
  PaperPlaneTilt,
  Rows,
  Sun,
  X,
} from '@phosphor-icons/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './App.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const profile = {
  name: 'Eduardo Canelas Eterovic',
  shortName: 'Eduardo Canelas',
  role: 'Junior Software Engineer',
  location: 'Orlando, FL',
  email: 'edu.canelas.e@gmail.com',
  phone: '(689) 220-9515',
  linkedin: 'https://www.linkedin.com/in/eduardo-canelas-eterovic/',
  github: 'https://github.com/eduardo-canelas',
  cv: `${process.env.PUBLIC_URL}/assets/eduardo-canelas-cv.pdf`,
  photo: `${process.env.PUBLIC_URL}/assets/eduardo-profile.jpg`,
};

const navItems = [
  ['About', '#about'],
  ['Builds', '#projects'],
  ['Experience', '#experience'],
  ['Stack', '#stack'],
];

const buildProcess = [
  {
    label: 'Spot',
    title: 'I find what is actually broken',
    text: 'I look for the step people repeat out of habit, the tool they work around, or the part of a workflow nobody has fixed because it has always been that way.',
  },
  {
    label: 'Map',
    title: 'I plan before I touch the code',
    text: 'I sketch the data model, pick the right tools, and map the path until the direction is clear. Good decisions here make the build fast and the logic obvious.',
  },
  {
    label: 'Build',
    title: 'I own it from first commit to ship',
    text: 'Full cycle architecture, implementation, testing, and deployment. I keep iterating until the product does exactly what it was built for, cleanly and reliably.',
  },
];

const featuredProjects = [
  {
    name: 'RoutePulse',
    repo: 'Group-Project',
    type: 'Full-stack logistics platform',
    rank: 'Flagship build',
    date: 'Updated Apr 2026',
    language: 'JavaScript',
    href: 'https://github.com/eduardo-canelas/Group-Project',
    live: 'https://route-pulse.vercel.app',
    summary:
      'MERN package-tracking app for admins and drivers with role-based dashboards, package CRUD, driver assignment, and handling-event history.',
    proof:
      'Built around a real operational need: helping teams see responsibility, movement, and package history without digging through messy handoffs.',
    stack: ['React', 'Vite', 'Node', 'Express', 'MongoDB', 'Mongoose'],
    metrics: ['5 data entities', '2 user roles', 'chain of custody'],
  },
  {
    name: 'CLOZI',
    repo: 'CLOZI',
    type: 'Mobile wardrobe product',
    rank: 'Product ownership',
    date: 'Updated Apr 2026',
    language: 'TypeScript',
    href: 'https://github.com/eduardo-canelas/CLOZI',
    live: null,
    summary:
      'React Native and Supabase mobile product with secure data modeling, outfit workflows, release gates, and startup-level product direction.',
    proof:
      'A personal product bet on building software that can make daily decisions feel lighter, more useful, and more human.',
    stack: ['React Native', 'TypeScript', 'Supabase', 'Postgres'],
    metrics: ['48 tables', '166 RLS policies', 'CI gates'],
  },
  {
    name: 'Risker Agent Backend',
    repo: 'RiskerAgentBackend',
    type: 'AI carrier-matching API',
    rank: 'AI workflow',
    date: 'Updated Apr 2026',
    language: 'Python',
    href: 'https://github.com/eduardo-canelas/RiskerAgentBackend',
    live: null,
    summary:
      'Backend infrastructure for AI carrier matching across insurance carriers, with pre-qualification logic that reduces manual research.',
    proof:
      'Connects AI automation with a practical business workflow so people can move faster without losing the logic behind the decision.',
    stack: ['Python', 'AI Agents', 'FastAPI', 'Workflow logic'],
    metrics: ['45 carriers', '25% workflow lift', 'pre-qualification'],
  },
  {
    name: 'Multi-Threaded Routing',
    repo: 'Multi-Threaded-Routing',
    type: 'Concurrent routing simulation',
    rank: 'Systems thinking',
    date: 'Updated Jun 2025',
    language: 'Java',
    href: 'https://github.com/eduardo-canelas/Multi-Threaded-Routing',
    live: null,
    summary:
      'Java package-routing simulation with synchronized conveyor access, shared resource contention, and deadlock avoidance.',
    proof:
      'A systems project that made abstract concurrency ideas concrete through routing, shared resources, and real timing constraints.',
    stack: ['Java', 'Threads', 'Synchronization', 'Routing'],
    metrics: ['shared conveyors', 'deadlock avoidance', 'simulation'],
  },
  {
    name: 'Nile Dot Com',
    repo: 'E-Store-Application',
    type: 'Java Swing e-commerce simulation',
    rank: 'Java depth',
    date: 'Updated Oct 2025',
    language: 'Java',
    href: 'https://github.com/eduardo-canelas/E-Store-Application',
    live: null,
    summary:
      'Desktop e-store with product search, cart logic, inventory checks, tax, discounts, invoices, and transaction history.',
    proof:
      'A desktop app focused on clear business rules, validation, and everyday transaction flow outside the usual web-app lane.',
    stack: ['Java', 'Swing', 'CSV persistence', 'OOP'],
    metrics: ['45+ items', 'file I/O', 'transaction logs'],
  },
  {
    name: 'Habitz',
    repo: 'habitz',
    type: 'Habit scheduling interface',
    rank: 'UX system',
    date: 'Updated Dec 2024',
    language: 'CSS',
    href: 'https://github.com/eduardo-canelas/habitz',
    live: null,
    summary:
      'Consumer habit-planning interface where users create routines and schedule them around everyday life.',
    proof:
      'Explores consumer UX, habit states, and small interface decisions that help people stay organized in everyday life.',
    stack: ['CSS', 'Frontend UI', 'Scheduling UX'],
    metrics: ['habit flows', 'responsive UI', 'consumer app'],
  },
];

const supportingRepos = [
  'portfolio-app',
  'Resume',
  'DOM-Manipulation',
  'CSS-Animations',
  'CSS-Layouts',
  'Pizzeria',
  'Rock-Paper-Scissors-Game',
  'Cryptographic Communication System',
  'Expense Tracker',
  'Golf Tournament Database',
];

const experiences = [
  {
    company: 'Clozi LLC',
    title: 'Founder and Technical Product Lead',
    dates: 'Jan 2026 to Present',
    summary:
      'Architecting a React Native, TypeScript, JavaScript, and Supabase mobile product with secure data modeling, AI outfit workflows, and release gates.',
    evidence: ['48 Postgres tables', '166 RLS policies', 'CI/CD quality gates'],
  },
  {
    company: 'Risker',
    title: 'Project Manager',
    dates: 'Apr 2025 to Present',
    summary:
      'Led Agile delivery for AI carrier-matching workflows across 45 insurance carriers, reducing manual research through pre-qualification logic.',
    evidence: ['45 carriers', '40 to 60 percent research reduction', '25 percent workflow lift'],
  },
  {
    company: 'UCF Student Union',
    title: 'Event Manager',
    dates: 'Nov 2022 to Present',
    summary:
      'Led daily event operations across multiple venues while coordinating 15+ staff members under live production constraints.',
    evidence: ['2 events per day', '6+ venues', 'on-time readiness'],
  },
];

const stackGroups = [
  ['Languages', ['JavaScript', 'TypeScript', 'Java', 'SQL', 'Python', 'C']],
  ['Frontend', ['React', 'React Native', 'Vite', 'Expo', 'CSS architecture', 'Responsive UI']],
  ['Backend and Data', ['Node', 'Express', 'MongoDB', 'Mongoose', 'Supabase', 'Postgres', 'REST APIs']],
  ['Quality and Delivery', ['Automated testing', 'E2E checks', 'CI/CD gates', 'Code review', 'GitHub workflows']],
  ['AI and Product', ['Gemini', 'OpenAI', 'Claude Code', 'AI agents', 'Prompt design', 'Data modeling']],
];

// ─── Three.js particle network ────────────────────────────────────────────────

const NODE_COUNT = 52;
const CONNECT_SQ = 2.7 * 2.7;

function NetworkParticles({ isDark }) {
  const groupRef = useRef(null);

  const { nodeBuf, lineBuf } = useMemo(() => {
    const pts = Array.from({ length: NODE_COUNT }, () => [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 7,
      (Math.random() - 0.5) * 5,
    ]);

    const segs = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i][0] - pts[j][0];
        const dy = pts[i][1] - pts[j][1];
        const dz = pts[i][2] - pts[j][2];
        if (dx * dx + dy * dy + dz * dz < CONNECT_SQ) {
          segs.push(...pts[i], ...pts[j]);
        }
      }
    }

    return {
      nodeBuf: new Float32Array(pts.flat()),
      lineBuf: new Float32Array(segs),
    };
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.042;
    groupRef.current.rotation.x = Math.sin(t * 0.019) * 0.09;
  });

  const nodeColor = isDark ? '#a4d630' : '#6c9e14';
  const lineColor = isDark ? '#4e7a0a' : '#9cc228';
  const lineOpacity = isDark ? 0.24 : 0.18;

  return (
    <group ref={groupRef}>
      {lineBuf.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[lineBuf, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={lineColor} transparent opacity={lineOpacity} />
        </lineSegments>
      )}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodeBuf, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.056}
          color={nodeColor}
          transparent
          opacity={0.72}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

function HeroCanvas({ isDark }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.innerWidth < 820;
    if (!reduced && !mobile) setActive(true);
  }, []);

  if (!active) return null;

  return (
    <div className="hero-canvas-wrap" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 52 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      >
        <NetworkParticles isDark={isDark} />
      </Canvas>
    </div>
  );
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function useLocalTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return window.localStorage.getItem('portfolio-theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  return [theme, setTheme];
}

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';

  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      type="button"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="theme-track" aria-hidden="true">
        <span className="theme-thumb">
          {isDark ? <Moon size={15} weight="bold" /> : <Sun size={15} weight="bold" />}
        </span>
      </span>
      <span>{isDark ? 'Dark' : 'Light'}</span>
    </button>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverStyle, setHoverStyle] = useState({ opacity: 0, left: 0, width: 0 });
  const headerRef = useRef(null);
  const overlayRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        headerRef.current,
        { y: -28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
      );
    },
    { scope: headerRef }
  );

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener('scroll', close, { passive: true });
    return () => window.removeEventListener('scroll', close);
  }, []);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    if (menuOpen) {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: -12, scale: 0.97 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.32, ease: 'expo.out' }
      );
      gsap.fromTo(
        el.querySelectorAll('a, button'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.28, stagger: 0.05, ease: 'power3.out', delay: 0.06 }
      );
    }
  }, [menuOpen]);

  const handleMouseEnter = (event) => {
    const { offsetLeft, offsetWidth } = event.currentTarget;
    setHoverStyle({ opacity: 1, left: offsetLeft, width: offsetWidth });
  };

  return (
    <>
      <header className="site-header" ref={headerRef}>
        <a className="brand-mark" href="#top" aria-label="Eduardo Canelas home">
          <img src={profile.photo} alt="" />
          <span>{profile.shortName}</span>
        </a>

        <nav
          aria-label="Portfolio sections"
          onMouseLeave={() => setHoverStyle((s) => ({ ...s, opacity: 0 }))}
        >
          <span className="nav-indicator" style={hoverStyle} aria-hidden="true" />
          {navItems.map(([label, href]) => (
            <a key={label} href={href} onMouseEnter={handleMouseEnter}>
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a className="header-cta" href={`mailto:${profile.email}`}>
            Contact
          </a>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((o) => !o)}
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} weight="bold" /> : <Rows size={18} weight="bold" />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav
          className="mobile-nav-overlay"
          aria-label="Mobile navigation"
          ref={overlayRef}
        >
          {navItems.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <button type="button" onClick={onToggleTheme}>
            Switch to {theme === 'dark' ? 'light' : 'dark'} mode
          </button>
          <a href={`mailto:${profile.email}`} onClick={() => setMenuOpen(false)}>
            Contact Eduardo
          </a>
        </nav>
      )}
    </>
  );
}

// ─── Countdown ────────────────────────────────────────────────────────────────

function GraduationCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date('2026-05-09T00:00:00-04:00');

    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="graduation-countdown load-in" aria-label="Graduation countdown">
      <div className="countdown-eyebrow">
        <span className="pulse-dot" />
        Graduating May 9, 2026
      </div>
      <div className="countdown-timer">
        {[
          ['days', 'Days'],
          ['hours', 'Hrs'],
          ['minutes', 'Min'],
          ['seconds', 'Sec'],
        ].map(([key, label]) => (
          <div className="time-block" key={key}>
            <span className="time-val">{String(timeLeft[key]).padStart(2, '0')}</span>
            <span className="time-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Magnetic button ──────────────────────────────────────────────────────────

function MagneticLink({ className, href, children, target, rel }) {
  const ref = useRef(null);

  const handlePointerMove = (e) => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.16;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.16;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate3d(0, 0, 0)';
  };

  return (
    <a
      className={`button ${className}`}
      href={href}
      target={target}
      rel={rel}
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      {children}
    </a>
  );
}

// ─── Project orbit (hero) ─────────────────────────────────────────────────────

function ProjectOrbit({ activeProject, setActiveProject }) {
  const project = featuredProjects[activeProject];

  return (
    <aside
      className="project-orbit load-in"
      aria-label="Interactive featured project selector"
      aria-live="polite"
    >
      <div className="orbit-map-grid">
        <div className="orbit-stage" aria-hidden="false">
          <svg className="orbit-lines" viewBox="0 0 100 100" aria-hidden="true">
            <path d="M14 66 C26 24 58 14 84 34" />
            <path d="M15 76 C42 80 68 58 75 18" />
            <path d="M24 28 C38 68 63 75 90 52" />
          </svg>
          <div className="orbit-core">
            <img src={profile.photo} alt="" />
            <span>Available</span>
          </div>
          {featuredProjects.map((p, index) => (
            <button
              className={`orbit-node orbit-node-${index} ${activeProject === index ? 'is-active' : ''}`}
              key={p.name}
              onClick={() => setActiveProject(index)}
              type="button"
              aria-label={`Inspect ${p.name}`}
              aria-pressed={activeProject === index}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
        <div className="orbit-rank-list" aria-label="Featured project selector">
          {featuredProjects.map((item, index) => (
            <button
              className={activeProject === index ? 'is-active' : ''}
              key={item.name}
              onClick={() => setActiveProject(index)}
              type="button"
              aria-pressed={activeProject === index}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item.name}</strong>
              <small>{item.rank}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="orbit-readout" key={project.name}>
        <div className="orbit-readout-top">
          <span>{String(activeProject + 1).padStart(2, '0')} viewing</span>
          <strong>{project.rank}</strong>
        </div>
        <h2>{project.name}</h2>
        <p>{project.type}</p>
        <small>{project.proof}</small>
        <div className="orbit-actions">
          <a href={project.href} target="_blank" rel="noreferrer">
            Open repo <GithubLogo size={16} weight="bold" />
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer">
              Live app <ArrowRight size={16} weight="bold" />
            </a>
          )}
        </div>
      </div>
    </aside>
  );
}

// ─── Build process panel ──────────────────────────────────────────────────────

function BuildProcessPanel() {
  const [activeStep, setActiveStep] = useState(0);
  const processRef = useRef(null);
  const detailRef = useRef(null);
  const didMount = useRef(false);

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      gsap.from('.process-track-node', {
        autoAlpha: 0,
        scale: reduce ? 1 : 0.5,
        duration: reduce ? 0.01 : 0.52,
        ease: 'back.out(1.7)',
        stagger: 0.16,
      });

      gsap.from('.process-detail', {
        autoAlpha: 0,
        y: reduce ? 0 : 22,
        duration: reduce ? 0.01 : 0.6,
        ease: 'power3.out',
        delay: reduce ? 0 : 0.32,
      });

      if (!reduce) {
        gsap.fromTo(
          '.process-track-fill',
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: 'power3.out', transformOrigin: 'left center', delay: 0.1 }
        );

        gsap.fromTo(
          '.process-path-dashes',
          { strokeDashoffset: 0 },
          { strokeDashoffset: -132, duration: 3.8, ease: 'none', repeat: -1 }
        );

        gsap.to('.process-track-node .node-circle', {
          scale: 1.06,
          duration: 2.8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.3,
        });
      }
    },
    { scope: processRef }
  );

  const handleStepChange = (index) => {
    if (index === activeStep) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !detailRef.current) {
      setActiveStep(index);
      return;
    }
    gsap.to(detailRef.current, {
      autoAlpha: 0,
      y: 8,
      duration: 0.16,
      ease: 'power2.in',
      onComplete: () => setActiveStep(index),
    });
  };

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    if (!detailRef.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    gsap.fromTo(
      detailRef.current,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.32, ease: 'power3.out' }
    );
  }, [activeStep]);

  const step = buildProcess[activeStep];

  return (
    <div className="build-process reveal" ref={processRef}>
      <div className="process-track" aria-hidden="true">
        <svg
          className="process-track-svg"
          viewBox="0 0 640 100"
          preserveAspectRatio="none"
        >
          <path className="process-path-dashes" d="M80 50 Q210 15 320 50 Q430 85 560 50" />
        </svg>
        <div className="process-track-fill" />
        {buildProcess.map((item, index) => (
          <button
            className={`process-track-node process-track-node-${index} ${activeStep === index ? 'is-active' : ''}`}
            key={item.label}
            onClick={() => handleStepChange(index)}
            type="button"
            aria-label={`Show step: ${item.label}`}
            aria-pressed={activeStep === index}
          >
            <span className="node-circle">{String(index + 1).padStart(2, '0')}</span>
            <strong>{item.label}</strong>
          </button>
        ))}
      </div>

      <div className="process-detail" ref={detailRef} aria-live="polite">
        <div className="process-detail-meta">
          <span className="process-detail-num">{String(activeStep + 1).padStart(2, '0')}</span>
          <span className="process-detail-label">{step.label}</span>
        </div>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
      </div>
    </div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────

function SectionHeading({ eyebrow, title, detail }) {
  return (
    <div className="section-heading reveal">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {detail && <span>{detail}</span>}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  const pageRef = useRef(null);
  const inspectorRef = useRef(null);
  const firstProjectRender = useRef(true);
  const [theme, setTheme] = useLocalTheme();
  const [activeProject, setActiveProject] = useState(0);
  const project = featuredProjects[activeProject];
  const selectedStack = useMemo(() => project.stack, [project]);

  // Animate inspector content when project switches
  useEffect(() => {
    if (firstProjectRender.current) {
      firstProjectRender.current = false;
      return;
    }
    if (!inspectorRef.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    gsap.fromTo(
      inspectorRef.current.children,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.055, ease: 'power3.out' }
    );
  }, [activeProject]);

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      gsap.set('.load-in', { y: reduce ? 0 : 26, opacity: 0 });
      gsap.to('.load-in', {
        y: 0,
        opacity: 1,
        duration: reduce ? 0.01 : 0.84,
        ease: 'expo.out',
        stagger: 0.075,
      });

      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: reduce ? 0 : 34,
          duration: reduce ? 0.01 : 0.76,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 91%',
            once: true,
          },
        });
      });

      if (!reduce) {
        gsap.to('.orbit-node', {
          y: -8,
          duration: 2.6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.18,
        });

        gsap.utils.toArray('.orbit-lines path').forEach((path, i) => {
          gsap.fromTo(
            path,
            { strokeDashoffset: i * 24 },
            {
              strokeDashoffset: i % 2 === 0 ? -156 : 156,
              duration: 4.8 + i * 0.5,
              ease: 'none',
              repeat: -1,
            }
          );
        });

        gsap.to('.photo-card img', {
          scale: 1.045,
          duration: 6.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });

        // Subtle parallax on hero rail
        gsap.to('.hero-rail', {
          y: -28,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    },
    { scope: pageRef }
  );

  return (
    <main className="portfolio" ref={pageRef}>
      <Header
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      />

      {/* ── Hero ── */}
      <section id="top" className="hero-section">
        <HeroCanvas isDark={theme === 'dark'} />

        <div className="hero-rail load-in">
          <div className="photo-card">
            <img src={profile.photo} alt="Eduardo Canelas Eterovic" />
          </div>
          <div className="identity-note">
            <span>{profile.location}</span>
            <strong>{profile.role}</strong>
            <p>
              I build with product curiosity, technical discipline, and a commitment to building
              software that is practical and genuinely helpful.
            </p>
          </div>
        </div>

        <div className="hero-copy">
          <GraduationCountdown />
          <p className="eyebrow load-in">Software portfolio by Eduardo Canelas</p>
          <h1 className="load-in">
            I like building apps that solve real problems and make life easier.
          </h1>
          <div className="hero-actions load-in">
            <MagneticLink className="primary" href="#projects">
              Explore my builds <ArrowRight size={18} weight="bold" />
            </MagneticLink>
            <MagneticLink className="secondary" href={profile.cv} target="_blank" rel="noreferrer">
              Download CV <DownloadSimple size={18} weight="bold" />
            </MagneticLink>
          </div>
        </div>

        <ProjectOrbit activeProject={activeProject} setActiveProject={setActiveProject} />
      </section>

      {/* ── About / Build process ── */}
      <section id="about" className="about-band">
        <div className="about-intent reveal">
          <p>Why I build</p>
          <h2>I want my work to feel useful, personal, and worth coming back to.</h2>
        </div>
        <BuildProcessPanel />
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="section-band projects-band">
        <SectionHeading
          eyebrow="Featured builds"
          title="A closer look at the apps, systems, and product ideas I care about building."
          detail="Selected from 26 public repositories at github.com/eduardo-canelas."
        />

        <div className="project-stage">
          <div className="project-list" role="list" aria-label="Featured repositories">
            {featuredProjects.map((item, index) => (
              <button
                className={`project-row reveal ${activeProject === index ? 'is-selected' : ''}`}
                key={item.name}
                onClick={() => setActiveProject(index)}
                type="button"
                role="listitem"
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.type}</p>
                </div>
                <small>{item.language}</small>
              </button>
            ))}
          </div>

          <article
            className="project-inspector reveal"
            aria-live="polite"
            ref={inspectorRef}
          >
            <div className="inspector-top">
              <span>{project.rank}</span>
              <span>{project.date}</span>
            </div>
            <h3>{project.name}</h3>
            <p>{project.summary}</p>
            <blockquote>{project.proof}</blockquote>
            <div className="metric-strip">
              {project.metrics.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
            <div className="stack-pills">
              {selectedStack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <div className="inspector-actions">
              <MagneticLink className="primary" href={project.href} target="_blank" rel="noreferrer">
                Open repo <GithubLogo size={18} weight="bold" />
              </MagneticLink>
              {project.live && (
                <MagneticLink
                  className="secondary"
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                >
                  Launch app <ArrowRight size={18} weight="bold" />
                </MagneticLink>
              )}
            </div>
          </article>
        </div>

        <div className="repo-strip reveal" aria-label="Supporting repositories reviewed">
          <div>
            <span>Also explored</span>
            <strong>{supportingRepos.length} supporting builds</strong>
          </div>
          <ul>
            {supportingRepos.map((repo) => (
              <li key={repo}>{repo}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="section-band experience-band">
        <SectionHeading
          eyebrow="Experience"
          title="My work has shaped how I think about people, constraints, ownership, and shipping."
        />
        <div className="timeline">
          {experiences.map((item) => (
            <article className="timeline-item reveal" key={item.company}>
              <div className="timeline-meta">
                <span>{item.dates}</span>
                <h3>{item.company}</h3>
                <p>{item.title}</p>
              </div>
              <p className="timeline-summary">{item.summary}</p>
              <ul className="timeline-evidence">
                {item.evidence.map((ev) => (
                  <li key={ev}>
                    <CheckCircle size={15} weight="fill" />
                    {ev}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ── Stack ── */}
      <section id="stack" className="section-band stack-band">
        <SectionHeading
          eyebrow="Stack"
          title="A practical toolkit for turning ideas into useful, user-facing software."
        />
        <div className="stack-matrix">
          {stackGroups.map(([group, skills]) => (
            <article className="stack-group reveal" key={group}>
              <h3>{group}</h3>
              <div>
                {skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="contact-band">
        <div className="contact-panel reveal">
          <div>
            <p>Contact</p>
            <h2>Open to teams that care about building thoughtful software with real-world impact.</h2>
          </div>
          <div className="contact-actions">
            <MagneticLink className="primary" href={`mailto:${profile.email}`}>
              Email Eduardo <PaperPlaneTilt size={18} weight="bold" />
            </MagneticLink>
            <MagneticLink
              className="secondary"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <LinkedinLogo size={18} weight="bold" />
            </MagneticLink>
            <MagneticLink
              className="secondary"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub <GithubLogo size={18} weight="bold" />
            </MagneticLink>
          </div>
          <dl className="contact-meta">
            <div>
              <dt>Location</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{profile.email}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{profile.phone}</dd>
            </div>
          </dl>
        </div>
        <footer className="site-footer">
          <Briefcase size={16} weight="bold" />
          <span>Designed to show the builder, the craft, and the intent behind the work.</span>
        </footer>
      </section>
    </main>
  );
}

export default App;
