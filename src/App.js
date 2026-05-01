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
  Sparkle,
  Sun,
  X,
} from '@phosphor-icons/react';
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
    <button className="theme-toggle" onClick={onToggle} type="button" aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
      <span className="theme-track" aria-hidden="true">
        <span className="theme-thumb">{isDark ? <Moon size={15} weight="bold" /> : <Sun size={15} weight="bold" />}</span>
      </span>
      <span>{isDark ? 'Dark' : 'Light'}</span>
    </button>
  );
}

function Header({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverStyle, setHoverStyle] = useState({ opacity: 0, left: 0, width: 0 });
  const headerRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(headerRef.current, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: 'expo.out' });
    },
    { scope: headerRef }
  );

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener('scroll', close, { passive: true });
    return () => window.removeEventListener('scroll', close);
  }, []);

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

        <nav aria-label="Portfolio sections" onMouseLeave={() => setHoverStyle((style) => ({ ...style, opacity: 0 }))}>
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
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} weight="bold" /> : <Rows size={18} weight="bold" />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav className="mobile-nav-overlay" aria-label="Mobile navigation">
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

function GraduationCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-05-09T00:00:00-04:00');

    const updateTimer = () => {
      const difference = targetDate.getTime() - Date.now();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateTimer();
    const intervalId = window.setInterval(updateTimer, 1000);
    return () => window.clearInterval(intervalId);
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

function MagneticLink({ className, href, children, target, rel }) {
  const ref = useRef(null);

  const handlePointerMove = (event) => {
    const element = ref.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.16;
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate3d(0, 0, 0)';
  };

  return (
    <a className={`button ${className}`} href={href} target={target} rel={rel} ref={ref} onPointerMove={handlePointerMove} onPointerLeave={reset}>
      {children}
    </a>
  );
}

function ProjectOrbit({ activeProject, setActiveProject }) {
  const project = featuredProjects[activeProject];

  return (
    <aside className="project-orbit load-in" aria-label="Interactive featured project selector" aria-live="polite">
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
          {featuredProjects.map((project, index) => (
            <button
              className={`orbit-node orbit-node-${index} ${activeProject === index ? 'is-active' : ''}`}
              key={project.name}
              onClick={() => setActiveProject(index)}
              type="button"
              aria-label={`Inspect ${project.name}`}
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

function BuildProcessPanel() {
  const processRef = useRef(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      gsap.from('.process-track-node', {
        autoAlpha: 0,
        scale: reduceMotion ? 1 : 0.5,
        duration: reduceMotion ? 0.01 : 0.52,
        ease: 'back.out(1.7)',
        stagger: 0.16,
      });

      gsap.from('.process-step', {
        autoAlpha: 0,
        y: reduceMotion ? 0 : 20,
        duration: reduceMotion ? 0.01 : 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        delay: reduceMotion ? 0 : 0.28,
      });

      if (!reduceMotion) {
        gsap.fromTo(
          '.process-track-fill',
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: 'power3.out', transformOrigin: 'left center', delay: 0.1 }
        );

        gsap.fromTo(
          '.process-path-dashes',
          { strokeDashoffset: 0 },
          {
            strokeDashoffset: -132,
            duration: 3.8,
            ease: 'none',
            repeat: -1,
          }
        );

        gsap.to('.process-track-node span', {
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

  return (
    <div className="build-process reveal" ref={processRef}>
      <div className="process-track" aria-hidden="true">
        <svg className="process-track-svg" viewBox="0 0 640 100" preserveAspectRatio="none">
          <path className="process-path-dashes" d="M80 50 Q210 15 320 50 Q430 85 560 50" />
        </svg>
        <div className="process-track-fill" />
        {buildProcess.map((item, index) => (
          <div className={`process-track-node process-track-node-${index}`} key={item.label}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{item.label}</strong>
          </div>
        ))}
      </div>

      <div className="process-steps" aria-label="Build process steps">
        {buildProcess.map((item, index) => (
          <article className="process-step" key={item.title}>
            <div className="process-step-header">
              <Sparkle size={15} weight="bold" />
              <span>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, detail }) {
  return (
    <div className="section-heading reveal">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {detail && <span>{detail}</span>}
    </div>
  );
}

function App() {
  const pageRef = useRef(null);
  const [theme, setTheme] = useLocalTheme();
  const [activeProject, setActiveProject] = useState(0);
  const project = featuredProjects[activeProject];
  const selectedStack = useMemo(() => project.stack, [project]);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      gsap.set('.load-in', { y: reduceMotion ? 0 : 22 });
      gsap.to('.load-in', {
        y: 0,
        duration: reduceMotion ? 0.01 : 0.8,
        ease: 'expo.out',
        stagger: 0.07,
      });

      gsap.utils.toArray('.reveal').forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: reduceMotion ? 0 : 32,
          duration: reduceMotion ? 0.01 : 0.72,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 92%',
            once: true,
          },
        });
      });

      if (!reduceMotion) {
        gsap.to('.orbit-node', {
          y: -8,
          duration: 2.6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.16,
        });

        gsap.utils.toArray('.orbit-lines path').forEach((path, index) => {
          gsap.fromTo(
            path,
            { strokeDashoffset: index * 24 },
            {
              strokeDashoffset: index % 2 === 0 ? -156 : 156,
              duration: 4.8 + index * 0.5,
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
      }
    },
    { scope: pageRef }
  );

  return (
    <main className="portfolio" ref={pageRef}>
      <Header theme={theme} onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))} />

      <section id="top" className="hero-section">
        <div className="hero-rail load-in">
          <div className="photo-card">
            <img src={profile.photo} alt="Eduardo Canelas Eterovic" />
          </div>
          <div className="identity-note">
            <span>{profile.location}</span>
            <strong>{profile.role}</strong>
            <p>I build with product curiosity, technical discipline, and a commitment to building software that is practical and genuinely helpful.</p>
          </div>
        </div>

        <div className="hero-copy">
          <GraduationCountdown />
          <p className="eyebrow load-in">Software portfolio by Eduardo Canelas</p>
          <h1 className="load-in">I like building apps that solve real problems and make life easier.</h1>
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

      <section id="about" className="about-band">
        <div className="about-intent reveal">
          <p>Why I build</p>
          <h2>I want my work to feel useful, personal, and worth coming back to.</h2>
        </div>
        <BuildProcessPanel />
      </section>

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

          <article className="project-inspector reveal" aria-live="polite">
            <div className="inspector-top">
              <span>{project.rank}</span>
              <span>{project.date}</span>
            </div>
            <h3>{project.name}</h3>
            <p>{project.summary}</p>
            <blockquote>{project.proof}</blockquote>
            <div className="metric-strip">
              {project.metrics.map((metric) => (
                <span key={metric}>{metric}</span>
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
                <MagneticLink className="secondary" href={project.live} target="_blank" rel="noreferrer">
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

      <section id="experience" className="section-band experience-band">
        <SectionHeading
          eyebrow="Experience"
          title="My work has shaped how I think about people, constraints, ownership, and shipping."
        />
        <div className="timeline">
          {experiences.map((item) => (
            <article className="timeline-item reveal" key={item.company}>
              <div>
                <span>{item.dates}</span>
                <h3>{item.company}</h3>
                <p>{item.title}</p>
              </div>
              <p>{item.summary}</p>
              <ul>
                {item.evidence.map((evidence) => (
                  <li key={evidence}>
                    <CheckCircle size={15} weight="fill" />
                    {evidence}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="stack" className="section-band stack-band">
        <SectionHeading eyebrow="Stack" title="A practical toolkit for turning ideas into useful, user-facing software." />
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
            <MagneticLink className="secondary" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <LinkedinLogo size={18} weight="bold" />
            </MagneticLink>
            <MagneticLink className="secondary" href={profile.github} target="_blank" rel="noreferrer">
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
