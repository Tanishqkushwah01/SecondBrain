import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./ui/button";
import Card from "./ui/card";
import { isValidUserSession } from "./protectedRouter";
import {
  Brain,
  ArrowRight,
  Moon,
  Sun,
  Folder,
  Share2,
  Shield,
} from "lucide-react";

import {
  FaYoutube,
  FaTwitter,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import { useTheme } from "../context/ThemeContext";

function LandingPage() {
  const { isDarkMode: darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (isValidUserSession()) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const resources = [
    {
      name: "YouTube",
      icon: <FaYoutube className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-red-600" />,
      bg: "bg-red-50",
    },
    {
      name: "Twitter",
      icon: <FaTwitter className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-sky-500" />,
      bg: "bg-sky-50",
    },
    {
      name: "GitHub",
      icon: <FaGithub className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-gray-900" />,
      bg: "bg-gray-100",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-blue-700" />,
      bg: "bg-blue-50",
    },
  ];

  return (
    <main className="min-h-screen transition overflow-x-hidden bg-[#F8FAFC] dark:bg-[#0B1120] text-gray-900 dark:text-white">
      <header className="w-full border-b bg-white dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#1E293B]">
        <nav className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <Brain className="text-[#4356D6] w-7 h-7 md:w-9 md:h-9" />
            <h1 className="text-xl md:text-2xl font-bold">Second Brain</h1>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <Button
              variant="none"
              size="none"
              onClick={toggleTheme}
              className="w-10 h-10 cursor-pointer md:w-12 md:h-12 rounded-xl flex items-center justify-center transition bg-[#EEF2FF] dark:bg-[#1E293B]"
            >
              {darkMode ? <Sun size={18} className="md:w-5 md:h-5" /> : <Moon size={18} className="md:w-5 md:h-5" />}
            </Button>

            <a
              href="/login"
              className="bg-[#4356D6] text-white px-4 py-2 md:px-5 rounded-xl hover:bg-[#3545b8] transition text-sm md:text-base whitespace-nowrap"
            >
              Get Started
            </a>
          </div>
        </nav>
      </header>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="text-center lg:text-left mx-auto max-w-2xl lg:mx-0">
          <p className="text-[#4356D6] font-semibold mb-3 md:mb-4 text-sm md:text-base">
            Your personal knowledge hub
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
            Save, organize and access your important links in one place.
          </h2>

          <p className="mt-4 md:mt-6 text-base md:text-lg max-w-xl mx-auto lg:mx-0 text-gray-600 dark:text-gray-300">
            Second Brain helps you store YouTube videos, tweets, articles,
            GitHub links, LinkedIn posts and other useful resources without
            losing them again.
          </p>

          <div className="mt-6 md:mt-8 flex justify-center lg:justify-start">
            <a
              href="/login"
              className="bg-[#4356D6] text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#3545b8] transition w-full sm:w-max"
            >
              Start Free <ArrowRight size={18} />
            </a>
          </div>
        </div>

        <Card variant="none" size="none" className="rounded-3xl border shadow-xl p-4 md:p-6 w-full max-w-2xl mx-auto lg:max-w-none bg-white dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#1E293B]">
          <div className="rounded-2xl p-4 md:p-5 w-full bg-[#F1F5F9] dark:bg-[#111827]">
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <Brain className="text-[#4356D6] w-6 h-6 md:w-8 md:h-8" />

              <div>
                <h3 className="font-bold text-lg md:text-xl">
                  Second Brain Dashboard
                </h3>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  All your saved resources
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {resources.map((item) => (
                <div
                  key={item.name}
                  className="border rounded-2xl p-3 md:p-4 bg-white dark:bg-[#0B1120] border-[#E2E8F0] dark:border-[#1E293B]"
                >
                  <div
                    className={`h-20 md:h-24 lg:h-32 rounded-xl mb-3 md:mb-4 flex items-center justify-center ${item.bg}`}
                  >
                    {item.icon}
                  </div>

                  <h4 className="font-semibold text-base md:text-lg">
                    {item.name} Resource
                  </h4>

                  <p className="text-xs md:text-sm mt-1 text-gray-500 dark:text-gray-400">
                    Saved for later use
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-20">
        <div className="text-center mb-8 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Everything your brain needs</h2>
          <p className="mt-3 text-base md:text-lg text-gray-600 dark:text-gray-300">
            Simple features to save and manage your digital knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Feature
            darkMode={darkMode}
            icon={<Folder />}
            title="Organize By Tags"
            desc="Categorize your saved links using tags and keep everything clean."
          />

          <Feature
            darkMode={darkMode}
            icon={<Share2 />}
            title="Share Your Brain"
            desc="Create a public shareable dashboard of your saved content."
          />

          <Feature
            darkMode={darkMode}
            icon={<Brain />}
            title="Clean Dashboard"
            desc="View all your cards in a simple and distraction-free layout."
          />

          <Feature
            darkMode={darkMode}
            icon={<Shield />}
            title="Secure Access"
            desc="Your saved links stay protected inside your personal account."
          />

          <Feature
            darkMode={darkMode}
            icon={<ArrowRight />}
            title="Easy to Use"
            desc="Minimal design, fast actions and simple user experience."
          />

          <Feature
            darkMode={darkMode}
            icon={<FaYoutube />}
            title="Save Videos"
            desc="Save useful YouTube videos and access them anytime."
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12 md:pb-20">
        <div className="bg-[#4356D6] rounded-3xl px-6 py-10 md:px-8 md:py-14 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold">
            Build your Second Brain today
          </h2>

          <p className="mt-3 md:mt-4 text-white/80 text-base md:text-lg">
            Start saving your best links, videos and resources in one place.
          </p>

          <a
            href="/login"
            className="flex items-center justify-center gap-2 mt-6 md:mt-8 bg-white text-[#4356D6] px-6 md:px-7 py-3 rounded-xl font-semibold hover:bg-gray-100 transition w-full sm:w-max mx-auto"
          >
            Start Free <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <footer className="border-t py-6 px-4 text-center flex flex-col items-center justify-center gap-2 text-sm md:text-base bg-white dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#1E293B] text-gray-500 dark:text-gray-400">
        <span>© 2026 Second Brain by Tanishq Kushwah. All rights reserved.</span>
      </footer>
    </main>
  );
}

function Feature({
  icon,
  title,
  desc,
  darkMode,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  darkMode: boolean;
}) {
  return (
    <Card variant="none" size="none" className="border rounded-2xl p-4 sm:p-6 hover:shadow-lg transition bg-white dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#1E293B]">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#EEF2FF] text-[#4356D6] rounded-xl flex items-center justify-center mb-3 sm:mb-5 [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6">
        {icon}
      </div>

      <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>

      <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
        {desc}
      </p>
    </Card>
  );
}

export default LandingPage;