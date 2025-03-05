
import React from "react";
import { Calendar, MapPin, Briefcase, Award } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 bg-secondary/50">
      <div className="container mx-auto max-w-6xl">
        <AnimatedSection className="mb-16 text-center">
          <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-4 mb-6">
            My Story
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg text-pretty">
            A brief look at my background, experience, and what drives me as a developer and designer.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="left">
            <div className="relative">
              <div className="aspect-square w-full max-w-md mx-auto overflow-hidden rounded-2xl">
                <img
                  src="./images/me.jpg"
                  alt="Lyl Developer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 p-6 bg-white dark:bg-white-900 rounded-2xl glass-card soft-shadow">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm">1+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm">Bulawayo, ZW</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    <span className="text-sm">Available for Freelance</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <h3 className="text-2xl font-bold mb-6">
              I'm <span className="text-gradient-blue">Lyle Chadya</span>, a Web Developer & UI/UX Designer
            </h3>
            <p className="text-muted-foreground mb-6 text-pretty">
            After joining Uncommon.org's bootcamp in Bulawayo, I embarked on an exciting journey into web development and design. Over the past year, I've worked on projects like the Jamason website redesign, a website for Camps Pharmaceuticals, and Quiily Bot, a chatbot built for development and learning purposes.
            </p>
            <p className="text-muted-foreground mb-6 text-pretty">
            Throughout this journey, I've gained hands-on experience in design and front-end development, collaborating on real-world projects that solve meaningful problems. One of the highlights was having the opportunity to showcase my work to distinguished guests, including the Australian Ambassador to Zimbabwe.
            </p>
            <p className="text-muted-foreground mb-8 text-pretty">
            Now, as I continue to grow in the development space, I'm eager to build impactful digital experiences, explore new technologies, and contribute to innovative projects.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-white dark:bg-white-900 rounded-2xl glass-card soft-shadow">
                <Award className="w-6 h-6 text-primary mb-4" />
                <h4 className="text-lg font-bold mb-2">Education</h4>
                <p className="text-sm text-muted-foreground">
                  B.S. Computer Science<br />Stanford University
                </p>
              </div>
              <div className="p-6 bg-white dark:bg-white-900 rounded-2xl glass-card soft-shadow">
                <Briefcase className="w-6 h-6 text-primary mb-4" />
                <h4 className="text-lg font-bold mb-2">Experience</h4>
                <p className="text-sm text-muted-foreground">
                  Previously at Google, Airbnb<br />Now Freelance
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;
