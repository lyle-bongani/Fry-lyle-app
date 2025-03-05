import React from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import "../styles/global.css";

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-16 pb-32 px-6 overflow-hidden">
      {/* Particle background */}
      <div className="absolute inset-0 -z-30 opacity-20">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 opacity-80">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.1),transparent_100%)] animate-gradient-pan" />
      </div>

      {/* Animated grid */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] animate-grid-pan" />
      </div>

      <div className="container max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="text-left">
          <AnimatedSection direction="down" delay={300}>
            <span className="inline-block py-1.5 px-4 mb-6 mt-6 text-sm font-medium bg-gradient-to-r from-primary/20 to-purple-500/20 text-primary border border-primary/30 rounded-full backdrop-blur-sm hover:shadow-primary/20 hover:shadow-sm transition-all">
              Developer & UX Designer
            </span>
          </AnimatedSection>

          <AnimatedSection delay={500}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              Crafting{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-500/80 blur-2xl opacity-60 -z-10" />
                <span className="text-gradient-animated bg-clip-text bg-[length:300%_300%]">
                  Digital
                </span>
              </span>{" "}
              Experiences That{" "}
              <span className="underline decoration-primary/40 decoration-wavy mb-6 underline-offset-8">
                Inspire
              </span>
            </h1>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={700}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
              Bridging the gap between <span className="text-primary font-medium">code</span> and{" "}
              <span className="text-purple-400 font-medium">creativity</span> to create
              transformative digital solutions that users love.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={900} className="w-full">
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="group relative overflow-hidden inline-flex items-center justify-center h-14 px-8 py-4 text-base font-medium text-primary-foreground bg-gradient-to-br from-primary to-purple-600 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Explore Work</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] opacity-0 transition-opacity group-hover:opacity-100 group-hover:animate-shine" />
              </a>

              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center h-14 px-8 py-4 text-base font-medium text-foreground bg-background border-2 border-primary/20 rounded-2xl transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg hover:scale-[1.02]"
              >
                <span className="relative z-10">Let's Collaborate</span>
                <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 transition-all duration-300 group-hover:border-primary/30" />
              </a>
            </div>
          </AnimatedSection>
        </div>

        {/* Right Column - Animated Preview */}
        <AnimatedSection direction="right" delay={1000} className="relative">
          <div className="relative bg-gradient-to-br from-background to-muted/50 rounded-3xl p-8 shadow-2xl border border-muted/30 backdrop-blur-lg">
            <div className="absolute inset-0 rounded-3xl border border-primary/10" />
            <div className="absolute top-4 left-4 right-4 h-8 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            
            {/* Animated Code Preview */}
            <div className="mt-12 space-y-4 font-mono text-sm animate-code-slide">
              <div className="flex gap-4 text-purple-300">
                <span className="text-muted-foreground">1</span>
                <span className="ml-4">
                  {`const `}
                  <span className="text-primary">Project</span>
                  {` = () => {`}
                </span>
              </div>
              <div className="flex gap-4 text-cyan-300 ml-8">
                <span className="text-muted-foreground">2</span>
                <span>{`return (`}</span>
              </div>
              <div className="flex gap-4 text-blue-300 ml-12">
                <span className="text-muted-foreground">3</span>
                <span>
                  {`<`}
                  <span className="text-green-400">div</span>
                  {` `}
                  <span className="text-yellow-300">className</span>
                  {`=`}
                  <span className="text-emerald-400">"innovative-ui"</span>
                  {`>`}
                </span>
              </div>
              <div className="flex gap-4 text-pink-300 ml-16">
                <span className="text-muted-foreground">4</span>
                <span>
                  {`<`}
                  <span className="text-green-400">UserExperience</span>
                  {` `}
                  <span className="text-yellow-300">quality</span>
                  {`=`}
                  <span className="text-emerald-400">"exceptional"</span>
                  {` />`}
                </span>
              </div>
              <div className="flex gap-4 text-blue-300 ml-12">
                <span className="text-muted-foreground">5</span>
                <span>{`</`}<span className="text-green-400">div</span>{`>`}</span>
              </div>
              <div className="flex gap-4 text-cyan-300 ml-8">
                <span className="text-muted-foreground">6</span>
                <span>{`)`}</span>
              </div>
              <div className="flex gap-4 text-purple-300">
                <span className="text-muted-foreground">7</span>
                <span>{`}`}</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-slow">
        <div className="relative">
          <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-ping-slow" />
          <ChevronDown className="h-6 w-6 text-muted-foreground relative z-10" />
        </div>
        <span className="text-sm text-muted-foreground mt-2">Explore More</span>
      </div>
    </section>
  );
};

export default Hero;