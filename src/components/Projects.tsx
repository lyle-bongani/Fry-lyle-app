import React, { useState } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import "../styles/global.css";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl: string;
  codeUrl: string;
  category: "development" | "design";
}

const projects: Project[] = [
  // Development Projects
  {
    id: 1,
    title: "Entry Form",
    description: "A form application for entering and managing data with a user-friendly interface.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Formik", "Yup"],
    image: "",
    demoUrl: "https://entry-form-xlbb.vercel.app/",
    codeUrl: "https://github.com/lyle-bongani/Entry-form.git",
    category: "development",
  },
  {
    id: 2,
    title: "Progress Report",
    description: "A progress reporting tool to track and visualize project milestones and tasks.",
    tags: ["React", "TypeScript", "Chart.js", "Tailwind CSS", "Axios"],
    image: "",
    demoUrl: "https://progress-report-sage.vercel.app/",
    codeUrl: "https://github.com/lyle-bongani/Progress-Report.git",
    category: "development",
  },
  {
    id: 3,
    title: "Fudo",
    description: "A food delivery platform with real-time order tracking and user management.",
    tags: ["React", "TypeScript", "Firebase", "Styled Components", "WebSockets"],
    image: "",
    demoUrl: "https://fudo-cyan.vercel.app/",
    codeUrl: "https://github.com/lyle-bongani/Fudo.git",
    category: "development",
  },
  {
    id: 4,
    title: "Form TS",
    description: "A TypeScript-based form application with validation and dynamic fields.",
    tags: ["React", "TypeScript", "Formik", "Yup", "Tailwind CSS"],
    image: "",
    demoUrl: "https://form-ts-wheat.vercel.app/",
    codeUrl: "https://github.com/lyle-bongani/form.ts.git",
    category: "development",
  },

  // Design Projects
  {
    id: 5,
    title: "Food App Design",
    description: "Modern food delivery app design with intuitive user flows and interactive prototypes.",
    tags: ["UI/UX", "Figma", "Mobile Design", "Prototyping", "User Testing"],
    image: "",
    demoUrl: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/g0wVjkoplcHQAwNV0ESare/Food-app-design-Lyle?node-id=87-70&starting-point-node-id=27%3A2",
    codeUrl: "#",
    category: "design",
  },
  {
    id: 6,
    title: "Luxury Watch Retail",
    description: "E-commerce experience design for high-end timepieces with immersive product visualization.",
    tags: ["UX Design", "Figma", "Luxury Branding", "Interaction Design", "3D Mockups"],
    image: "",
    demoUrl: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/4fBZUDfiTLPVER1IUI1YP1/Luxury-watch-retail-lyle?node-id=17-3913&scaling=scale-down-width&content-scaling=fixed",
    codeUrl: "#",
    category: "design",
  },
  {
    id: 7,
    title: "Jameson Brand Experience",
    description: "Interactive brand showcase combining rich animations with content-focused storytelling.",
    tags: ["Brand Design", "Figma", "Motion Design", "Art Direction", "Prototyping"],
    image: "",
    demoUrl: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/cxlKc7PYVLrqTVycRTNQW6/JAMESON-LYLE?node-id=1-2&scaling=scale-down-width&content-scaling=fixed",
    codeUrl: "#",
    category: "design",
  },
  {
    id: 8,
    title: "Real Estate Platform",
    description: "Property listing platform with advanced search filters and virtual tour integration.",
    tags: ["Web Design", "Figma", "Real Estate Tech", "User Flows", "Design System"],
    image: "",
    demoUrl: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/ZaW7HoEmD2mdjQgHWm5KnS/REAL-LYLE-ESTATE?node-id=11-2&starting-point-node-id=11%3A2&scaling=scale-down-width&content-scaling=fixed",
    codeUrl: "#",
    category: "design",
  },
];

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "development" | "design">("all");

  const filteredProjects = projects.filter((project) =>
    selectedCategory === "all" ? true : project.category === selectedCategory
  );

  return (
    <section id="projects" className="py-24 px-6 bg-secondary/50">
      <div className="container mx-auto max-w-6xl">
        <AnimatedSection className="mb-16 text-center">
          <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-4 mb-6">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg text-pretty">
            A selection of my recent work in development and design. Each project represents unique challenges and solutions.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mb-12 flex justify-center gap-4">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-2 rounded-full ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            } transition-colors`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedCategory("development")}
            className={`px-6 py-2 rounded-full ${
              selectedCategory === "development"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            } transition-colors`}
          >
            Development
          </button>
          <button
            onClick={() => setSelectedCategory("design")}
            className={`px-6 py-2 rounded-full ${
              selectedCategory === "design"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            } transition-colors`}
          >
            UI/UX Design
          </button>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 100} className="group">
              <div className="relative">
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                    project.category === "development"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {project.category === "development" ? "Development" : "UI/UX"}
                </span>
                <div className="bg-white dark:bg-white-900 shadow-2xs rounded-2xl overflow-hidden glass-card h-full flex flex-col transition-all duration-300 hover:translate-y-[-4px] soft-shadow">
                  <div className="aspect-video w-full overflow-hidden relative">
                    {project.category === "development" ? (
                      <iframe
                        src={project.demoUrl}
                        className="w-full h-full border-none"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <iframe
                        src={project.demoUrl}
                        className="w-full h-full border-none"
                        allowFullScreen
                      />
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium inline-flex items-center hover:text-primary hover-underline"
                      >
                        {project.category === "development" ? "Live Demo" : "View Prototype"}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                      {project.codeUrl !== "#" && (
                        <a
                          href={project.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium inline-flex items-center hover:text-primary hover-underline"
                        >
                          View Code
                          <Github className="ml-1 h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 border border-input rounded-full text-sm font-medium hover:bg-secondary transition-colors button-hover-effect"
          >
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Projects;