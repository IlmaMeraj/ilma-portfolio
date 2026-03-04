import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone,
  MapPin,
  Code, 
  Database, 
  Trophy, 
  Users, 
  GraduationCap, 
  ChevronRight,
  Download,
  Terminal,
  Layers
} from 'lucide-react';
import { AnimatedBackground } from './components/AnimatedBackground';

// --- Resume Data ---
const resumeData = {
  basics: {
    name: "Ilma Meraj",
    title: "Full Stack Developer & AI Engineer",
    location: "New Delhi",
    email: "ilmameraj89@gmail.com",
    phone: "+91 8923619042",
    links: [
      { label: "LinkedIn", url: "https://linkedin.com/in/ilma-meraj-6a60572b0", icon: <Linkedin size={20} /> },
      { label: "GitHub", url: "https://github.com/IlmaMeraj", icon: <Github size={20} /> },
      { label: "LeetCode", url: "https://leetcode.com/Ilma1234", icon: <Code size={20} /> }
    ],
    summary: "Computer Engineering student at Jamia Millia Islamia with a focus on Full Stack Development and Machine Learning. Experienced in building scalable web applications and deep learning models with high accuracy."
  },
  education: [
    {
      institution: "Jamia Millia Islamia",
      degree: "B.Tech. in Computer Engineering",
      info: "CGPA: 8.3",
      year: "2022 - 2026"
    },
    {
      institution: "St. Aloysius College",
      degree: "Class 12",
      info: "Percentage: 94.4%",
     
    },
    {
      institution: "St. Aloysius College",
      degree: "Class 10",
      info: "Percentage: 92.3%",
    
    }
  ],
  projects: [
    {
      title: "Ethereal Jewellery",
      subtitle: "Full Stack E-Commerce Website",
      dates: "Nov 2022 – May 2026",
      stack: ["Node.js", "Express.js", "EJS", "MongoDB", "Cloudinary", "Session", "Bootstrap", "REST APIs"],
      bullets: [
        "Developed a responsive full-stack jewellery e-commerce platform supporting 30+ products with dynamic category filtering, dedicated user profile dashboards, and secure authentication (register/login/logout).",
        "Built scalable RESTful APIs using Express.js, implementing role-based authorization and session-based cart management, using a modular architecture to facilitate debugging and quality assurance.",
        "Implemented secure authentication features including Google OAuth (Passport.js), bcrypt-based password hashing, and custom middleware for route protection (isLoggedIn, isAdmin).",
        "Integrated Cloudinary for secure image uploads and media handling; verified endpoints using Postman and utilized MongoDB Atlas for scalable, cloud-hosted database management to ensure performance and reliability."
      ]
    },
    {
      title: "Facial Expression Detection",
      subtitle: "Deep Learning & Computer Vision",
      dates: "2023",
      stack: ["Python", "TensorFlow", "OpenCV", "Numpy", "Pandas", "Matplotlib"],
      bullets: [
        "Designed and trained a Convolutional Neural Network (CNN) using TensorFlow to classify facial expressions into seven emotion categories (e.g., happy, sad, angry).",
        "Preprocessed and trained the model on the FER-2013 dataset, applying data normalization, label encoding, and data augmentation to improve robustness and overall performance.",
        "Achieved 75% accuracy, with performance evaluated through confusion matrix and training/validation plots.",
        "Enhanced performance using VGG16-based transfer learning, achieving 92% accuracy with improved feature extraction and generalization.",
        "Conducted real-time system testing using OpenCV to verify stability under continuous data flow, focusing on System Monitoring and Performance Evaluation."
      ]
    }
  ],
  skills: {
    languages: ["C++", "C", "Python", "HTML", "CSS", "JavaScript"],
    frameworks: ["Node.js", "Express.js", "React.js", "REST API Development", "MongoDB", "Bootstrap", "TensorFlow", "Scikit-learn", "OpenCV", "Pandas", "NumPy", "Matplotlib"],
    tools: ["MongoDB", "SQL", "MySQL", "Git", "GitHub", "Postman", "VS Code"],
    coursework: ["Data Structures and Algorithms", "Computer Networks", "Object-Oriented Programming (OOP)", "Database Management System", "Operating Systems"]
  },
  achievements: [
    {
      title: "LeetCode Mastery",
      metric: "550+",
      context: "Solved 550+ problems on LeetCode, improving algorithmic thinking and coding proficiency."
    }
  ],
  leadership: [
    {
      role: "Vice President",
      org: "W3B JMI",
      context: "Led 100+ members, organizing 10+ technical events, workshops, and hackathons."
    },
    {
      role: "General Secretary",
      org: "IEEE JMI",
      context: "Led 100+ members, organizing 10+ technical events, workshops, and hackathons."
    }
  ]
};

// --- Components ---

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="text-6xl font-black tracking-tighter text-white">IM</div>
      </motion.div>
      <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-full w-full bg-white"
        />
      </div>
    </motion.div>
  );
};

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl font-bold tracking-tight text-white md:text-5xl"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mt-2 text-white/50"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 60 }}
      viewport={{ once: true }}
      className="mt-4 h-1 bg-white"
    />
  </div>
);

interface Project {
  title: string;
  subtitle: string;
  dates: string;
  stack: string[];
  bullets: string[];
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-white/20"
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
          <p className="text-white/60">{project.subtitle}</p>
          <p className="mt-1 text-sm text-white/40">{project.dates}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 3).map(s => (
            <span key={s} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
              {s}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
              +{project.stack.length - 3}
            </span>
          )}
        </div>
      </div>

      <motion.div 
        animate={{ height: isExpanded ? 'auto' : '0px', opacity: isExpanded ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
          {project.bullets.map((bullet, i) => (
            <div key={i} className="flex gap-3 text-white/70">
              <ChevronRight size={18} className="mt-1 shrink-0 text-white/40" />
              <p className="text-sm leading-relaxed">{bullet}</p>
            </div>
          ))}
          <div className="mt-4 flex flex-wrap gap-2 pt-2">
            {project.stack.map(s => (
              <span key={s} className="rounded-md border border-white/5 bg-white/5 px-2 py-1 text-[10px] text-white/50">
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
      >
        {isExpanded ? 'Show Less' : 'View Details'}
      </button>
    </motion.div>
  );
};

const SkillCategory = ({ title, skills, icon: Icon }: { title: string, skills: string[], icon: any }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
  >
    <div className="mb-4 flex items-center gap-3">
      <div className="rounded-lg bg-white/10 p-2 text-white">
        <Icon size={20} />
      </div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map(skill => (
        <span key={skill} className="rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white">
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (loading) return <SplashScreen onComplete={() => setLoading(false)} />;

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <AnimatedBackground />
      
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 z-50 h-1 origin-left bg-white" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed top-0 z-40 w-full border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-xl font-black tracking-tighter">IM</div>
          <div className="hidden items-center gap-8 text-sm font-medium text-white/60 md:flex">
            <a href="#projects" className="transition-colors hover:text-white">Projects</a>
            <a href="#skills" className="transition-colors hover:text-white">Skills</a>
            <a href="#achievements" className="transition-colors hover:text-white">Achievements</a>
            <a href="#education" className="transition-colors hover:text-white">Education</a>
          </div>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95"
          >
            Contact
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 pt-32">
        {/* Hero Section */}
        <section className="flex min-h-[70vh] flex-col justify-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/60 backdrop-blur-sm">
              <span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Available for Opportunities
            </div>
            <h1 className="text-6xl font-black tracking-tighter md:text-8xl lg:text-9xl">
              {resumeData.basics.name.split(' ')[0]}<br />
              <span className="text-white/40">{resumeData.basics.name.split(' ')[1]}</span>
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/60 md:text-2xl">
              {resumeData.basics.summary}
            </p>
            
            <div className="mt-12 flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-all hover:scale-105"
              >
                View Experience
                <ChevronRight className="transition-transform group-hover:translate-x-1" />
              </button>
              <a 
                href="/resume.pdf" 
                download="Ilma_Meraj_Resume.pdf"
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <Download size={20} />
                Resume
              </a>
            </div>

            <div className="mt-16 flex gap-6">
              {resumeData.basics.links.map(link => (
                <a 
                  key={link.label} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/40 transition-colors hover:text-white"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Impact Strip */}
        <section className="grid grid-cols-1 gap-6 py-20 md:grid-cols-3">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
          >
            <div className="text-5xl font-black text-white">500+</div>
            <div className="mt-2 text-sm font-medium uppercase tracking-widest text-white/40">LeetCode Problems</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
          >
            <div className="text-5xl font-black text-white">92%</div>
            <div className="mt-2 text-sm font-medium uppercase tracking-widest text-white/40">ML Model Accuracy</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
          >
            <div className="text-5xl font-black text-white">100+</div>
            <div className="mt-2 text-sm font-medium uppercase tracking-widest text-white/40">Members Led</div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <SectionHeading subtitle="Full-stack and AI solutions built from scratch.">
            Featured Projects
          </SectionHeading>
          <div className="grid gap-8">
            {resumeData.projects.map((project, i) => (
              <ProjectCard key={i} project={project} />
            ))}
          </div>
        </section>

        {/* Achievements & Leadership */}
        <section id="achievements" className="py-20">
          <SectionHeading subtitle="Recognition and community impact.">
            Impact & Leadership
          </SectionHeading>
          <div className="grid gap-6 md:grid-cols-2">
            {resumeData.leadership.map((lead, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
                    <Users size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{lead.role}</h3>
                  <p className="text-white/40">{lead.org}</p>
                  <p className="mt-4 text-white/70">{lead.context}</p>
                </div>
              </motion.div>
            ))}
            {resumeData.achievements.map((ach, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="col-span-full flex items-center gap-8 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <Trophy size={32} />
                </div>
                <div>
                  <div className="text-3xl font-black text-white">{ach.metric}</div>
                  <h3 className="text-lg font-bold text-white/60">{ach.title}</h3>
                  <p className="mt-1 text-white/70">{ach.context}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <SectionHeading subtitle="Technical stack and core competencies.">
            Technical Skills
          </SectionHeading>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <SkillCategory title="Languages" skills={resumeData.skills.languages} icon={Terminal} />
            <SkillCategory title="Frameworks" skills={resumeData.skills.frameworks} icon={Layers} />
            <SkillCategory title="Tools" skills={resumeData.skills.tools} icon={Database} />
            <SkillCategory title="Coursework" skills={resumeData.skills.coursework} icon={GraduationCap} />
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20">
          <SectionHeading subtitle="Academic background and certifications.">
            Education
          </SectionHeading>
          <div className="space-y-8">
            {resumeData.education.map((edu, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative flex gap-8 pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-white/10"
              >
                <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-white" />
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white">{edu.institution}</h3>
                    <p className="text-white/60">{edu.degree}</p>
                    <p className="mt-1 text-sm font-medium text-white/40">{edu.info}</p>
                  </div>
                  <div className="text-sm font-bold tracking-widest text-white/30">{edu.year}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <SectionHeading subtitle="Have a project in mind? Let's talk.">
            Get In Touch
          </SectionHeading>
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <p className="text-lg text-white/60">
                I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-white/70">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <Mail size={20} />
                  </div>
                  <span>{resumeData.basics.email}</span>
                </div>
                <div className="flex items-center gap-4 text-white/70">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <Phone size={20} />
                  </div>
                  <span>{resumeData.basics.phone}</span>
                </div>
                <div className="flex items-center gap-4 text-white/70">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <MapPin size={20} />
                  </div>
                  <span>{resumeData.basics.location}</span>
                </div>
              </div>
            </motion.div>

            <motion.form 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              action={`https://formspree.io/f/${resumeData.basics.email}`} // Placeholder - user should replace with their Formspree ID
              method="POST"
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-white/30"
                />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your Email" 
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-white/30"
                />
              </div>
              <input 
                type="text" 
                name="subject" 
                placeholder="Subject" 
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-white/30"
              />
              <textarea 
                name="message" 
                placeholder="Your Message" 
                rows={5} 
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-white/30"
              />
              <button 
                type="submit"
                className="w-full rounded-xl bg-white py-4 text-lg font-bold text-black transition-transform hover:scale-[1.02] active:scale-95"
              >
                Send Message
              </button>
            </motion.form>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t border-white/5 py-20 text-center">
          <h2 className="text-4xl font-black tracking-tighter md:text-6xl">Let's Build Something.</h2>
          <div className="mt-8 flex justify-center gap-6">
            <a href={`mailto:${resumeData.basics.email}`} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white hover:text-black">
              <Mail size={20} />
            </a>
            <a href={resumeData.basics.links[0].url} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white hover:text-black">
              <Linkedin size={20} />
            </a>
            <a href={resumeData.basics.links[1].url} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white hover:text-black">
              <Github size={20} />
            </a>
          </div>
          <p className="mt-12 text-sm text-white/30">
            &copy; {new Date().getFullYear()} {resumeData.basics.name}. Built with React & Framer Motion.
          </p>
        </footer>
      </main>
    </div>
  );
}
