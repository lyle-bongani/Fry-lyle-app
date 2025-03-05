
import React from "react";
import AnimatedSection from "./AnimatedSection";

interface Skill {
  category: string;
  items: string[];
}

const skills: Skill[] = [
  {
    category: "Design",
    items: [
      "UI/UX Design",
      "Wireframing",
      "Prototyping",
      "User Research",
      "Visual Design",
      "Figma",
      "Graphic Design",
    ],
  },
  {
    category: "Frontend",
    items: [
      "HTML/CSS",
      "JavaScript (ES6+)",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Styled Components",
      "Framer Motion",  
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
    ],
  },
  {
    category: "Tools & Methods",
    items: [
      "Vscode",
      "GitHub",
      "Windsurf",
      "Cursor",
      "Figma",
      "Canva",
      "Wix",
      "WordPress",
    ],
  },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <AnimatedSection className="mb-16 text-center">
          <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
            Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-4 mb-6">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg text-pretty">
            A comprehensive overview of my technical skills, design abilities, and the technologies I work with.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skillGroup, index) => (
            <AnimatedSection
              key={skillGroup.category}
              delay={index * 100}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <div className="bg-white dark:bg-white-900 rounded-2xl p-8 glass-card soft-shadow h-full">
                <h3 className="text-xl font-bold mb-6 text-gradient-blue inline-block">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium transition-transform hover:scale-105"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
