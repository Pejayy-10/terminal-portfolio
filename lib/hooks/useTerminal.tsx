"use client"

import React, { useState } from "react"
import SnakeGame from "../../components/SnakeGame"

interface CommandHistoryEntry {
  command: string
  response?: string
}

interface MenuOption {
  label: string
  content: React.ReactNode
  command: string
  description: string
}

interface UseTerminalReturn {
  stage: "intro" | "menu"
  setStage: React.Dispatch<React.SetStateAction<"intro" | "menu">>
  commandHistory: CommandHistoryEntry[]
  addToHistory: (command: string, response?: string) => void
  selectedOption: MenuOption | null
  setSelectedOption: React.Dispatch<React.SetStateAction<MenuOption | null>>
  splitViewOpen: boolean
  setSplitViewOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleCommand: (input: string) => void
  menuOptions: MenuOption[]
  clearHistory: () => void
}

export function useTerminal(): UseTerminalReturn {
  const [stage, setStage] = useState<"intro" | "menu">("intro")
  const [commandHistory, setCommandHistory] = useState<CommandHistoryEntry[]>([])
  const [selectedOption, setSelectedOption] = useState<MenuOption | null>(null)
  const [splitViewOpen, setSplitViewOpen] = useState(false)

  const menuOptions: MenuOption[] = [
    {
      label: "About Me",
      command: "1",
      description: "Personal information and background",
      content: (
        <div className="space-y-6">
          <div className="border border-cyan-400/30 rounded-lg p-4 bg-gray-800/30">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              About Me
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                Hi there! I'm <span className="text-green-400 font-semibold">Frandesal</span>, a passionate full-stack
                developer with expertise in modern web technologies. I love building interactive and user-friendly
                applications that solve real-world problems.
              </p>
              <p className="leading-relaxed">
                My journey in programming started several years ago, and I've been constantly learning and improving my
                skills. I enjoy working with React, Next.js, TypeScript, and various backend technologies.
              </p>
              <p className="leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or enjoying outdoor activities.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-green-400/30 rounded-lg p-4 bg-gray-800/20">
              <h4 className="text-green-400 font-semibold mb-2">Location</h4>
              <p className="text-gray-300">Remote / Global</p>
            </div>
            <div className="border border-green-400/30 rounded-lg p-4 bg-gray-800/20">
              <h4 className="text-green-400 font-semibold mb-2">Experience</h4>
              <p className="text-gray-300">5+ Years</p>
            </div>
            <div className="border border-green-400/30 rounded-lg p-4 bg-gray-800/20">
              <h4 className="text-green-400 font-semibold mb-2">Specialization</h4>
              <p className="text-gray-300">Full Stack Development</p>
            </div>
            <div className="border border-green-400/30 rounded-lg p-4 bg-gray-800/20">
              <h4 className="text-green-400 font-semibold mb-2">Status</h4>
              <p className="text-green-400">Available for hire</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Skills & Technologies",
      command: "2",
      description: "Technical expertise and tools",
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Technical Arsenal
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border border-green-400/30 rounded-lg p-4 bg-gray-800/20">
              <h4 className="text-yellow-400 mb-3 font-semibold">Frontend Technologies</h4>
              <div className="space-y-2">
                {["React & Next.js", "TypeScript", "Tailwind CSS", "Redux / Zustand", "HTML5 & CSS3"].map(
                  (skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-green-400">▓</span>
                      <span className="text-gray-300">{skill}</span>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="border border-green-400/30 rounded-lg p-4 bg-gray-800/20">
              <h4 className="text-yellow-400 mb-3 font-semibold">Backend Technologies</h4>
              <div className="space-y-2">
                {["Node.js", "Express", "MongoDB", "PostgreSQL", "RESTful APIs"].map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-green-400">▓</span>
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-green-400/30 rounded-lg p-4 bg-gray-800/20">
              <h4 className="text-yellow-400 mb-3 font-semibold">DevOps & Tools</h4>
              <div className="space-y-2">
                {["Git & GitHub", "Docker", "CI/CD", "AWS", "Jest & Testing"].map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-green-400">▓</span>
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-green-400/30 rounded-lg p-4 bg-gray-800/20">
              <h4 className="text-yellow-400 mb-3 font-semibold">Soft Skills</h4>
              <div className="space-y-2">
                {[
                  "Problem Solving",
                  "Team Leadership",
                  "Project Management",
                  "Communication",
                  "Continuous Learning",
                ].map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-green-400">▓</span>
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Projects Portfolio",
      command: "3",
      description: "Featured work and case studies",
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Featured Projects
          </h3>

          <div className="space-y-6">
            {[
              {
                title: "E-Commerce Platform",
                tech: "Next.js, TypeScript, MongoDB, Stripe",
                description:
                  "A full-featured e-commerce platform with product listings, cart functionality, user authentication, and payment processing using Stripe.",
                status: "Production",
                year: "2024",
              },
              {
                title: "Task Management App",
                tech: "React, Redux, Node.js, Express",
                description:
                  "A collaborative task management application with real-time updates, user roles, and project organization features.",
                status: "Production",
                year: "2023",
              },
              {
                title: "Weather Dashboard",
                tech: "React, TypeScript, OpenWeather API",
                description:
                  "An interactive weather dashboard that displays current weather conditions and forecasts for multiple locations with data visualization.",
                status: "Production",
                year: "2023",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="border border-green-400/30 rounded-lg p-4 bg-gray-800/20 hover:bg-gray-800/40 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg font-semibold text-yellow-400">{project.title}</h4>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-green-900/50 text-green-400 text-xs rounded">{project.status}</span>
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-400 text-xs rounded">{project.year}</span>
                  </div>
                </div>
                <p className="text-sm text-cyan-400 mb-3 font-mono">{project.tech}</p>
                <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex gap-3">
                  <button className="px-3 py-1 bg-green-600/20 border border-green-400/50 text-green-400 text-sm rounded hover:bg-green-600/30 transition-colors">
                    Live Demo
                  </button>
                  <button className="px-3 py-1 bg-gray-600/20 border border-gray-400/50 text-gray-400 text-sm rounded hover:bg-gray-600/30 transition-colors">
                    Source Code
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      label: "Contact & Social",
      command: "4",
      description: "Get in touch and connect",
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Contact Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Email", value: "frandesal@example.com", type: "email" },
              { label: "LinkedIn", value: "linkedin.com/in/frandesal", type: "social" },
              { label: "GitHub", value: "github.com/frandesal", type: "social" },
              { label: "Twitter", value: "twitter.com/frandesal", type: "social" },
            ].map((contact, index) => (
              <div
                key={index}
                className="border border-green-400/30 rounded-lg p-4 bg-gray-800/20 hover:bg-gray-800/40 transition-all duration-300"
              >
                <h4 className="text-yellow-400 mb-2 font-semibold">{contact.label}</h4>
                <p className="text-green-300 font-mono text-sm">{contact.value}</p>
              </div>
            ))}
          </div>

          <div className="border border-cyan-400/30 rounded-lg p-6 bg-gray-800/20">
            <h4 className="text-yellow-400 mb-4 font-semibold">Send Message</h4>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-green-400 mb-1 text-sm">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-gray-900/50 border border-green-500/30 rounded-md p-2 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-green-400 mb-1 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-gray-900/50 border border-green-500/30 rounded-md p-2 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-green-400 mb-1 text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-gray-900/50 border border-green-500/30 rounded-md p-2 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-green-600/20 border border-green-400/50 hover:bg-green-600/30 text-green-400 font-mono py-2 px-4 rounded-md transition-colors"
              >
                Execute Send
              </button>
            </form>
          </div>
        </div>
      ),
    },
    {
      label: "System Information",
      command: "5",
      description: "Resume and professional details",
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Professional Profile
          </h3>

          <div className="space-y-6">
            <div className="border border-green-400/30 rounded-lg p-4 bg-gray-800/20">
              <h4 className="text-lg font-semibold text-yellow-400 border-b border-green-500/30 pb-2 mb-4">
                Work Experience
              </h4>

              {[
                {
                  title: "Senior Frontend Developer",
                  company: "Tech Innovations Inc.",
                  period: "2021 - Present",
                  responsibilities: [
                    "Led development of flagship web application using Next.js and TypeScript",
                    "Implemented CI/CD pipelines reducing deployment time by 40%",
                    "Mentored junior developers and conducted code reviews",
                  ],
                },
                {
                  title: "Full Stack Developer",
                  company: "WebSolutions Co.",
                  period: "2018 - 2021",
                  responsibilities: [
                    "Developed and maintained multiple client websites and web applications",
                    "Worked with React, Node.js, and MongoDB to create scalable solutions",
                    "Collaborated with design and marketing teams to implement new features",
                  ],
                },
              ].map((job, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-green-300">{job.title}</h5>
                    <span className="text-sm text-gray-400 font-mono">{job.period}</span>
                  </div>
                  <p className="text-cyan-400 mb-2">{job.company}</p>
                  <ul className="list-none space-y-1">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                        <span className="text-green-400 mt-1">▸</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border border-green-400/30 rounded-lg p-4 bg-gray-800/20">
              <h4 className="text-lg font-semibold text-yellow-400 border-b border-green-500/30 pb-2 mb-4">
                Education & Certifications
              </h4>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-start">
                    <h5 className="font-medium text-green-300">Master of Computer Science</h5>
                    <span className="text-sm text-gray-400 font-mono">2018 - 2020</span>
                  </div>
                  <p className="text-cyan-400">University of Technology</p>
                </div>

                <div className="border-t border-gray-600/30 pt-4">
                  <h5 className="font-medium text-green-300 mb-2">Certifications</h5>
                  <div className="space-y-1">
                    {[
                      "AWS Certified Developer (2022)",
                      "MongoDB Certified Developer (2021)",
                      "React Advanced Patterns (2020)",
                    ].map((cert, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-green-400">▓</span>
                        <span className="text-gray-300 text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>          <div className="flex justify-center">
            <button className="bg-green-600/20 border border-green-400/50 hover:bg-green-600/30 text-green-400 font-mono py-2 px-6 rounded-md transition-colors">
              Download Resume.pdf
            </button>
          </div>
        </div>
      ),
    },
    {
      label: "Snake Game",
      command: "6",
      description: "Play the classic Snake game",
      content: (
        <div className="space-y-6">
          <div className="border border-cyan-400/30 rounded-lg p-4 bg-gray-800/30">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Snake Game
            </h3>
            <div className="text-gray-300 mb-4">
              <p>Use WASD or Arrow keys to move. Press Space to pause/resume. Collect food to grow and increase your score!</p>
            </div>
            <SnakeGame />
          </div>
        </div>
      ),
    },
  ]

  const addToHistory = (command: string, response?: string) => {
    setCommandHistory((prev) => [...prev, { command, response }])
  }

  const clearHistory = () => {
    setCommandHistory([])
  }
  const handleCommand = (input: string) => {
    const command = input.trim().toLowerCase()

    addToHistory(command)

    if (/^[1-6]$/.test(command)) {
      const optionIndex = Number.parseInt(command) - 1
      if (optionIndex >= 0 && optionIndex < menuOptions.length) {
        setSelectedOption(menuOptions[optionIndex])
        setSplitViewOpen(true)
        addToHistory("", `Executing ${menuOptions[optionIndex].label}...`)
        return
      }
    }

    switch (command) {      case "clear":
      case "cls":
        clearHistory()
        break
      case "help":
        addToHistory(
          "",
          "Available commands: 0 (home), 1-6 (menu options), clear, help, about, skills, projects, contact, resume, game, home, back",
        )
        break
      case "about":
        setSelectedOption(menuOptions[0])
        setSplitViewOpen(true)
        addToHistory("", "Loading About Me...")
        break
      case "skills":
        setSelectedOption(menuOptions[1])
        setSplitViewOpen(true)
        addToHistory("", "Loading Skills & Technologies...")
        break
      case "projects":
        setSelectedOption(menuOptions[2])
        setSplitViewOpen(true)
        addToHistory("", "Loading Projects Portfolio...")
        break
      case "contact":        setSelectedOption(menuOptions[3])
        setSplitViewOpen(true)
        addToHistory("", "Loading Contact Information...")
        break
      case "resume":
        setSelectedOption(menuOptions[4])
        setSplitViewOpen(true)
        addToHistory("", "Loading System Information...")
        break
      case "game":
        setSelectedOption(menuOptions[5])
        setSplitViewOpen(true)
        addToHistory("", "Loading Snake Game...")
        break
      case "exit":
      case "quit":
        addToHistory("", "Cannot exit portfolio. Use browser controls to leave.")
        break
      case "0":
      case "home":
      case "back":
      case "intro":
        setStage("intro")
        clearHistory()
        addToHistory("", "Returning to home screen...")
        if (splitViewOpen) {
          setSplitViewOpen(false)
          setSelectedOption(null)
        }
        break
      default:
        addToHistory("", `Command not found: ${command}. Type 'help' for available commands.`)
    }
  }

  return {
    stage,
    setStage,
    commandHistory,
    addToHistory,
    selectedOption,
    setSelectedOption,
    splitViewOpen,
    setSplitViewOpen,
    handleCommand,
    menuOptions,
    clearHistory,
  }
}
