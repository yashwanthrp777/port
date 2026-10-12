import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  Copy,
  Check,
  Lightbulb,
  ExternalLink,
  Plus,
  Trash2,
  RotateCcw,
  Sparkles,
  Cloud,
  Terminal,
  Code2,
  Layers,
  GraduationCap,
  X,
  ArrowUpRight,
  Send,
} from 'lucide-react'
import {
  CONFIG,
  INITIAL_SKILLS,
  INITIAL_PROJECTS,
  EDUCATION,
} from './data.js'

export default function Portfolio({ onRelight, muted, onToggleMute }) {
  // State for skills and projects with localStorage persistence
  const [skills, setSkills] = useState(() => {
    try {
      const saved = localStorage.getItem('yrp_skills')
      return saved ? JSON.parse(saved) : INITIAL_SKILLS
    } catch {
      return INITIAL_SKILLS
    }
  })

  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('yrp_projects')
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS
    } catch {
      return INITIAL_PROJECTS
    }
  })

  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  // Modals for Adding Skill & Project
  const [showAddSkillModal, setShowAddSkillModal] = useState(false)
  const [showAddProjectModal, setShowAddProjectModal] = useState(false)

  // Form states for new skill
  const [skillCategory, setSkillCategory] = useState('Programming Languages')
  const [newSkillName, setNewSkillName] = useState('')

  // Form states for new project
  const [newProjTitle, setNewProjTitle] = useState('')
  const [newProjCategory, setNewProjCategory] = useState('')
  const [newProjTech, setNewProjTech] = useState('')
  const [newProjPoints, setNewProjPoints] = useState('')
  const [newProjGithub, setNewProjGithub] = useState('')

  // Save to localStorage when skills or projects change
  useEffect(() => {
    try {
      localStorage.setItem('yrp_skills', JSON.stringify(skills))
    } catch {}
  }, [skills])

  useEffect(() => {
    try {
      localStorage.setItem('yrp_projects', JSON.stringify(projects))
    } catch {}
  }, [projects])

  // Copy helpers
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.email)
    } catch {}
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.phone)
    } catch {}
    setCopiedPhone(true)
    setTimeout(() => setCopiedPhone(false), 2000)
  }

  // Handler: Add New Skill
  const handleAddSkill = (e) => {
    e.preventDefault()
    if (!newSkillName.trim()) return

    setSkills((prev) => {
      const currentList = prev[skillCategory] || []
      if (currentList.includes(newSkillName.trim())) return prev
      return {
        ...prev,
        [skillCategory]: [...currentList, newSkillName.trim()],
      }
    })

    setNewSkillName('')
    setShowAddSkillModal(false)
  }

  // Handler: Add New Project
  const handleAddProject = (e) => {
    e.preventDefault()
    if (!newProjTitle.trim()) return

    const techArray = newProjTech
      ? newProjTech.split(',').map((t) => t.trim()).filter(Boolean)
      : ['Custom Tech']

    const pointsArray = newProjPoints
      ? newProjPoints
          .split('\n')
          .map((p) => p.trim())
          .filter(Boolean)
      : ['Custom project implementation and architecture.']

    const newProject = {
      id: Date.now(),
      title: newProjTitle.trim(),
      category: newProjCategory.trim() || 'Software Project',
      tech: techArray,
      points: pointsArray,
      github: newProjGithub.trim() || CONFIG.github,
      demo: null,
    }

    setProjects((prev) => [newProject, ...prev])
    setNewProjTitle('')
    setNewProjCategory('')
    setNewProjTech('')
    setNewProjPoints('')
    setNewProjGithub('')
    setShowAddProjectModal(false)
  }

  // Reset to Resume defaults
  const handleResetData = () => {
    if (window.confirm('Reset skills and projects back to resume defaults?')) {
      setSkills(INITIAL_SKILLS)
      setProjects(INITIAL_PROJECTS)
      localStorage.removeItem('yrp_skills')
      localStorage.removeItem('yrp_projects')
    }
  }

  return (
    <div className="resume-portfolio-shell">
      {/* Clean, Modern Header without Cluttered Top Nav Links */}
      <header className="resume-clean-header">
        <div className="header-identity">
          <div className="avatar-chip">YR</div>
          <div className="identity-text">
            <h1 className="name-heading">{CONFIG.name}</h1>
            <span className="subtitle-tag">
              <span className="live-dot" /> {CONFIG.title}
            </span>
          </div>
        </div>

        {/* Quick Contact & Lamp Switch */}
        <div className="header-right-tools">
          <a
            href={CONFIG.github}
            target="_blank"
            rel="noreferrer"
            className="tool-btn icon-only"
            title="GitHub Profile"
          >
            <Github size={17} />
          </a>
          <a
            href={CONFIG.linkedin}
            target="_blank"
            rel="noreferrer"
            className="tool-btn icon-only"
            title="LinkedIn Profile"
          >
            <Linkedin size={17} />
          </a>
          <button
            onClick={onRelight}
            className="tool-btn lamp-switch-btn"
            title="Switch Back to Lamp Room"
          >
            <Lightbulb size={18} className="bulb-icon" />
            <span>Lamp</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="resume-main-layout">
        {/* Profile Card & Objective Section */}
        <section className="resume-hero-card">
          <div className="hero-top-info">
            <div className="contact-pills-row">
              <span className="info-pill location">
                <MapPin size={13} /> {CONFIG.location}
              </span>
              <a href={`mailto:${CONFIG.email}`} className="info-pill email">
                <Mail size={13} /> {CONFIG.email}
              </a>
              <a href={`tel:${CONFIG.phone}`} className="info-pill phone">
                <Phone size={13} /> {CONFIG.phone}
              </a>
            </div>

            <div className="name-block">
              <h2 className="display-full-name">{CONFIG.name}</h2>
              <p className="headline-role">{CONFIG.title}</p>
            </div>

            {/* Objective from Resume */}
            <div className="objective-box">
              <span className="objective-label">CAREER OBJECTIVE</span>
              <p className="objective-text">{CONFIG.objective}</p>
            </div>

            {/* Action Buttons */}
            <div className="quick-action-strip">
              <a
                href={CONFIG.github}
                target="_blank"
                rel="noreferrer"
                className="action-btn primary"
              >
                <Github size={16} />
                <span>GitHub Profile</span>
                <ArrowUpRight size={14} />
              </a>
              <a
                href={CONFIG.linkedin}
                target="_blank"
                rel="noreferrer"
                className="action-btn secondary"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
                <ArrowUpRight size={14} />
              </a>
              <button onClick={handleCopyEmail} className="action-btn secondary">
                {copiedEmail ? <Check size={16} className="text-gold" /> : <Copy size={16} />}
                <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
              </button>
              <button onClick={handleCopyPhone} className="action-btn secondary">
                {copiedPhone ? <Check size={16} className="text-gold" /> : <Phone size={16} />}
                <span>{copiedPhone ? 'Copied Phone!' : 'Copy Phone'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Technical Skills Section with Feature to Add New Skills */}
        <section className="resume-section">
          <div className="section-title-bar">
            <div>
              <span className="section-tag">EXPERTISE</span>
              <h2 className="section-h2">Technical Skills</h2>
            </div>
            <div className="section-actions-right">
              <button
                className="add-feature-btn"
                onClick={() => setShowAddSkillModal(true)}
              >
                <Plus size={16} />
                <span>Add Skill</span>
              </button>
            </div>
          </div>

          <div className="skills-grid-container">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="skill-cat-card">
                <div className="skill-cat-header">
                  <div className="cat-icon-badge">
                    {category.toLowerCase().includes('cloud') ? (
                      <Cloud size={16} />
                    ) : category.toLowerCase().includes('devops') ? (
                      <Terminal size={16} />
                    ) : (
                      <Code2 size={16} />
                    )}
                  </div>
                  <h3 className="cat-heading">{category}</h3>
                </div>

                <div className="chips-flex-wrap">
                  {items.map((skill) => (
                    <span key={skill} className="skill-chip-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section with Feature to Add New Projects */}
        <section className="resume-section">
          <div className="section-title-bar">
            <div>
              <span className="section-tag">PORTFOLIO</span>
              <h2 className="section-h2">Projects</h2>
            </div>
            <div className="section-actions-right">
              <button
                className="add-feature-btn"
                onClick={() => setShowAddProjectModal(true)}
              >
                <Plus size={16} />
                <span>Add Project</span>
              </button>
            </div>
          </div>

          <div className="projects-list-container">
            {projects.map((proj, idx) => (
              <div key={proj.id || proj.title} className="resume-project-card">
                <div className="project-header-row">
                  <div>
                    <span className="project-index">PROJECT #{idx + 1}</span>
                    <h3 className="project-name">{proj.title}</h3>
                    {proj.category && (
                      <span className="project-category-tag">{proj.category}</span>
                    )}
                  </div>
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      className="project-github-link"
                      title="View on GitHub"
                    >
                      <Github size={15} />
                      <span>Code</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>

                {/* Tech Badges */}
                <div className="project-tech-strip">
                  {proj.tech.map((t) => (
                    <span key={t} className="tech-badge-item">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Bullet Points from Resume */}
                <ul className="project-points-list">
                  {proj.points.map((pt, i) => (
                    <li key={i} className="point-item">
                      <span className="point-bullet" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section from Resume */}
        <section className="resume-section">
          <div className="section-title-bar">
            <div>
              <span className="section-tag">ACADEMIC BACKGROUND</span>
              <h2 className="section-h2">Education</h2>
            </div>
          </div>

          <div className="education-cards-grid">
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="education-box">
                <div className="edu-top">
                  <span className="edu-period">{edu.period}</span>
                  <span className="edu-badge">{edu.type}</span>
                </div>
                <h3 className="edu-degree">{edu.degree}</h3>
                <p className="edu-institution">{edu.institution}</p>
                <div className="edu-score-pill">
                  <Sparkles size={13} />
                  <span>{edu.score}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reset / Customize Helper */}
        <div className="data-control-footer">
          <button onClick={handleResetData} className="reset-data-btn">
            <RotateCcw size={14} />
            <span>Reset Skills & Projects to Resume Default</span>
          </button>
        </div>
      </main>

      {/* Modal: Add New Skill */}
      <AnimatePresence>
        {showAddSkillModal && (
          <div className="modal-backdrop" onClick={() => setShowAddSkillModal(false)}>
            <motion.div
              className="modal-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
            >
              <div className="modal-header">
                <h3>Add Technical Skill</h3>
                <button
                  className="close-modal-btn"
                  onClick={() => setShowAddSkillModal(false)}
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddSkill} className="modal-form">
                <label className="form-field">
                  <span>Skill Category</span>
                  <select
                    value={skillCategory}
                    onChange={(e) => setSkillCategory(e.target.value)}
                    className="form-input"
                  >
                    {Object.keys(skills).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="form-field">
                  <span>Skill Name</span>
                  <input
                    type="text"
                    placeholder="e.g. Kubernetes, TypeScript, GraphQL..."
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    className="form-input"
                    autoFocus
                    required
                  />
                </label>

                <div className="modal-actions">
                  <button
                    type="button"
                    onClick={() => setShowAddSkillModal(false)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Add Skill
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Add New Project */}
      <AnimatePresence>
        {showAddProjectModal && (
          <div className="modal-backdrop" onClick={() => setShowAddProjectModal(false)}>
            <motion.div
              className="modal-card wide"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
            >
              <div className="modal-header">
                <h3>Add New Project</h3>
                <button
                  className="close-modal-btn"
                  onClick={() => setShowAddProjectModal(false)}
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddProject} className="modal-form">
                <label className="form-field">
                  <span>Project Title</span>
                  <input
                    type="text"
                    placeholder="e.g. Distributed Task Queue System"
                    value={newProjTitle}
                    onChange={(e) => setNewProjTitle(e.target.value)}
                    className="form-input"
                    required
                  />
                </label>

                <label className="form-field">
                  <span>Category / Tag</span>
                  <input
                    type="text"
                    placeholder="e.g. Cloud & Microservices"
                    value={newProjCategory}
                    onChange={(e) => setNewProjCategory(e.target.value)}
                    className="form-input"
                  />
                </label>

                <label className="form-field">
                  <span>Technologies (comma separated)</span>
                  <input
                    type="text"
                    placeholder="e.g. Python, Docker, Redis, Celery, AWS"
                    value={newProjTech}
                    onChange={(e) => setNewProjTech(e.target.value)}
                    className="form-input"
                  />
                </label>

                <label className="form-field">
                  <span>GitHub URL</span>
                  <input
                    type="url"
                    placeholder="https://github.com/yashwanthrp777/..."
                    value={newProjGithub}
                    onChange={(e) => setNewProjGithub(e.target.value)}
                    className="form-input"
                  />
                </label>

                <label className="form-field">
                  <span>Key Points / Achievements (one per line)</span>
                  <textarea
                    rows={4}
                    placeholder="Enter project bullet points..."
                    value={newProjPoints}
                    onChange={(e) => setNewProjPoints(e.target.value)}
                    className="form-input textarea"
                  />
                </label>

                <div className="modal-actions">
                  <button
                    type="button"
                    onClick={() => setShowAddProjectModal(false)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Save Project
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Clean Footer */}
      <footer className="resume-footer">
        <p>© {new Date().getFullYear()} {CONFIG.name} · {CONFIG.email} · {CONFIG.phone}</p>
        <p className="footer-loc">{CONFIG.location}</p>
      </footer>
    </div>
  )
}
