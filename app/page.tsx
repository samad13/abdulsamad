"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Moon, Sun, Menu, X } from "lucide-react";

export default function FullstackPortfolio() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const newDarkMode = !prev;
      if (isClient) {
        localStorage.setItem("theme", newDarkMode ? "dark" : "light");
      }
      return newDarkMode;
    });
  }, [isClient]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "d") {
        e.preventDefault();
        toggleDarkMode();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        !(e.target as Element).closest(".mobile-menu-container")
      ) {
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [toggleDarkMode, isMobileMenuOpen, closeMobileMenu]);

  // Prevent hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ease-in-out ${
        isDarkMode ? "dark bg-gray-900" : "bg-white"
      }`}
    >
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
          isDarkMode
            ? "bg-gray-900/80 border-gray-800"
            : "bg-white/80 border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4 relative">
          <nav className="flex items-center justify-between">
            <div className="flex items-center flex-1 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-colors duration-200 ${
                    isDarkMode ? "bg-white" : "bg-black"
                  }`}
                >
                  <span
                    className={`text-[10px] sm:text-xs font-bold transition-colors duration-200 ${
                      isDarkMode ? "text-black" : "text-white"
                    }`}
                  >
                    AOY
                  </span>
                </div>
                <span
                  className={`font-semibold text-xs sm:text-sm truncate transition-colors duration-200 ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Abdulsamad Oladayo Yusuf
                </span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-6 text-sm ml-8">
                <a
                  href="#about"
                  className={`transition-colors duration-200 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-100"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  About
                </a>
                <a
                  href="#projects"
                  className={`transition-colors duration-200 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-100"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Projects
                </a>
                <a
                  href="#experience"
                  className={`transition-colors duration-200 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-100"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Experience
                </a>
                <a
                  href="#contact"
                  className={`transition-colors duration-200 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-100"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-200 border ${
                  isDarkMode
                    ? "hover:bg-gray-800 border-gray-700"
                    : "hover:bg-gray-100 border-gray-200"
                }`}
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              <a
                href="#contact"
                className={`transition-colors duration-200 ${
                  isDarkMode
                    ? "text-gray-400 hover:text-gray-100"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Get In Touch
              </a>
              <a
                href="/resume.pdf"
                className={`transition-colors duration-200 ${
                  isDarkMode
                    ? "text-gray-400 hover:text-gray-100"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Resume
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-1 sm:gap-2 mobile-menu-container">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-200 border ${
                  isDarkMode
                    ? "hover:bg-gray-800 border-gray-700"
                    : "hover:bg-gray-100 border-gray-200"
                }`}
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-yellow-500" />
                ) : (
                  <Moon className="w-4 h-4 text-gray-600" />
                )}
              </button>

              <button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-lg transition-all duration-200 border ${
                  isDarkMode
                    ? "hover:bg-gray-800 border-gray-700"
                    : "hover:bg-gray-100 border-gray-200"
                }`}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X
                    className={`w-4 h-4 transition-colors duration-200 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  />
                ) : (
                  <Menu
                    className={`w-4 h-4 transition-colors duration-200 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  />
                )}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden absolute top-full right-0 mt-0 w-32 backdrop-blur-md border transition-all duration-300 rounded-bl-lg shadow-lg mobile-menu-container transform origin-top-right ${
              isMobileMenuOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            } ${
              isDarkMode
                ? "bg-gray-900/95 border-gray-800"
                : "bg-white/95 border-gray-100"
            }`}
          >
            <div className="p-4">
              <div className="flex flex-col space-y-3">
                <a
                  href="#about"
                  onClick={closeMobileMenu}
                  className={`text-sm transition-colors duration-200 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-100"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  About
                </a>
                <a
                  href="#projects"
                  onClick={closeMobileMenu}
                  className={`text-sm transition-colors duration-200 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-100"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Projects
                </a>
                <a
                  href="#experience"
                  onClick={closeMobileMenu}
                  className={`text-sm transition-colors duration-200 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-100"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Experience
                </a>
                <a
                  href="#contact"
                  onClick={closeMobileMenu}
                  className={`text-sm transition-colors duration-200 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-100"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Contact
                </a>
                <div
                  className={`border-t pt-4 transition-colors duration-200 ${
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <a
                    href="#contact"
                    onClick={closeMobileMenu}
                    className={`block text-sm transition-colors duration-200 mb-3 ${
                      isDarkMode
                        ? "text-gray-400 hover:text-gray-100"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Get In Touch
                  </a>
                  <a
                    href="/resume.pdf"
                    onClick={closeMobileMenu}
                    className={`block text-sm transition-colors duration-200 ${
                      isDarkMode
                        ? "text-gray-400 hover:text-gray-100"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Add padding to account for fixed header */}
      <div className="pt-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1
                  className={`text-5xl lg:text-6xl font-bold leading-tight transition-colors duration-200 ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Fullstack & Mobile Engineer
                  <br />
                  Building the Future
                </h1>
                <p
                  className={`text-lg max-w-md transition-colors duration-200 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  I create scalable web and mobile applications using modern
                  technologies. Passionate about clean code, user experience,
                  and innovative solutions across all platforms.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className={`px-6 py-3 transition-all duration-200 ${
                    isDarkMode
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  View My Work →
                </Button>
                <Button
                  variant="outline"
                  className={`px-6 py-3 bg-transparent transition-all duration-200 ${
                    isDarkMode
                      ? "text-gray-100 border-gray-600 hover:bg-gray-800"
                      : "text-gray-900 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Get In Touch
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">React Native</Badge>
                <Badge variant="secondary">Node.js</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">Java</Badge>
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">Kubernetes</Badge>
                <Badge variant="secondary">AWS</Badge>
              </div>
            </div>
            <div className="relative">
              <div className="relative w-full h-80 lg:h-96">
                <Image
                  src="/blackandwhite-photoaidcom-cropped.png"
                  alt="Fullstack development illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div
            className={`mt-16 pt-8 border-t transition-colors duration-200 ${
              isDarkMode ? "border-gray-800" : "border-gray-100"
            }`}
          >
            <p
              className={`text-sm mb-6 transition-colors duration-200 ${
                isDarkMode ? "text-gray-500" : "text-gray-500"
              }`}
            >
              Technologies I work with
            </p>
            <div className="flex items-center flex-wrap justify-start space-x-8 opacity-60">
              <div
                className={`text-2xl font-bold transition-colors duration-200 ${
                  isDarkMode ? "text-gray-600" : "text-gray-400"
                }`}
              >
                React
              </div>
              <div
                className={`text-xl font-semibold transition-colors duration-200 ${
                  isDarkMode ? "text-gray-600" : "text-gray-400"
                }`}
              >
                Next.js
              </div>
              <div
                className={`text-lg transition-colors duration-200 ${
                  isDarkMode ? "text-gray-600" : "text-gray-400"
                }`}
              >
                React Native
              </div>
              <div
                className={`text-lg transition-colors duration-200 ${
                  isDarkMode ? "text-gray-600" : "text-gray-400"
                }`}
              >
                Node.js
              </div>
              <div
                className={`text-lg transition-colors duration-200 ${
                  isDarkMode ? "text-gray-600" : "text-gray-400"
                }`}
              >
                PostgreSQL
              </div>
              <div
                className={`text-lg transition-colors duration-200 ${
                  isDarkMode ? "text-gray-600" : "text-gray-400"
                }`}
              >
                AWS
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className={`py-16 lg:py-24 transition-colors duration-200 ${
            isDarkMode ? "bg-gray-800" : "bg-gray-50"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2
                className={`text-4xl lg:text-5xl font-bold mb-6 transition-colors duration-200 ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Crafting Digital
                <br />
                Experiences Everywhere
              </h2>
              <p
                className={`text-lg max-w-2xl mx-auto transition-colors duration-200 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                With 3+ years of experience in fullstack and mobile development,
                I specialize in building robust, scalable applications that
                solve real-world problems across web and mobile platforms.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card
                className={`border-0 shadow-sm transition-colors duration-200 ${
                  isDarkMode ? "bg-gray-700" : "bg-white"
                }`}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200 ${
                      isDarkMode ? "bg-white" : "bg-black"
                    }`}
                  >
                    <span
                      className={`text-xl transition-colors duration-200 ${
                        isDarkMode ? "text-black" : "text-white"
                      }`}
                    >
                      ⚡
                    </span>
                  </div>
                  <h3
                    className={`text-xl font-semibold mb-3 transition-colors duration-200 ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    Frontend
                  </h3>
                  <p
                    className={`mb-4 transition-colors duration-200 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Modern React applications with TypeScript, Next.js, and
                    responsive design.
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    <Badge variant="outline" className="text-xs">
                      React
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      TypeScript
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Tailwind
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`border-0 shadow-sm transition-colors duration-200 ${
                  isDarkMode ? "bg-gray-700" : "bg-white"
                }`}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200 ${
                      isDarkMode ? "bg-white" : "bg-black"
                    }`}
                  >
                    <span
                      className={`text-xl transition-colors duration-200 ${
                        isDarkMode ? "text-black" : "text-white"
                      }`}
                    >
                      🔧
                    </span>
                  </div>
                  <h3
                    className={`text-xl font-semibold mb-3 transition-colors duration-200 ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    Backend
                  </h3>
                  <p
                    className={`mb-4 transition-colors duration-200 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Scalable APIs and microservices with Node.js, Python, and
                    cloud infrastructure.
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    <Badge variant="outline" className="text-xs">
                      Node.js
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Python
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      PostgreSQL
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`border-0 shadow-sm transition-colors duration-200 ${
                  isDarkMode ? "bg-gray-700" : "bg-white"
                }`}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200 ${
                      isDarkMode ? "bg-white" : "bg-black"
                    }`}
                  >
                    <span
                      className={`text-xl transition-colors duration-200 ${
                        isDarkMode ? "text-black" : "text-white"
                      }`}
                    >
                      ☁️
                    </span>
                  </div>
                  <h3
                    className={`text-xl font-semibold mb-3 transition-colors duration-200 ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    DevOps
                  </h3>
                  <p
                    className={`mb-4 transition-colors duration-200 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    CI/CD pipelines, containerization, and cloud deployment
                    strategies.
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    <Badge variant="outline" className="text-xs">
                      AWS
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Docker
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      GitHub Actions
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`border-0 shadow-sm transition-colors duration-200 ${
                  isDarkMode ? "bg-gray-700" : "bg-white"
                }`}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200 ${
                      isDarkMode ? "bg-white" : "bg-black"
                    }`}
                  >
                    <span
                      className={`text-xl transition-colors duration-200 ${
                        isDarkMode ? "text-black" : "text-white"
                      }`}
                    >
                      📱
                    </span>
                  </div>
                  <h3
                    className={`text-xl font-semibold mb-3 transition-colors duration-200 ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    Mobile
                  </h3>
                  <p
                    className={`mb-4 transition-colors duration-200 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Cross-platform mobile apps with React Native and native
                    iOS/Android development.
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    <Badge variant="outline" className="text-xs">
                      React Native
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Swift
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Kotlin
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2
                className={`text-4xl lg:text-5xl font-bold mb-6 transition-colors duration-200 ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Featured Projects
              </h2>
              <p
                className={`text-lg max-w-2xl transition-colors duration-200 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                A selection of recent work showcasing different aspects of of my
                work.
              </p>
            </div>

            <div className="space-y-16">
              {/* Project 1 */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3
                      className={`text-2xl font-bold transition-colors duration-200 ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Job-productivity App
                    </h3>
                    <p
                      className={`transition-colors duration-200 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      A full-featured productivity monitoring app built with
                      React, Node.js, and Chart.js. Tracks employee task
                      performance in real time and generates visual analytics.
                      Designed for managers to optimize team efficiency and
                      workflow
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Next.js</Badge>
                      <Badge variant="secondary">Stripe</Badge>
                      <Badge variant="secondary">PostgreSQL</Badge>
                      <Badge variant="secondary">Redis</Badge>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      className={`transition-all duration-200 ${
                        isDarkMode
                          ? "bg-white text-black hover:bg-gray-200"
                          : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      View Live →
                    </Button>
                    <Button
                      variant="outline"
                      className={`transition-all duration-200 ${
                        isDarkMode
                          ? "text-gray-100 border-gray-600 hover:bg-gray-800"
                          : "text-gray-900 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      GitHub
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <div className="relative w-full h-64 lg:h-80">
                    <Image
                      src="/Screenshot (408).png"
                      alt="E-commerce platform screenshot"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Project 2 */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative order-2 lg:order-1">
                  <div className="relative w-full h-64 lg:h-80">
                    <Image
                      src="/placeholder.svg?height=320&width=500"
                      alt="Analytics dashboard screenshot"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-6 order-1 lg:order-2">
                  <div className="space-y-4">
                    <h3
                      className={`text-2xl font-bold transition-colors duration-200 ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Analytics Dashboard
                    </h3>
                    <p
                      className={`transition-colors duration-200 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Real-time analytics dashboard processing millions of data
                      points. Features custom visualizations and automated
                      reporting.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">React</Badge>
                      <Badge variant="secondary">D3.js</Badge>
                      <Badge variant="secondary">Node.js</Badge>
                      <Badge variant="secondary">MongoDB</Badge>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      className={`transition-all duration-200 ${
                        isDarkMode
                          ? "bg-white text-black hover:bg-gray-200"
                          : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      View Live →
                    </Button>
                    <Button
                      variant="outline"
                      className={`transition-all duration-200 ${
                        isDarkMode
                          ? "text-gray-100 border-gray-600 hover:bg-gray-800"
                          : "text-gray-900 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      GitHub
                    </Button>
                  </div>
                </div>
              </div>

              {/* Project 3 */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3
                      className={`text-2xl font-bold transition-colors duration-200 ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      AI-Powered SaaS
                    </h3>
                    <p
                      className={`transition-colors duration-200 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      SaaS platform leveraging OpenAI APIs for content
                      generation. Includes subscription management, usage
                      tracking, and team collaboration.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Next.js</Badge>
                      <Badge variant="secondary">OpenAI</Badge>
                      <Badge variant="secondary">Supabase</Badge>
                      <Badge variant="secondary">Vercel</Badge>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      className={`transition-all duration-200 ${
                        isDarkMode
                          ? "bg-white text-black hover:bg-gray-200"
                          : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      View Live →
                    </Button>
                    <Button
                      variant="outline"
                      className={`transition-all duration-200 ${
                        isDarkMode
                          ? "text-gray-100 border-gray-600 hover:bg-gray-800"
                          : "text-gray-900 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      GitHub
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <div className="relative w-full h-64 lg:h-80">
                    <Image
                      src="/placeholder.svg?height=320&width=500"
                      alt="AI SaaS platform screenshot"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Project 4 - Mobile App */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative order-2 lg:order-1">
                  <div className="relative w-full h-64 lg:h-80">
                    <Image
                      src="/placeholder.svg?height=320&width=500"
                      alt="Mobile fitness app screenshot"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-6 order-1 lg:order-2">
                  <div className="space-y-4">
                    <h3
                      className={`text-2xl font-bold transition-colors duration-200 ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Fitness Tracking App
                    </h3>
                    <p
                      className={`transition-colors duration-200 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Cross-platform mobile app with 50k+ downloads. Features
                      workout tracking, social sharing, and offline sync
                      capabilities.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">React Native</Badge>
                      <Badge variant="secondary">Firebase</Badge>
                      <Badge variant="secondary">Redux</Badge>
                      <Badge variant="secondary">Expo</Badge>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      className={`transition-all duration-200 ${
                        isDarkMode
                          ? "bg-white text-black hover:bg-gray-200"
                          : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      App Store →
                    </Button>
                    <Button
                      variant="outline"
                      className={`transition-all duration-200 ${
                        isDarkMode
                          ? "text-gray-100 border-gray-600 hover:bg-gray-800"
                          : "text-gray-900 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      GitHub
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className={`py-16 lg:py-24 transition-colors duration-200 ${
            isDarkMode ? "bg-gray-800" : "bg-gray-50"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2
                className={`text-4xl lg:text-5xl font-bold mb-6 transition-colors duration-200 ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Experience
              </h2>
            </div>

            <div className="space-y-12">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                  <div
                    className={`text-sm transition-colors duration-200 ${
                      isDarkMode ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    2025 - Present
                  </div>
                </div>
                <div className="md:col-span-3 space-y-4">
                  <div>
                    <h3
                      className={`text-xl font-semibold transition-colors duration-200 ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Fullstack Engineer
                    </h3>
                    <p
                      className={`transition-colors duration-200 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Punch Digital Agency.
                    </p>
                  </div>
                  <p
                    className={`transition-colors duration-200 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Development of a software and web applications. serving 100+
                    companies. Mentored junior developers and established
                    engineering best practices across web and mobile platforms.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">React Native</Badge>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">AWS</Badge>
                    <Badge variant="outline">Team Leadership</Badge>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                  <div
                    className={`text-sm transition-colors duration-200 ${
                      isDarkMode ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    2025 - present
                  </div>
                </div>
                <div className="md:col-span-3 space-y-4">
                  <div>
                    <h3
                      className={`text-xl font-semibold transition-colors duration-200 ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Fullstack Developer
                    </h3>
                    <p
                      className={`transition-colors duration-200 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Zwilt.
                    </p>
                  </div>
                  <p
                    className={`transition-colors duration-200 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Built the entire platform from scratch using modern web and
                    mobile technologies. Implemented CI/CD pipelines and
                    automated testing strategies for both web and mobile
                    applications.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Vue.js</Badge>
                    <Badge variant="outline">React Native</Badge>
                    <Badge variant="outline">Python</Badge>
                    <Badge variant="outline">PostgreSQL</Badge>
                    <Badge variant="outline">Docker</Badge>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                  <div
                    className={`text-sm transition-colors duration-200 ${
                      isDarkMode ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    2024 - 2025
                  </div>
                </div>
                <div className="md:col-span-3 space-y-4">
                  <div>
                    <h3
                      className={`text-xl font-semibold transition-colors duration-200 ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Fullstack Developer
                    </h3>
                    <p
                      className={`transition-colors duration-200 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Luminous Digital
                    </p>
                  </div>
                  <p
                    className={`transition-colors duration-200 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Developed responsive web applications for various clients.
                    Specialized in performance optimization and accessibility.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">JavaScript</Badge>
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">SASS</Badge>
                    <Badge variant="outline">WordPress</Badge>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                  <div
                    className={`text-sm transition-colors duration-200 ${
                      isDarkMode ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    2023 - 2024
                  </div>
                </div>
                <div className="md:col-span-3 space-y-4">
                  <div>
                    <h3
                      className={`text-xl font-semibold transition-colors duration-200 ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Fullstack Developer
                    </h3>
                    <p
                      className={`transition-colors duration-200 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Semicolon Africa
                    </p>
                  </div>
                  <p
                    className={`transition-colors duration-200 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Developed responsive web applications for various clients.
                    Specialized in performance optimization and accessibility.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">JavaScript</Badge>
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">Sass</Badge>
                    <Badge variant="outline">Spring Boot</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2
                  className={`text-4xl lg:text-5xl font-bold mb-6 transition-colors duration-200 ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Let's Work Together
                </h2>
                <p
                  className={`text-lg max-w-2xl mx-auto transition-colors duration-200 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  I'm always interested in new opportunities and exciting
                  projects. Let's discuss how we can bring your ideas to life.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className={`px-8 py-3 transition-all duration-200 ${
                    isDarkMode
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  Send Message →
                </Button>
                <Button
                  variant="outline"
                  className={`px-8 py-3 bg-transparent transition-all duration-200 ${
                    isDarkMode
                      ? "text-gray-100 border-gray-600 hover:bg-gray-800"
                      : "text-gray-900 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Schedule Call
                </Button>
              </div>
              <div className="flex justify-center space-x-6 text-sm">
                <a
                  href="mailto:yusufabdulsamad93@gmail.com"
                  className={`transition-colors duration-200 ${
                    isDarkMode
                      ? "text-gray-500 hover:text-gray-100"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  yusufabdulsamad93@gmail.com
                </a>
                <a
                  href="https://linkedin.com/in/abdulsamad-yusuf-ba0064178"
                  className={`transition-colors duration-200 ${
                    isDarkMode
                      ? "text-gray-500 hover:text-gray-100"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/samad13"
                  className={`transition-colors duration-200 ${
                    isDarkMode
                      ? "text-gray-500 hover:text-gray-100"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Footer */}
      <footer
        className={`border-t py-8 transition-colors duration-200 ${
          isDarkMode ? "border-gray-800" : "border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200 ${
                isDarkMode ? "bg-white" : "bg-black"
              }`}
            >
              <span
                className={`text-xs font-bold transition-colors duration-200 ${
                  isDarkMode ? "text-black" : "text-white"
                }`}
              >
                AOY
              </span>
            </div>
            <span
              className={`font-semibold transition-colors duration-200 ${
                isDarkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Abdulsamad Oladayo Yusuf
            </span>
          </div>
          <div
            className={`text-sm transition-colors duration-200 ${
              isDarkMode ? "text-gray-500" : "text-gray-500"
            }`}
          >
            © 2025 AOY. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
