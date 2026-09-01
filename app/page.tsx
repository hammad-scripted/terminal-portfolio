"use client";
/* eslint-disable @next/next/no-img-element -- plain images keep this component portable to the static Vite Pages build. */

import { useRef, useState, type FormEvent } from "react";

const commands = ["help", "about", "stack", "projects", "github", "leetcode", "resume", "contact", "theme", "clear"];
const themes = ["black", "brown", "violet", "light"] as const;
type ThemeName = (typeof themes)[number];

const stackGroups = [
  { label: "frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { label: "backend", items: ["Node.js", "Express", "Java", "Spring Boot"] },
  { label: "data", items: ["MongoDB", "PostgreSQL", "Redis", "Cloudinary"] },
  { label: "delivery", items: ["GitHub Actions", "REST APIs", "Postman", "Figma"] },
];

const projects = [
  {
    index: "01",
    name: "MERN E-Commerce",
    status: "production",
    description: "A complete commerce system with authentication, cart logic, coupons, Stripe checkout, admin analytics, Redis caching, and Cloudinary media.",
    tags: ["MERN", "Stripe", "Redis"],
    live: "https://mern-e-commerce-xrw8.onrender.com/",
    code: "https://github.com/hammad-scripted/MERN-E-Commerce",
  },
  {
    index: "02",
    name: "Chatty",
    status: "live",
    description: "A real-time messaging experience built for fast, focused conversations across devices.",
    tags: ["React", "Socket.io", "Node.js"],
    live: "https://chatty-wtdg.onrender.com/",
    code: "https://github.com/hammad-scripted/Chat-App",
  },
  {
    index: "03",
    name: "Twitter Clone",
    status: "live",
    description: "A responsive social platform for sharing updates, exploring conversations, and connecting through a familiar interface.",
    tags: ["React", "Node.js", "MongoDB"],
    live: "https://twitter-clone-1b6c.onrender.com/",
    code: "https://github.com/hammad-scripted/Twitter-Clone",
  },
  {
    index: "04",
    name: "Product Store",
    status: "live",
    description: "A polished full-stack storefront for browsing, organizing, and managing products through a clean visual system.",
    tags: ["React", "Express", "MongoDB"],
    live: "https://product-store-5oyl.onrender.com/",
    code: "https://github.com/hammad-scripted/Product-Store",
  },
  {
    index: "05",
    name: "Tinder",
    status: "live",
    description: "A social discovery experience centered on matching, interaction, and a responsive modern interface.",
    tags: ["React", "Node.js", "MongoDB"],
    live: "https://tinder-zrkn.onrender.com/",
    code: "https://github.com/hammad-scripted/Tinder",
  },
];

const commandCopy: Record<string, string> = {
  help: "Available commands: about, stack, projects, github, leetcode, resume, contact, theme, clear",
  about: "Opening /about — full-stack developer, systems thinker, and 2025 NIT Durgapur graduate.",
  stack: "Opening /stack — React, Next.js, TypeScript, Java, Spring Boot, Node.js, PostgreSQL, MongoDB, Redis.",
  projects: "Opening /projects — selected production-style applications and live builds.",
  github: "Opening /activity — GitHub contribution streak and activity telemetry.",
  leetcode: "Opening /activity — 97 solved problems, including 38 medium and 2 hard.",
  resume: "Opening Hammad-Resume.pdf in a new tab...",
  contact: "Opening /contact — hammad.scripted@gmail.com",
  theme: "Display profile toggled.",
};

type HistoryItem = { command: string; response: string };

export default function Home() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    { command: "whoami", response: "Mohammad Hammad Ansari — Full Stack Developer & System Engineer" },
  ]);
  const [theme, setTheme] = useState<ThemeName>(() => {
    if (typeof window === "undefined") return "black";
    const saved = window.localStorage.getItem("hammad-portfolio-theme") as ThemeName | null;
    return saved && themes.includes(saved) ? saved : "black";
  });
  const [pointer, setPointer] = useState({ x: -100, y: -100 });
  const inputRef = useRef<HTMLInputElement>(null);

  const selectTheme = (nextTheme: ThemeName) => {
    setTheme(nextTheme);
    window.localStorage.setItem("hammad-portfolio-theme", nextTheme);
  };

  const runCommand = (rawCommand: string) => {
    const command = rawCommand.trim().toLowerCase();
    if (!command) return;

    if (command === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (command === "theme") {
      const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
      selectTheme(nextTheme);
    }

    const targets: Record<string, string> = {
      about: "about",
      stack: "stack",
      projects: "projects",
      github: "activity",
      leetcode: "activity",
      contact: "contact",
    };

    if (command === "resume") {
      window.open("./Hammad-Resume.pdf", "_blank", "noopener,noreferrer");
    } else if (targets[command]) {
      document.getElementById(targets[command])?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setHistory((items) => [
      ...items.slice(-3),
      {
        command,
        response: command === "theme"
          ? `Display profile set to ${themes[(themes.indexOf(theme) + 1) % themes.length]}.`
          : commandCopy[command] ?? `command not found: ${command}. Type “help” for available commands.`,
      },
    ]);
    setInput("");
  };

  const submitCommand = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(input);
  };

  return (
    <main
      className={`portfolio-shell theme-${theme}`}
      onPointerMove={(event) => setPointer({ x: event.clientX, y: event.clientY })}
      onPointerLeave={() => setPointer({ x: -100, y: -100 })}
    >
      <div className="grid-field" aria-hidden="true" />
      <div className="pointer-trail" style={{ transform: `translate3d(${pointer.x}px, ${pointer.y}px, 0)` }} aria-hidden="true"><span /></div>
      <section className="terminal-window" aria-label="Hammad's developer portfolio terminal">
        <header className="terminal-chrome">
          <div className="window-controls" aria-hidden="true">
            <span className="control-close" />
            <span className="control-minimize" />
            <span className="control-expand" />
          </div>
          <p>hammad@portfolio: ~</p>
          <div className="chrome-actions">
            <div className="theme-switcher" role="group" aria-label="Choose color theme">
              {themes.map((option) => <button type="button" className={theme === option ? "active" : ""} key={option} onClick={() => selectTheme(option)} aria-label={`Use ${option} theme`} title={`${option} theme`}><span />{option}</button>)}
            </div>
            <span className="session-status">● ONLINE</span>
          </div>
        </header>

        <div className="terminal-layout">
          <aside className="terminal-sidebar" aria-label="Quick commands">
            <a className="sidebar-brand" href="#top" aria-label="Back to top"><span>HA</span><small>PORTFOLIO_OS</small></a>
            <nav>
              {commands.slice(1, 7).map((command, index) => (
                <button type="button" key={command} onClick={() => runCommand(command)}>
                  <span>0{index + 1}</span> ./{command}
                </button>
              ))}
            </nav>
            <div className="sidebar-meta">
              <p>LOCATION</p><span>Bangalore, IN</span>
              <p>STATUS</p><span className="available"><i /> Open to opportunities</span>
            </div>
          </aside>

          <div className="terminal-content">
            <section className="hero" id="top">
              <div className="hero-main">
                <p className="boot-line">Last login: today on portfolio_os</p>
                <div className="history" aria-live="polite">
                  {history.map((item, index) => (
                    <div className="history-item" key={`${item.command}-${index}`}>
                      <p className="prompt-line"><span>hammad@dev</span>:<b>~</b>$ {item.command}</p>
                      <p className="command-response">{item.response}</p>
                    </div>
                  ))}
                </div>

                <div className="intro-output">
                  <p className="eyebrow">FULL STACK DEVELOPER · SYSTEM ENGINEER</p>
                  <h1>Mohammad<br /><em>Hammad Ansari.</em></h1>
                  <p className="intro-copy">I build dependable full-stack products with expressive interfaces, scalable APIs, and clean architecture.</p>
                  <div className="hero-actions">
                    <button type="button" className="terminal-button primary" onClick={() => runCommand("projects")}>$ view projects</button>
                    <a className="terminal-button" href="./Hammad-Resume.pdf" target="_blank" rel="noreferrer">$ open resume.pdf</a>
                  </div>
                </div>

                <form className="command-entry" onSubmit={submitCommand} onClick={() => inputRef.current?.focus()}>
                  <label htmlFor="terminal-command"><i>hammad@dev</i>:<b>~</b>$</label>
                  <input
                    ref={inputRef}
                    id="terminal-command"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="type a command..."
                    autoComplete="off"
                    spellCheck={false}
                    aria-describedby="command-help"
                  />
                  <span className="cursor" aria-hidden="true" />
                </form>
                <div className="command-help" id="command-help">
                  <span>Try:</span>
                  {commands.slice(0, 6).map((command) => <button type="button" key={command} onClick={() => runCommand(command)}>{command}</button>)}
                </div>
              </div>

              <aside className="identity-card">
                <div className="identity-scan"><img src="./formal-portrait.png" alt="Mohammad Hammad Ansari in a black suit" /></div>
                <div className="identity-top"><span>ID: HA-2026</span><span>VERIFIED ✓</span></div>
                <h2>Hammad Ansari</h2>
                <p>Full Stack Developer</p>
                <dl>
                  <div><dt>company</dt><dd>Infosys / Nordstrom</dd></div>
                  <div><dt>education</dt><dd>NIT Durgapur · 2025</dd></div>
                  <div><dt>focus</dt><dd>Product systems</dd></div>
                </dl>
                <a href="mailto:hammad.scripted@gmail.com"><span className="status-dot" /> AVAILABLE FOR BUILDS</a>
              </aside>
            </section>

            <section className="content-section" id="about">
              <SectionHeader command="cat about.md" index="01" title="An engineer who likes the whole system." />
              <div className="about-grid">
                <div className="prose-panel">
                  <p className="lead">I moved from metallurgical and materials engineering into building full-stack products and production systems.</p>
                  <p>I currently work at Infosys as a System Engineer, contributing as a Full Stack Developer for the Nordstrom client. My work spans React interfaces, Java and Spring Boot services, PostgreSQL migrations, delivery automation, and resilient API integrations.</p>
                  <p>My approach is simple: understand the system, reduce uncertainty, and ship work that remains dependable after launch.</p>
                  <div className="metric-row">
                    <div><strong>1M+</strong><span>records migrated</span></div>
                    <div><strong>7.95</strong><span>NIT DGP CGPA</span></div>
                    <div><strong>50+</strong><span>students supported</span></div>
                  </div>
                </div>
                <div className="timeline-panel">
                  <p className="file-label">career.log</p>
                  <article><span>NOW</span><div><h3>System Engineer</h3><p>Infosys · Nordstrom</p><small>React, Java, Spring Boot, PostgreSQL</small></div></article>
                  <article><span>2025</span><div><h3>B.Tech Graduate</h3><p>NIT Durgapur</p><small>Metallurgical & Materials Engineering</small></div></article>
                  <article><span>BMEP</span><div><h3>General Secretary</h3><p>Volunteer Educator</p><small>Community leadership and education</small></div></article>
                </div>
              </div>
            </section>

            <section className="content-section" id="stack">
              <SectionHeader command="tree ./skills" index="02" title="A pragmatic technology stack." />
              <div className="stack-grid">
                {stackGroups.map((group, index) => (
                  <article className="stack-card" key={group.label}>
                    <div className="card-command"><span>drwxr-xr-x</span><b>0{index + 1}</b></div>
                    <h3>./{group.label}/</h3>
                    <ul>{group.items.map((item) => <li key={item}><span>+</span>{item}</li>)}</ul>
                  </article>
                ))}
              </div>
            </section>

            <section className="content-section" id="projects">
              <SectionHeader command="ls -la ./projects" index="03" title="Selected builds, ready to run." />
              <div className="projects-list">
                {projects.map((project) => (
                  <article className="project-card" key={project.name}>
                    <div className="project-index">[{project.index}]</div>
                    <div className="project-copy">
                      <div className="project-heading"><h3>{project.name}</h3><span><i /> {project.status}</span></div>
                      <p>{project.description}</p>
                      <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    </div>
                    <div className="project-links">
                      <a href={project.live} target="_blank" rel="noreferrer">run ↗</a>
                      <a href={project.code} target="_blank" rel="noreferrer">source ↗</a>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="content-section" id="activity">
              <SectionHeader command="sudo monitor --live" index="04" title="Coding telemetry." />
              <div className="activity-summary">
                <article><p>github.user</p><strong>hammad-scripted</strong><span>42 public repositories</span></article>
                <article><p>leetcode.user</p><strong>hammad_codes</strong><span>97 problems solved</span></article>
                <article><p>leetcode.streak</p><strong>12 days</strong><span>58 active days</span></article>
              </div>
              <div className="telemetry-grid">
                <a className="telemetry-card" href="https://github.com/hammad-scripted" target="_blank" rel="noreferrer">
                  <div className="telemetry-title"><span>GITHUB / CONTRIBUTION STREAK</span><b>LIVE ↗</b></div>
                  <img src="https://streak-stats.demolab.com?user=hammad-scripted&hide_border=true&background=090A12&ring=67E8F9&fire=A78BFA&currStreakLabel=67E8F9&sideLabels=A2AABD&dates=5E6678&currStreakNum=F4F7FF&sideNums=F4F7FF" alt="Hammad's live GitHub contribution streak" loading="lazy" />
                </a>
                <a className="telemetry-card" href="https://leetcode.com/u/hammad_codes/" target="_blank" rel="noreferrer">
                  <div className="telemetry-title"><span>LEETCODE / SOLVING STREAK</span><b>LIVE ↗</b></div>
                  <img src="https://leetcard.jacoblin.cool/hammad_codes?theme=dark&font=JetBrains%20Mono&ext=heatmap" alt="Hammad's live LeetCode statistics and heatmap" loading="lazy" />
                </a>
              </div>
              <a className="activity-graph" href="https://github.com/hammad-scripted" target="_blank" rel="noreferrer">
                <img src="https://github-readme-activity-graph.vercel.app/graph?username=hammad-scripted&bg_color=090a12&color=67e8f9&line=a78bfa&point=f4f7ff&area=true&area_color=24213a&hide_border=true" alt="Hammad's GitHub contribution activity graph" loading="lazy" />
              </a>
              <p className="sync-note"><span /> Remote telemetry cards refresh from GitHub and LeetCode services.</p>
            </section>

            <section className="content-section" id="resume">
              <SectionHeader command="open ./Hammad-Resume.pdf" index="05" title="The concise version." />
              <div className="resume-panel">
                <div className="resume-file">
                  <div className="pdf-icon"><span>PDF</span></div>
                  <div><p>Hammad-Resume.pdf</p><span>Professional résumé · 61 KB</span></div>
                </div>
                <p>Experience, education, production work, technical skills, leadership, and selected projects—all in one downloadable file.</p>
                <div className="resume-actions">
                  <a className="terminal-button primary" href="./Hammad-Resume.pdf" target="_blank" rel="noreferrer">$ view resume</a>
                  <a className="terminal-button" href="./Hammad-Resume.pdf" download="Mohammad-Hammad-Ansari-Resume.pdf">$ download --pdf</a>
                </div>
                <div className="checksum"><span>FILE STATUS</span><b>✓ READY TO DOWNLOAD</b></div>
              </div>
            </section>

            <section className="contact-section" id="contact">
              <p className="prompt-line"><span>hammad@dev</span>:<b>~</b>$ ./start-conversation.sh</p>
              <h2>Let&apos;s build something<br /><em>useful and lasting.</em></h2>
              <p>I&apos;m open to full-stack roles, thoughtful product teams, and ambitious collaborations.</p>
              <div className="contact-actions">
                <a href="mailto:hammad.scripted@gmail.com">EMAIL ↗<span>hammad.scripted@gmail.com</span></a>
                <a href="https://github.com/hammad-scripted" target="_blank" rel="noreferrer">GITHUB ↗<span>@hammad-scripted</span></a>
                <a href="https://www.linkedin.com/in/mohammad-hammad-64ba2b229/" target="_blank" rel="noreferrer">LINKEDIN ↗<span>connect professionally</span></a>
                <a href="https://leetcode.com/u/hammad_codes/" target="_blank" rel="noreferrer">LEETCODE ↗<span>@hammad_codes</span></a>
              </div>
            </section>

            <footer className="site-footer">
              <span>© 2026 MOHAMMAD HAMMAD ANSARI</span>
              <span>BUILT WITH NEXT.JS + TAILWIND CSS</span>
              <a href="#top">BACK TO TOP ↑</a>
            </footer>
          </div>
        </div>
      </section>
      <div className="ambient-label label-left">PORTFOLIO_OS v2.0 · ALL SYSTEMS NORMAL</div>
      <div className="ambient-label label-right">31.02° N · 74.35° E</div>
    </main>
  );
}

function SectionHeader({ command, index, title }: { command: string; index: string; title: string }) {
  return (
    <header className="section-header">
      <div><p><span>hammad@dev</span>:<b>~</b>$ {command}</p><h2>{title}</h2></div>
      <span>[ SECTION_{index} ]</span>
    </header>
  );
}
