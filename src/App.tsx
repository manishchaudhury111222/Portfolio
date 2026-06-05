import React, { useState, useEffect, useRef } from 'react';
import { 
  userProfile, 
  experiences, 
  educationList, 
  skillsList, 
  projectsList, 
  certifications 
} from './data';
import { 
  Brain, 
  Cpu, 
  Globe, 
  Code, 
  Server, 
  BarChart, 
  TrendingUp, 
  Linkedin, 
  Github, 
  Mail, 
  Phone, 
  Terminal, 
  ExternalLink, 
  Award, 
  Calendar, 
  MapPin, 
  Search, 
  Sparkles, 
  Command, 
  Layers, 
  Briefcase, 
  GraduationCap, 
  CheckCircle2, 
  ChevronRight, 
  CircleDot, 
  Lightbulb, 
  X,
  Code2,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ThreeCanvas from './components/ThreeCanvas';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'about' | 'projects' | 'skills' | 'certifications'>('about');
  
  // Dynamic theme styling helper definitions
  const accentText = isDarkMode ? "text-[#2dd4bf]" : "text-[#0d9488]";
  const accentBg = isDarkMode ? "bg-[#2dd4bf]" : "bg-[#0d9488]";
  const accentBorder = isDarkMode ? "border-[#2dd4bf]/20" : "border-[#0d9488]/20";
  const [projectFilter, setProjectFilter] = useState<'all' | 'web' | 'ml' | 'systems'>('all');
  const [certSearch, setCertSearch] = useState('');
  const [certCategory, setCertCategory] = useState<'all' | 'cloud' | 'ai-ml' | 'programming' | 'general'>('all');
  
  // Terminal Emulator State
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "manishchaudhury@cloud-node-01:~$ systemctl status manish-portfolio",
    "● manish-portfolio.service - Manish Chaudhury Backend Developer Portfolio Server",
    "   Loaded: loaded (/etc/systemd/system/manish-portfolio.service; enabled; vendor preset: enabled)",
    "   Active: active (running) since " + new Date("2026-06-05T06:27:26Z").toLocaleDateString() + " as ongoing",
    "   Main PID: 3000 (node)",
    "   Tasks: 7 (limit: 4915)",
    "   Memory: 78.4M",
    "   CGroup: /system.slice/manish-portfolio.service",
    "           └─3000 node dist/server.cjs",
    "",
    "🚀 Welcome! Try typing 'help', 'about', 'experience', 'skills', or 'clear' below."
  ]);
  const terminalBottomRef = useRef<HTMLDivElement>(null);



  // Terminal commands interpreter
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...terminalLogs, `manishchaudhury@cloud-node-01:~$ ${terminalInput}`];

    switch (cmd) {
      case 'help':
        newLogs.push(
          "Available terminal commands:",
          "  about         - Interactive bio synopsis",
          "  experience    - Render current Sembark travel software engineering records",
          "  skills        - List technical architecture disciplines",
          "  projects      - Display current ongoing deployment pipelines",
          "  clear         - Clear output records",
          "  sudo admin    - Trigger cloud infrastructure credentials injection"
        );
        break;
      case 'about':
        newLogs.push(
          `Bio: ${userProfile.bio}`,
          `Contact: ${userProfile.email} | ${userProfile.phone}`
        );
        break;
      case 'experience':
        const currentExp = experiences.find(e => e.id === 'sembark');
        if (currentExp) {
          newLogs.push(
            `Role: ${currentExp.role} @ ${currentExp.company}`,
            `Period: ${currentExp.period}`,
            `Highlights:`,
            ...currentExp.highlights.map(h => `  - ${h}`)
          );
        }
        break;
      case 'skills':
        skillsList.forEach(cat => {
          newLogs.push(` [${cat.name}] :: ${cat.skills.join(', ')}`);
        });
        break;
      case 'projects':
        projectsList.forEach(p => {
          newLogs.push(` - ${p.title} (${p.date}) [${p.techStack.join('/')}]`);
        });
        break;
      case 'clear':
        setTerminalLogs([]);
        setTerminalInput('');
        return;
      case 'sudo admin':
        newLogs.push(
          "🔒 SECURITY ALERT: VERIFYING MASTER HANDSHAKE...",
          "  Deploying: Cloud Run Service :: Completed successfully",
          "  Status: Connection active to Secure Vault Services",
          "  Telemetry Status Flag: GREEN"
        );
        break;
      default:
        newLogs.push(`Command not found: '${cmd}'. Type 'help' to see all valid commands.`);
    }

    setTerminalLogs(newLogs);
    setTerminalInput('');
    setTimeout(() => terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const executeShortcut = (cmd: string) => {
    setTerminalInput(cmd);
    setTimeout(() => {
      const buttonSubmitEvent = new Event('submit') as any;
      const form = document.getElementById('terminal-form');
      if (form) {
        form.dispatchEvent(buttonSubmitEvent);
      }
    }, 50);
  };

  // Filter computations
  const filteredProjects = projectsList.filter(p => {
    if (projectFilter === 'all') return true;
    return p.category === projectFilter;
  });

  const filteredCerts = certifications.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(certSearch.toLowerCase()) || 
                          c.issuer.toLowerCase().includes(certSearch.toLowerCase());
    const matchesCategory = certCategory === 'all' || c.category === certCategory;
    return matchesSearch && matchesCategory;
  });

  // Dynamically assign icon components
  const renderSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <Code className={`w-5 h-5 ${accentText}`} id="icon-code" />;
      case 'Globe': return <Globe className={`w-5 h-5 ${accentText}`} id="icon-globe" />;
      case 'Brain': return <Brain className={`w-5 h-5 ${accentText}`} id="icon-brain" />;
      case 'Cpu': return <Cpu className={`w-5 h-5 ${accentText}`} id="icon-cpu" />;
      case 'BarChart': return <BarChart className={`w-5 h-5 ${accentText}`} id="icon-barchart" />;
      case 'TrendingUp': return <TrendingUp className={`w-5 h-5 ${accentText}`} id="icon-trendingup" />;
      case 'Server': return <Server className={`w-5 h-5 ${accentText}`} id="icon-server" />;
      default: return <Code2 className="w-5 h-5 text-slate-400" id="icon-default" />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-[#2dd4bf]/20 selection:text-[#2dd4bf] relative overflow-x-hidden ${
      isDarkMode ? "bg-[#050505] text-white" : "bg-slate-50 text-slate-800"
    }`} id="root-portfolio">
      {/* Heavy Cyber/Muted background lines */}
      <div className={`absolute inset-0 bg-[linear-gradient(to_right,rgba(${isDarkMode ? "255,255,255,0.02" : "15,23,42,0.02"})_1px,transparent_1px),linear-gradient(to_bottom,rgba(${isDarkMode ? "255,255,255,0.02" : "15,23,42,0.02"})_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none`} />
      
      {/* Floating abstract glowing backdrops matching the Teal layout accent */}
      <div className={`absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br ${
        isDarkMode ? "from-[#2dd4bf]/10" : "from-[#0d9488]/5"
      } to-transparent blur-[80px] pointer-events-none`} />

      {/* HEADER BAR (Minimal border-bottom & stark elements) */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
        isDarkMode ? "bg-[#050505]/95 border-white/10" : "bg-white/95 border-slate-200"
      } py-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`} id="portfolio-header">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="name-block">
            <h1 className={`text-4xl sm:text-5xl font-black tracking-tighter leading-none uppercase select-none transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}>
              Manish Chaudhury
            </h1>
            <p className={`text-xs tracking-[0.2em] font-semibold uppercase mt-1 transition-colors duration-300 ${accentText}`}>
              B.Tech Computer Science & Engineering • Data Science
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-[#666666]" id="contact-panel-links">
              <div className={`flex items-center gap-1.5 transition ${isDarkMode ? "hover:text-white" : "hover:text-slate-900"}`}>
                <Mail className={`w-3.5 h-3.5 ${accentText}`} />
                <a href={`mailto:${userProfile.email}`}>{userProfile.email}</a>
              </div>
              <div className={`flex items-center gap-1.5 transition ${isDarkMode ? "hover:text-white" : "hover:text-slate-900"}`}>
                <Phone className="w-3.5 h-3.5 text-[#666666]" />
                <a href={`tel:${userProfile.phone.replace(/\D/g, '')}`}>{userProfile.phone}</a>
              </div>
              <div className={`flex items-center gap-1.5 transition ${isDarkMode ? "hover:text-[#2dd4bf]" : "hover:text-[#0d9488]"}`}>
                <Github className="w-3.5 h-3.5" />
                <a href={userProfile.github} target="_blank" rel="noopener noreferrer">github.com/manishchaudhury111222</a>
              </div>
              <div className={`flex items-center gap-1.5 transition ${isDarkMode ? "hover:text-[#2dd4bf]" : "hover:text-[#0d9488]"}`}>
                <Linkedin className={`w-3.5 h-3.5 ${accentText}`} />
                <a href={userProfile.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/manish-chaudhury</a>
              </div>
            </div>

            {/* Premium Animated Theme Switcher Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-white/5 hover:bg-white/10 text-[#2dd4bf] border border-white/10' 
                  : 'bg-slate-100 hover:bg-slate-200 text-[#0d9488] border border-slate-200'
              } flex items-center justify-center relative overflow-hidden`}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              id="theme-toggler"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDarkMode ? 'dark' : 'light'}
                  initial={{ y: -20, opacity: 0, rotate: -45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5 flex items-center justify-center"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN PORTFOLIO PANELS */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="portfolio-main">
        
        {/* HERO GRID SECTION - GIANT DISPLAY STATEMENTS & THREE TOPOLOGY */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" id="hero-grid">
          {/* Left Column: Glass Title Card */}
          <div className={`lg:col-span-5 flex flex-col justify-between rounded-2xl p-8 relative overflow-hidden h-full min-h-[460px] transition-all duration-300 border ${
            isDarkMode 
              ? "bg-white/[0.03] border-white/10" 
              : "bg-white border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
          }`}>
            {/* Radial glow background built into card */}
            <div className={`absolute right-[-40px] top-[-40px] w-[260px] h-[260px] blur-[50px] pointer-events-none transition-colors duration-300 ${
              isDarkMode ? "bg-[#2dd4bf]/10" : "bg-[#14b8a6]/5"
            }`} />

            <div className="space-y-6">
              <span className={`text-[10px] border px-3 py-1 rounded font-mono uppercase tracking-widest block w-fit transition-all duration-300 ${
                isDarkMode ? "bg-white/[0.05] border-white/10 text-white" : "bg-slate-100 border-slate-200 text-slate-800"
              }`}>
                System Active • Status: Green
              </span>

              <h2 className={`text-6xl sm:text-7xl font-black tracking-tight leading-[0.85] uppercase transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}>
                BUILDING<br/>
                INTELLIGENT<br/>
                <span className={accentText}>INFRA.</span>
              </h2>

              <p className={`text-xs sm:text-sm leading-relaxed max-w-md font-sans transition-colors duration-300 ${
                isDarkMode ? "text-[#666666]" : "text-slate-500"
              }`}>
                Engineering high-performance PHP, Node and Python backends and data-driven cloud solutions with a precise focus on cloud-native architectures, scalable APIs, and advanced machine learning models.
              </p>
            </div>

            {/* Quick Location & Status metadata */}
            <div className={`mt-8 pt-6 border-t flex items-center justify-between text-[11px] font-mono transition-colors duration-300 ${
              isDarkMode ? "border-white/5 text-[#666666]" : "border-slate-100 text-slate-400"
            }`}>
              <span className="flex items-center gap-1.5"><MapPin className={`w-3.5 h-3.5 ${accentText}`} /> Guwahati / Meerut, IN</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> B.Tech CSE (2022 - 2026)</span>
            </div>
          </div>

          {/* Right Column: 3D Connected Topology Mesh Engine */}
          <div className="lg:col-span-7 h-full">
            <ThreeCanvas isDarkMode={isDarkMode} />
          </div>
        </section>

        {/* REVOLUTIONARY BACKEND DEV CARDS (HIGH-CONTRAST ACCENT SPOTLIGHT ON SEMBARK) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6" id="spotlight-and-stats">
          
          {/* CURRENT JOB BLOCK: Filled with Solid Accent Color to anchor the page */}
          <div className={`md:col-span-6 rounded-2xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group transition-all duration-300 ${
            isDarkMode 
              ? "bg-[#2dd4bf] text-[#050505]" 
              : "bg-[#0d9488] text-white"
          }`}>
            {/* Dark details decoration */}
            <div className="absolute bottom-[-20%] right-[-10%] opacity-15 pointer-events-none">
              <Command className={`w-48 h-48 ${isDarkMode ? "text-[#050505]" : "text-white"}`} />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] uppercase font-bold tracking-[0.2em] border px-3 py-1 rounded inline-block ${
                  isDarkMode ? "border-[#050505]/20 text-[#050505]" : "border-white/20 text-white"
                }`}>
                  Current Tenure
                </span>
                <span className={`text-[10px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 rounded ${
                  isDarkMode ? "text-[#050505] bg-white/20" : "text-teal-600 bg-white"
                }`}>
                  Since Jan 2026
                </span>
              </div>

              <div>
                <h3 className="text-4xl font-extrabold tracking-tighter uppercase leading-none mt-2">
                  Backend Developer
                </h3>
                <p className="text-sm font-semibold tracking-wide font-mono mt-1 opacity-90">
                  Sembark Travel Software • On-site / Jaipur
                </p>
              </div>

              <p className="text-xs leading-relaxed font-sans opacity-95">
                Leading infrastructure optimizations, implementing modular APIs, writing scalable server controllers, optimizing database reservation processing, and orchestrating backend services pipelines for robust performance.
              </p>
            </div>

            <div className={`mt-6 pt-5 border-t flex flex-wrap gap-1.5 ${isDarkMode ? 'border-[#050505]/10' : 'border-white/10'}`}>
              {["PHP", "Laravel", "REST APIs", "SQL", "AI"].map((tag) => (
                <span key={tag} className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                  isDarkMode 
                    ? "bg-[#050505]/10 border-[#050505]/10 text-[#050505]" 
                    : "bg-white/10 border-white/10 text-white"
                }`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* SEMBARK ACHIEVEMENTS DETAIL PANEL */}
          <div className={`md:col-span-6 border rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
            isDarkMode 
              ? "bg-white/[0.03] border-white/10" 
              : "bg-white border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
          }`}>
            <div className="space-y-4">
              <span className={`text-[10px] font-mono tracking-widest uppercase block ${accentText}`}>
                Technical Highlights & API Contributions
              </span>
              <h4 className={`text-xl font-bold uppercase tracking-tight transition-colors duration-300 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                Architectural Milestones
              </h4>
              
              <div className="space-y-3 pt-2">
                {experiences[0].highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2.5 items-start text-xs font-sans">
                    <span className={`${accentText} font-mono shrink-0 select-none mt-0.5`}>■</span>
                    <p className={`leading-relaxed transition-colors duration-300 ${isDarkMode ? "text-white/80" : "text-slate-600"}`}>{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`mt-4 pt-4 border-t text-[10px] font-mono flex items-center justify-between transition-colors duration-300 ${
              isDarkMode ? "border-white/5 text-[#666666]" : "border-slate-100 text-slate-400"
            }`}>
              <span>Environment: PRODUCTION CLUSTER</span>
              <span className={accentText}>TELEMETRY OK</span>
            </div>
          </div>
        </section>

        {/* INTERACTIVE WORKSPACE TABS SELECTOR */}
        <section className="space-y-6" id="workspace-tabs-menu">
          
          {/* Main selection rails with stark modern layout */}
          <div className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b pb-4 transition-colors duration-300 ${
            isDarkMode ? "border-white/10" : "border-slate-200"
          }`}>
            <div className={`flex flex-wrap gap-2 p-1 border rounded-xl transition-all duration-300 ${
              isDarkMode ? "bg-white/[0.02] border-white/10" : "bg-slate-50 border-slate-200"
            }`}>
              <button 
                onClick={() => setActiveTab('about')}
                className={`px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  activeTab === 'about' 
                    ? `${accentBg} text-${isDarkMode ? '[#050505]' : 'white'} font-bold shadow-lg` 
                    : `text-[#666666] hover:text-${isDarkMode ? 'white' : 'slate-900'}`
                }`}
              >
                Career Profile
              </button>
              <button 
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  activeTab === 'projects' 
                    ? `${accentBg} text-${isDarkMode ? '[#050505]' : 'white'} font-bold shadow-lg` 
                    : `text-[#666666] hover:text-${isDarkMode ? 'white' : 'slate-900'}`
                }`}
              >
                Projects ({projectsList.length})
              </button>
              <button 
                onClick={() => setActiveTab('skills')}
                className={`px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  activeTab === 'skills' 
                    ? `${accentBg} text-${isDarkMode ? '[#050505]' : 'white'} font-bold shadow-lg` 
                    : `text-[#666666] hover:text-${isDarkMode ? 'white' : 'slate-900'}`
                }`}
              >
                Arsenal Matrix
              </button>
              <button 
                onClick={() => setActiveTab('certifications')}
                className={`px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  activeTab === 'certifications' 
                    ? `${accentBg} text-${isDarkMode ? '[#050505]' : 'white'} font-bold shadow-lg` 
                    : `text-[#666666] hover:text-${isDarkMode ? 'white' : 'slate-900'}`
                }`}
              >
                Credentials ({certifications.length})
              </button>
            </div>

            <span className="text-[10px] font-mono text-[#666666] uppercase tracking-widest block">
              SYSTEM CONFIG: STACK-VITE // 2026
            </span>
          </div>

          {/* TAB 1: WORK CHRONOLOGY & INTERACTIVE TERMINAL */}
          {activeTab === 'about' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in" id="about-workspace-block">
              {/* Left timeline section */}
              <div className="lg:col-span-7 space-y-6">
                <div className={`border rounded-2xl p-6 transition-all duration-300 ${
                  isDarkMode ? "bg-white/[0.03] border-white/10" : "bg-white border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                }`}>
                  <h3 className={`text-xl font-bold uppercase mb-6 tracking-tight flex items-center gap-2 transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}>
                    <Layers className={`w-5 h-5 ${accentText}`} />
                    Work Chronicle
                  </h3>

                  <div className={`relative border-l pl-6 ml-2.5 space-y-8 transition-colors duration-300 ${
                    isDarkMode ? "border-white/10" : "border-slate-200"
                  }`}>
                    {experiences.map((exp) => (
                      <div key={exp.id} className="relative group/timeline">
                        {/* Bullet point nodes */}
                        <div className={`absolute left-[-31px] top-1.5 w-3 h-3 rounded-full border-2 transition-all ${
                          exp.current 
                            ? `${accentBg} ${isDarkMode ? "border-[#2dd4bf]" : "border-[#0d9488]"} shadow-[0_0_10px_rgba(45,212,191,0.6)]` 
                            : `bg-transparent ${isDarkMode ? "border-white/20" : "border-slate-300"} group-hover/timeline:border-[#2dd4bf]`
                        }`} />

                        <div className={`space-y-2 p-5 rounded-xl border transition-all duration-300 ${
                          isDarkMode 
                            ? "bg-white/[0.01] border-white/5 hover:border-white/10" 
                            : "bg-slate-50/50 border-slate-100 hover:border-slate-250/80"
                        }`}>
                          <div className="flex flex-wrap items-center justify-between gap-2.5">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#666666]">
                              {exp.period}
                            </span>
                            <span className={`text-[9px] font-mono tracking-widest uppercase border px-2.5 py-0.5 rounded transition-all duration-300 ${
                              isDarkMode 
                                ? "border-white/10 text-[#2dd4bf] bg-[#2dd4bf]/5" 
                                : "border-slate-200/60 text-[#0d9488] bg-[#0d9488]/5"
                            }`}>
                              {exp.type}
                            </span>
                          </div>

                          <h4 className={`text-lg font-bold uppercase font-sans mt-1 transition-colors duration-300 ${
                            isDarkMode ? "text-white" : "text-slate-900"
                          }`}>
                            {exp.role}
                          </h4>
                          <p className="text-xs font-mono text-[#666666]">
                            {exp.company} {exp.location ? `• ${exp.location}` : ''}
                          </p>

                          <ul className={`space-y-1.5 mt-3 pt-3 border-t transition-colors duration-300 ${
                            isDarkMode ? "border-white/5" : "border-slate-100"
                          }`}>
                            {exp.highlights.map((h, i) => (
                              <li key={i} className={`text-xs leading-relaxed font-sans flex items-start gap-2.5 transition-colors duration-300 ${
                                isDarkMode ? "text-[#ffffff]/70" : "text-slate-600"
                              }`}>
                                <span className={`${accentText} mt-1 shrink-0`}>•</span>
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>

                          {exp.techStack && (
                            <div className="flex flex-wrap gap-1 mt-4">
                              {exp.techStack.map(stack => (
                                <span key={stack} className={`text-[9px] font-mono border px-2 py-0.5 rounded uppercase transition-colors duration-300 ${
                                  isDarkMode 
                                    ? "text-[#ffffff]/60 bg-white/5 border-white/5" 
                                    : "text-slate-600 bg-slate-100 border-slate-200/60"
                                }`}>
                                  {stack}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column: Education timeline & interactive console shell */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Academic credentials */}
                <div className={`border rounded-2xl p-6 transition-all duration-300 ${
                  isDarkMode ? "bg-white/[0.03] border-white/10" : "bg-white border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                }`}>
                  <h3 className={`text-xl font-bold uppercase mb-5 tracking-tight flex items-center gap-2 transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}>
                    <GraduationCap className={`w-5 h-5 ${accentText}`} />
                    Academic Foundation
                  </h3>

                  <div className="space-y-4">
                    {educationList.map((edu, idx) => (
                      <div key={idx} className={`p-4 rounded-xl border transition-all duration-300 ${
                        isDarkMode 
                          ? "bg-white/[0.01] border-white/5 hover:border-white/10" 
                          : "bg-slate-50/50 border-slate-100 hover:border-slate-200"
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-[#666666]">{edu.period}</span>
                          <span className={`text-xs font-mono font-bold border px-2 py-0.5 rounded transition-all duration-300 ${
                            isDarkMode 
                              ? "text-[#2dd4bf] bg-[#2dd4bf]/5 border-[#2dd4bf]/20" 
                              : "text-[#0d9488] bg-[#0d9488]/5 border-[#0d9488]/20"
                          }`}>{edu.score}</span>
                        </div>
                        <h4 className={`text-sm font-bold uppercase mt-2 leading-tight transition-colors duration-300 ${
                          isDarkMode ? "text-white" : "text-slate-800"
                        }`}>
                          {edu.degree}
                        </h4>
                        <p className="text-xs font-mono text-[#666666] mt-1">
                          {edu.institution}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cyber interface: Shell console widget (Always dark console core styled with dark/light border adaptation) */}
                <div className={`border rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
                  isDarkMode ? "bg-[#050505] border-white/10" : "bg-[#0b0c13] border-slate-300/80"
                }`} id="terminal-widget">
                  {/* Title block */}
                  <div className="bg-white/[0.02] py-2.5 px-4 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      <span className="text-[9px] font-mono text-slate-400 ml-2 uppercase">ssh manishchaudhury@cloud-node-01</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#2dd4bf]">PORT: 3000</span>
                  </div>

                  {/* Terminal scroll */}
                  <div className="p-4 h-64 overflow-y-auto space-y-2 font-mono text-xs text-white/90">
                    {terminalLogs.map((log, lIdx) => (
                      <p key={lIdx} className="leading-relaxed whitespace-pre-wrap">
                        {log}
                      </p>
                    ))}
                    <div ref={terminalBottomRef} />
                  </div>

                  {/* Quick terminal execute links */}
                  <div className="p-2 border-t border-white/5 bg-white/[0.01] flex flex-wrap gap-1">
                    <button onClick={() => executeShortcut('help')} className="text-[9px] font-mono uppercase bg-white/[0.03] hover:bg-white/[0.06] text-slate-400 hover:text-white px-2.5 py-1 rounded border border-white/5 transition">
                      cat help.txt
                    </button>
                    <button onClick={() => executeShortcut('about')} className="text-[9px] font-mono uppercase bg-white/[0.03] hover:bg-white/[0.06] text-slate-400 hover:text-white px-2.5 py-1 rounded border border-white/5 transition">
                      cat bio.md
                    </button>
                    <button onClick={() => executeShortcut('experience')} className="text-[9px] font-mono uppercase bg-white/[0.03] hover:bg-white/[0.06] text-slate-400 hover:text-white px-2.5 py-1 rounded border border-white/5 transition">
                      cat sembark.json
                    </button>
                    <button onClick={() => executeShortcut('skills')} className="text-[9px] font-mono uppercase bg-white/[0.03] hover:bg-white/[0.06] text-slate-400 hover:text-white px-2.5 py-1 rounded border border-white/5 transition">
                      ls skills/
                    </button>
                  </div>

                  {/* Submit shell input */}
                  <form onSubmit={handleTerminalSubmit} id="terminal-form" className="flex items-center gap-2 p-3 bg-white/[0.01] border-t border-white/10">
                    <span className="text-[#2dd4bf] text-xs font-mono shrink-0">$</span>
                    <input 
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      placeholder="Type terminal command (clear, help, sudo admin)..."
                      className="w-full bg-transparent text-white outline-none text-xs font-mono placeholder-slate-500"
                    />
                    <button type="submit" className={`text-[10px] font-mono uppercase text-[#050505] px-3 py-1 rounded transition font-bold ${accentBg}`}>
                      EXEC
                    </button>
                  </form>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS DISPLAY GRID */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-fade-in" id="projects-workspace-block">
              {/* Category selector switches */}
              <div className={`flex flex-wrap gap-1 border p-1 rounded-xl w-fit transition-colors duration-300 ${
                isDarkMode ? "bg-white/[0.02] border-white/10" : "bg-slate-50 border-slate-200"
              }`}>
                <button 
                  onClick={() => setProjectFilter('all')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition duration-200 ${
                    projectFilter === 'all' 
                      ? `${accentBg} text-${isDarkMode ? '[#050505]' : 'white'} font-bold shadow` 
                      : `text-[#666666] hover:text-${isDarkMode ? 'white' : 'slate-900'}`
                  }`}
                >
                  All Pipelines ({projectsList.length})
                </button>
                <button 
                  onClick={() => setProjectFilter('ml')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition duration-200 ${
                    projectFilter === 'ml' 
                      ? `${accentBg} text-${isDarkMode ? '[#050505]' : 'white'} font-bold shadow` 
                      : `text-[#666666] hover:text-${isDarkMode ? 'white' : 'slate-900'}`
                  }`}
                >
                  AI Models ({projectsList.filter(p => p.category === 'ml').length})
                </button>
                <button 
                  onClick={() => setProjectFilter('web')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition duration-200 ${
                    projectFilter === 'web' 
                      ? `${accentBg} text-${isDarkMode ? '[#050505]' : 'white'} font-bold shadow` 
                      : `text-[#666666] hover:text-${isDarkMode ? 'white' : 'slate-900'}`
                  }`}
                >
                  Web Platforms ({projectsList.filter(p => p.category === 'web').length})
                </button>
                <button 
                  onClick={() => setProjectFilter('systems')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition duration-200 ${
                    projectFilter === 'systems' 
                      ? `${accentBg} text-${isDarkMode ? '[#050505]' : 'white'} font-bold shadow` 
                      : `text-[#666666] hover:text-${isDarkMode ? 'white' : 'slate-900'}`
                  }`}
                >
                  System Tools ({projectsList.filter(p => p.category === 'systems').length})
                </button>
              </div>

              {/* Bento Grid layout with design colors */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="projects-bento-grid">
                {filteredProjects.map((project) => (
                  <div 
                    key={project.id} 
                    className={`group border transition-all duration-300 rounded-2xl p-6 shadow-xl flex flex-col justify-between ${
                      isDarkMode 
                        ? "bg-white/[0.03] border-white/10 hover:border-[#2dd4bf]/40" 
                        : "bg-white border-slate-200/80 hover:border-[#0d9488]/40 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Top labels */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase text-[#666666]">
                          {project.date}
                        </span>
                        
                        {project.demoUrl ? (
                          <a 
                            href={project.demoUrl} 
                            target="_blank"  
                            rel="noopener noreferrer" 
                            className={`text-[10px] uppercase flex items-center gap-1.5 px-2.5 py-0.5 rounded border font-mono transition-all duration-300 ${
                              isDarkMode 
                                ? "text-[#2dd4bf] bg-[#2dd4bf]/10 border-[#2dd4bf]/20 hover:bg-[#2dd4bf]/20" 
                                : "text-[#0d9488] bg-[#0d9488]/10 border-[#0d9488]/25 hover:bg-[#0d9488]/20"
                            }`}
                            id={`demo-btn-${project.id}`}
                          >
                            Live Demo
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ) : (
                          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded transition-all duration-300 ${
                            isDarkMode ? "text-[#666666] bg-white/5" : "text-slate-400 bg-slate-100"
                          }`}>
                            Host: Local Node
                          </span>
                        )}
                      </div>

                      {/* Title headings */}
                      <div>
                        <div className={`text-[9px] uppercase font-mono tracking-widest font-bold ${accentText}`}>
                          {project.category === 'ml' ? 'Prediction Inference Core' : project.category === 'web' ? 'Fullstack Client Portal' : 'Hardware Vector Interface'}
                        </div>
                        <h4 className={`text-xl font-black uppercase tracking-tight mt-1 transition-colors duration-300 ${
                          isDarkMode ? "text-white group-hover:text-[#2dd4bf]" : "text-slate-900 group-hover:text-[#0d9488]"
                        }`}>
                          {project.title}
                        </h4>
                        <span className="text-[10px] font-mono text-[#666666] mt-0.5 block">
                          {project.type}
                        </span>
                      </div>

                      {/* Blurb */}
                      <p className={`text-xs leading-relaxed font-sans transition-colors duration-300 ${
                        isDarkMode ? "text-white/70" : "text-slate-600"
                      }`}>
                        {project.description}
                      </p>

                      {/* Detail points */}
                      {project.bullets && (
                        <div className={`space-y-2 pt-3 border-t transition-colors duration-300 ${
                          isDarkMode ? "border-white/5" : "border-slate-100"
                        }`}>
                          {project.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className={`text-xs font-sans flex items-start gap-2 leading-relaxed transition-colors duration-300 ${
                              isDarkMode ? "text-white/60" : "text-slate-500"
                            }`}>
                              <span className={`${accentText} shrink-0 select-none mt-1`}>▪</span>
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Tags block */}
                    <div className={`flex flex-wrap gap-1.5 mt-6 pt-4 border-t transition-colors duration-300 ${
                      isDarkMode ? "border-white/5" : "border-slate-100"
                    }`}>
                      {project.techStack.map(stack => (
                        <span key={stack} className={`text-[9px] font-mono uppercase border px-2 py-1 rounded transition-colors duration-300 ${
                          isDarkMode 
                            ? "text-[#ffffff]/60 bg-white/5 border-white/5" 
                            : "text-slate-600 bg-slate-50 border-slate-150"
                        }`}>
                          {stack}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS GRID */}
          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in" id="skills-workspace-block">
              {skillsList.map((category, catIdx) => (
                <div 
                  key={catIdx} 
                  className={`border rounded-2xl p-6 shadow-xl transition-all duration-300 ${
                    isDarkMode 
                      ? "bg-white/[0.03] border-white/10" 
                      : "bg-white border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                  }`}
                >
                  <div className={`flex items-center gap-3.5 mb-5 pb-3 border-b transition-colors duration-300 ${
                    isDarkMode ? "border-white/5" : "border-slate-100"
                  }`}>
                    <div className={`p-2.5 rounded-xl border shrink-0 transition-all duration-300 ${
                      isDarkMode ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100"
                    }`}>
                      {renderSkillIcon(category.icon)}
                    </div>
                    <div>
                      <h4 className={`text-sm font-black uppercase tracking-tight transition-colors duration-300 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                        {category.name}
                      </h4>
                      <span className="text-[9px] font-mono text-[#666666] uppercase block mt-0.5">
                        DISCIPLINE RATIO: SECURED ({category.skills.length})
                      </span>
                    </div>
                  </div>

                  {/* Badges block */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className={`text-xs font-mono font-medium transition px-2.5 py-1.5 rounded-lg flex items-center gap-2 border ${
                          isDarkMode 
                            ? "text-slate-300 bg-white/[0.01] hover:bg-white/5 border-white/5 hover:border-white/10" 
                            : "text-slate-700 bg-slate-50 hover:bg-slate-100 border-slate-200/60 hover:border-slate-200"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                          isDarkMode ? "bg-[#2dd4bf]" : "bg-[#0d9488]"
                        }`} />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: CERTIFICATIONS CATALOUGE */}
          {activeTab === 'certifications' && (
            <div className="space-y-6 animate-fade-in" id="certifications-workspace-block">
              {/* Search filter panel built perfectly with Bold design */}
              <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border p-4 rounded-2xl shadow-xl transition-all duration-300 ${
                isDarkMode ? "bg-white/[0.03] border-white/10" : "bg-white border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
              }`}>
                
                <div className="relative w-full sm:max-w-md">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#666666]" />
                  <input 
                    type="text" 
                    placeholder="Search credentials (Issuer, keyword, domain)..."
                    value={certSearch}
                    onChange={(e) => setCertSearch(e.target.value)}
                    className={`w-full border rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono outline-none transition-colors duration-300 ${
                      isDarkMode 
                        ? "bg-[#050505] border-white/10 text-white focus:border-[#2dd4bf] focus:ring-1 focus:ring-[#2dd4bf]/20" 
                        : "bg-slate-50 border-slate-200 text-slate-800 focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488]/20"
                    }`}
                    id="cert-search-input"
                  />
                  {certSearch && (
                    <button onClick={() => setCertSearch('')} className="absolute right-3.5 top-3 text-[#666666] hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className={`flex flex-wrap gap-1 border p-1 rounded-xl transition-all duration-300 ${
                  isDarkMode ? "bg-white/[0.02] border-white/10" : "bg-slate-50 border-slate-200"
                }`}>
                  <button 
                    onClick={() => setCertCategory('all')} 
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition ${
                      certCategory === 'all' 
                        ? `${accentBg} text-${isDarkMode ? '[#050505]' : 'white'} font-bold` 
                        : 'text-[#666666] hover:text-slate-800 dark:hover:text-white border border-transparent'
                    }`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setCertCategory('cloud')} 
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition ${
                      certCategory === 'cloud' 
                        ? `${accentBg} text-${isDarkMode ? '[#050505]' : 'white'} font-bold` 
                        : 'text-[#666666] hover:text-slate-800 dark:hover:text-white border border-transparent'
                    }`}
                  >
                    Cloud
                  </button>
                  <button 
                    onClick={() => setCertCategory('ai-ml')} 
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition ${
                      certCategory === 'ai-ml' 
                        ? `${accentBg} text-${isDarkMode ? '[#050505]' : 'white'} font-bold` 
                        : 'text-[#666666] hover:text-slate-800 dark:hover:text-white border border-transparent'
                    }`}
                  >
                    Intel/AI
                  </button>
                  <button 
                    onClick={() => setCertCategory('programming')} 
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition ${
                      certCategory === 'programming' 
                        ? `${accentBg} text-${isDarkMode ? '[#050505]' : 'white'} font-bold` 
                        : 'text-[#666666] hover:text-slate-800 dark:hover:text-white border border-transparent'
                    }`}
                  >
                    Prog
                  </button>
                </div>
              </div>

              {/* Table rendering block */}
              <div className={`border rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
                isDarkMode ? "bg-white/[0.03] border-white/10" : "bg-white border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
              }`}>
                <div className="min-w-full divide-y divide-white/10">
                  {/* Table header row */}
                  <div className={`px-6 py-4 grid grid-cols-12 text-[10px] font-mono uppercase tracking-widest font-bold border-b transition-colors duration-300 ${
                    isDarkMode ? "bg-white/[0.02] border-white/5 text-[#666666]" : "bg-slate-50 border-slate-100 text-slate-400"
                  }`}>
                    <div className="col-span-6 sm:col-span-7">Certification Title / Specialisation</div>
                    <div className="col-span-4 sm:col-span-3 text-left">Issuer</div>
                    <div className="col-span-2 text-right">Term</div>
                  </div>

                  {/* Table lists */}
                  <div className={`divide-y font-sans text-xs transition-colors duration-300 ${
                    isDarkMode ? "divide-white/5" : "divide-slate-100"
                  }`}>
                    {filteredCerts.length > 0 ? (
                      filteredCerts.map((cert, rIdx) => (
                        <div key={rIdx} className={`px-6 py-4 grid grid-cols-12 items-center transition gap-1 sm:gap-0 ${
                          isDarkMode ? "hover:bg-white/[0.02]" : "hover:bg-slate-50"
                        }`}>
                          <div className="col-span-6 sm:col-span-7 flex items-center gap-3">
                            <Award className={`w-4 h-4 shrink-0 ${accentText}`} />
                            <div>
                              <span className={`font-bold block sm:inline font-sans uppercase tracking-tight transition-colors duration-300 ${
                                isDarkMode ? "text-white" : "text-slate-850"
                              }`}>{cert.name}</span>
                              <span className={`text-[8px] tracking-widest uppercase font-mono ml-0 sm:ml-3 px-2 py-0.5 rounded border inline-block mt-0.5 sm:mt-0 transition-colors duration-300 ${
                                isDarkMode 
                                  ? "border-[#2dd4bf]/20 text-[#2dd4bf] bg-[#2dd4bf]/5" 
                                  : "border-[#0d9488]/20 text-[#0d9488] bg-[#0d9488]/5"
                              }`}>
                                {cert.category}
                              </span>
                            </div>
                          </div>
                          <div className="col-span-4 sm:col-span-3 font-mono text-[#666666] uppercase text-[11px]">{cert.issuer}</div>
                          <div className={`col-span-2 text-right font-mono font-bold ${accentText}`}>{cert.year}</div>
                        </div>
                      ))
                    ) : (
                      <div className="p-12 text-center text-[#666666] font-mono text-xs">
                        ⚠️ No records found matching description parameters.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* BOTTOM METRIC TELEMETRY FOOTER (BOLD MINIMALIST) */}
        <footer className={`border-t pt-8 pb-16 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#666666] gap-4 transition-colors duration-300 ${
          isDarkMode ? "border-white/10" : "border-slate-200"
        }`} id="portfolio-footer">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full animate-ping ${isDarkMode ? "bg-[#2dd4bf]" : "bg-[#0d9488]"}`} />
            <span>METRIC DEPLOYMENT TARGET: CLOUD RUN ACTIVE</span>
          </div>
          <div className="text-right">
            <span>© 2026 {userProfile.name} • BACKEND PORTFOLIO ARCHITECTURE</span>
          </div>
        </footer>

      </main>
    </div>
  );
}
