import React, { useMemo, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './App.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const profile = {
  name: 'Eduardo Canelas Eterovic',
  role: 'Junior Software Engineer',
  focus: 'Full-stack product engineering, AI workflows, data modeling, and shipping impactful software.',
  location: 'Orlando, FL',
  email: 'edu.canelas.e@gmail.com',
  phone: '(689) 220-9515',
  linkedin: 'https://www.linkedin.com/in/eduardo-canelas-eterovic/',
  github: 'https://github.com/eduardo-canelas',
  cv: `${process.env.PUBLIC_URL}/assets/eduardo-canelas-cv.pdf`,
  photo: `${process.env.PUBLIC_URL}/assets/eduardo-profile.jpg`,
};

const navItems = [
  ['Proof', '#proof'],
  ['Projects', '#projects'],
  ['Experience', '#experience'],
  ['Stack', '#stack'],
];

const repoSignal = {
  screened: 26,
  featured: 6,
  publicRepos: '26 public repos',
  updated: 'GitHub scan: Apr 30, 2026',
};

const proofPoints = [
  { value: '26', label: 'public repos reviewed' },
  { value: '5', label: 'MongoDB entities in RoutePulse' },
  { value: '45+', label: 'products in Java e-store inventory' },
  { value: '6', label: 'featured builds showcasing my learning journey' },
];

const featuredProjects = [
  {
    name: 'RoutePulse',
    repo: 'Group-Project',
    type: 'Full-stack logistics platform',
    rank: 'Flagship',
    date: 'Updated Apr 2026',
    language: 'JavaScript',
    href: 'https://github.com/eduardo-canelas/Group-Project',
    live: 'https://route-pulse.vercel.app',
    summary:
      'MERN package-tracking app for admins and drivers with role-based dashboards, package CRUD, driver assignment, and handling-event history.',
    proof:
      'Key portfolio showcase: React, Vite, Express, MongoDB, protected role workflows, many-to-many package and facility events, and deployed product polish.',
    stack: ['React', 'Vite', 'Node', 'Express', 'MongoDB', 'Mongoose'],
    metrics: ['5 entities', '2 roles', 'many-to-many events'],
  },
  {
    name: 'Multi-Threaded Routing',
    repo: 'Multi-Threaded-Routing',
    type: 'Concurrent package routing simulation',
    rank: 'Systems signal',
    date: 'Updated Jun 2025',
    language: 'Java',
    href: 'https://github.com/eduardo-canelas/Multi-Threaded-Routing',
    live: null,
    summary:
      'Java simulation of package routing with synchronized conveyor access and deadlock avoidance.',
    proof:
      'A compact but valuable signal for concurrency, synchronization, resource contention, and logistics-domain reasoning.',
    stack: ['Java', 'Threads', 'Synchronization', 'Routing'],
    metrics: ['deadlock avoidance', 'shared conveyors', 'simulation'],
  },
  {
    name: 'CLOZI',
    repo: 'CLOZI',
    type: 'Mobile product startup',
    rank: 'Production App',
    date: 'Updated Apr 2026',
    language: 'TypeScript',
    href: 'https://github.com/eduardo-canelas/CLOZI',
    live: null,
    summary:
      'Architecting a React Native, TypeScript, JavaScript, and Supabase mobile product with secure data modeling, AI outfit workflows, and release gates.',
    proof:
      'Strongest signal for mobile development, Supabase backend integration, complex state management, and real-world product delivery.',
    stack: ['React Native', 'TypeScript', 'Supabase', 'Postgres'],
    metrics: ['48 tables', '166 RLS policies', 'CI/CD'],
  },
  {
    name: 'Risker Agent Backend',
    repo: 'RiskerAgentBackend',
    type: 'AI Carrier-Matching API',
    rank: 'AI Workflows',
    date: 'Updated Apr 2026',
    language: 'Python',
    href: 'https://github.com/eduardo-canelas/RiskerAgentBackend',
    live: null,
    summary:
      'Backend infrastructure for an AI carrier-matching workflow across 45 insurance carriers, reducing manual research through pre-qualification logic.',
    proof:
      'Demonstrates Python backend architecture, AI/LLM integration for complex business logic, and automated workflow optimizations.',
    stack: ['Python', 'AI Agents', 'FastAPI', 'Workflows'],
    metrics: ['45 carriers', '25% workflow lift', 'AI integration'],
  },
  {
    name: 'Habitz',
    repo: 'habitz',
    type: 'Habit scheduling app',
    rank: 'UX system',
    date: 'Updated Dec 2024',
    language: 'CSS',
    href: 'https://github.com/eduardo-canelas/habitz',
    live: null,
    summary:
      'A habit planning interface where users create and schedule routines around their lifestyle.',
    proof:
      'Good portfolio support for consumer UX, responsive layout, habit data states, and interface clarity.',
    stack: ['CSS', 'Frontend UI', 'Scheduling UX'],
    metrics: ['6.7 MB repo', 'habit flows', 'consumer app'],
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
      'Desktop e-store simulation with product search, shopping cart logic, inventory validation, discounts, tax, invoices, and transaction history.',
    proof:
      'Shows OOP, event-driven GUI programming, file I/O, validation, business rules, and persistence in a non-web environment.',
    stack: ['Java', 'Swing', 'CSV persistence', 'OOP'],
    metrics: ['45+ items', 'file I/O', 'transaction logs'],
  },
];

const supportingRepos = [
  'portfolio-app',
  'Resume',
  'DOM-Manipulation',
  'CSS-Animations',
  'CSS-Layouts',
  'CSS-Practice',
  'Pizzeria',
  'Rock-Paper-Scissors-Game',
  'ValenceCollegeManagementSystem',
  'Cryptographic_Communication_System_Implementation',
  'Expense_Tracker',
  'Bakery-Shop-Management',
  'Golf-Tournament-Database',
  'Hangman_Game',
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
    evidence: ['2 events per day', '6+ venues', '100 percent on-time readiness'],
  },
];

const stackGroups = [
  ['Languages', ['JavaScript', 'TypeScript', 'Java', 'SQL', 'Python', 'C']],
  ['Frontend', ['React', 'React Native', 'Vite', 'Expo', 'CSS architecture', 'Responsive UI']],
  ['Backend and Data', ['Node', 'Express', 'MongoDB', 'Mongoose', 'Supabase', 'Postgres', 'REST APIs']],
  ['Quality and Delivery', ['Automated testing', 'E2E regression', 'CI/CD gates', 'Code review', 'GitHub workflows']],
  ['AI and Product', ['Gemini', 'OpenAI', 'Claude Code', 'AI agents', 'Prompt design', 'AI-assisted development', 'Data modeling']],
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M8 7h9v9" />
      <path d="M17 7 6 18" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function GraduationCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const targetDate = new Date('2026-05-09T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useGSAP(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  return (
    <div className="graduation-countdown load-in" ref={containerRef}>
      <div className="countdown-eyebrow">
        <span className="pulse-dot" />
        Graduating May 9, 2026
      </div>
      <div className="countdown-timer">
        <div className="time-block">
          <span className="time-val">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="time-label">DAYS</span>
        </div>
        <div className="time-block">
          <span className="time-val">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="time-label">HRS</span>
        </div>
        <div className="time-block">
          <span className="time-val">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="time-label">MIN</span>
        </div>
        <div className="time-block">
          <span className="time-val">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="time-label">SEC</span>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const [hoverStyle, setHoverStyle] = useState({ opacity: 0, left: 0, width: 0 });
  const navRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', delay: 0.1 }
    );
  }, { scope: headerRef });

  const handleMouseEnter = (e) => {
    const { offsetLeft, offsetWidth } = e.currentTarget;
    setHoverStyle({
      opacity: 1,
      left: offsetLeft,
      width: offsetWidth,
    });
  };

  const handleMouseLeave = () => {
    setHoverStyle({ ...hoverStyle, opacity: 0 });
  };

  return (
    <header className="site-header" ref={headerRef}>
      <a className="brand" href="#top" aria-label="Eduardo Canelas home">
        <span>Eduardo Canelas</span>
      </a>
      <nav aria-label="Portfolio sections" ref={navRef} onMouseLeave={handleMouseLeave}>
        <div className="nav-indicator" style={hoverStyle} aria-hidden="true" />
        {navItems.map(([label, href]) => (
          <a key={label} href={href} onMouseEnter={handleMouseEnter}>
            {label}
          </a>
        ))}
      </nav>
      <a className="header-cta" href={`mailto:${profile.email}`}>
        Contact
      </a>
    </header>
  );
}

function ProjectConsole({ activeProject, setActiveProject }) {
  const project = featuredProjects[activeProject];

  return (
    <aside className="project-console" aria-label="Interactive featured project inspector">
      <div className="console-head">
        <span>Project Showcase</span>
        <strong>{repoSignal.updated}</strong>
      </div>
      <div className="radar-stage" aria-hidden="true">
        <svg className="radar-lines" viewBox="0 0 100 100">
          <path d="M13 70 C28 20 58 18 84 36" />
          <path d="M18 78 C42 76 59 58 72 22" />
          <path d="M26 30 C39 64 61 72 88 55" />
        </svg>
        {featuredProjects.slice(0, 5).map((item, index) => (
          <button
            aria-label={`Inspect ${item.name}`}
            className={`radar-node node-${index} ${activeProject === index ? 'is-active' : ''}`}
            key={item.name}
            onClick={() => setActiveProject(index)}
            type="button"
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
          </button>
        ))}
        <div className="radar-core">
          <img src={profile.photo} alt="" />
        </div>
      </div>
      <div className="console-readout">
        <span>{project.rank}</span>
        <h2>{project.name}</h2>
        <p>{project.proof}</p>
        <div className="console-links">
          <a href={project.href} target="_blank" rel="noreferrer">
            GitHub <ExternalIcon />
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer">
              Live app <ExternalIcon />
            </a>
          )}
        </div>
      </div>
    </aside>
  );
}

function App() {
  const pageRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);
  const project = featuredProjects[activeProject];
  const selectedStack = useMemo(() => project.stack, [project]);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      gsap.set('.load-in', { y: reduceMotion ? 0 : 28 });
      gsap.to('.load-in', {
        y: 0,
        duration: reduceMotion ? 0.01 : 0.85,
        ease: 'power4.out',
        stagger: 0.08,
      });

      gsap.utils.toArray('.reveal').forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: reduceMotion ? 0 : 34,
          duration: reduceMotion ? 0.01 : 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 95%',
            once: true,
          },
        });
      });

      if (!reduceMotion) {
        gsap.to('.radar-node', {
          y: -7,
          duration: 2.8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.15,
        });

        gsap.to('.radar-lines path', {
          strokeDashoffset: -80,
          duration: 4.8,
          ease: 'none',
          repeat: -1,
        });

        gsap.to('.hero-photo img', {
          scale: 1.055,
          duration: 6,
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
      <Header />

      <section id="top" className="hero-section">
        <div className="hero-identity load-in">
          <div className="hero-photo">
            <img src={profile.photo} alt="Eduardo Canelas Eterovic" />
          </div>
          <div className="identity-meta">
            <span>{profile.location}</span>
            <strong>{profile.role}</strong>
            <p>{repoSignal.publicRepos} reviewed and ranked for this portfolio.</p>
          </div>
        </div>

        <div className="hero-copy">
          <GraduationCountdown />
          <h1 className="load-in">Passionate about building projects, learning continuously, and growing as a software engineer.</h1>
          <p className="hero-summary load-in">{profile.focus}</p>
          <div className="hero-actions load-in">
            <a className="button primary" href="#projects">
              View featured repos <ArrowIcon />
            </a>
            <a className="button secondary" href={profile.cv} target="_blank" rel="noreferrer">
              Download CV
            </a>
          </div>
          <div id="proof" className="proof-grid load-in" aria-label="Portfolio proof points">
            {proofPoints.map((point) => (
              <div key={point.label}>
                <strong>{point.value}</strong>
                <span>{point.label}</span>
              </div>
            ))}
          </div>
        </div>

        <ProjectConsole activeProject={activeProject} setActiveProject={setActiveProject} />
      </section>

      <section id="projects" className="section-band projects-band">
        <div className="section-heading reveal">
          <p>Featured GitHub work</p>
          <h2>The best repositories are ranked for signal, not displayed as a flat gallery.</h2>
          <span>{repoSignal.screened} repositories reviewed from github.com/eduardo-canelas.</span>
        </div>

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
              <a className="button primary" href={project.href} target="_blank" rel="noreferrer">
                Open repo <ExternalIcon />
              </a>
              {project.live && (
                <a className="button secondary dark" href={project.live} target="_blank" rel="noreferrer">
                  Launch app <ExternalIcon />
                </a>
              )}
            </div>
          </article>
        </div>

        <div className="repo-strip reveal" aria-label="Supporting repositories reviewed">
          <div>
            <span>Also screened</span>
            <strong>{supportingRepos.length} supporting repos</strong>
          </div>
          <ul>
            {supportingRepos.map((repo) => (
              <li key={repo}>{repo}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="experience" className="section-band experience-band">
        <div className="section-heading reveal">
          <p>Experience</p>
          <h2>Operational roles that translate into product ownership and dependable delivery.</h2>
        </div>
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
                  <li key={evidence}>{evidence}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="stack" className="section-band stack-band">
        <div className="section-heading reveal">
          <p>Stack</p>
          <h2>A practical toolkit for building user-facing systems end to end.</h2>
        </div>
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
            <h2>Ready for junior software engineer interviews and product-focused teams.</h2>
          </div>
          <div className="contact-actions">
            <a className="button primary" href={`mailto:${profile.email}`}>
              <MailIcon /> Email Eduardo
            </a>
            <a className="button secondary dark" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="button secondary dark" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
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
      </section>
    </main>
  );
}

export default App;
