import { Brain, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Button from "./ui/button";

interface SidebarProps {
  selectedTag: string;
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
  isOpen?: boolean;
  onClose?: () => void;
}

function Sidebar({ selectedTag, setSelectedTag, isOpen, onClose }: SidebarProps) {
  const { toggleTheme } = useTheme();
  const tags = ["YouTube", "LinkedIn", "Facebook", "GitHub", "Twitter", "Other"];

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 transition-opacity duration-300 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar (Desktop static, Mobile slide-in) */}
      <aside className={`fixed md:relative top-0 left-0 h-screen w-72 md:w-56 lg:w-72 bg-[#F8FAFC] dark:bg-[#0C111C] border-r border-[#E2E8F0] dark:border-[#1E293B] px-4 md:px-6 py-4 flex-col justify-between transition-transform duration-300 z-50 flex overflow-y-auto ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>

        {/* Top Section */}
        <div>
          {/* Mobile Close Button */}
          <div className="flex justify-end mb-4 md:hidden">
            <Button variant="none" size="none" onClick={onClose} className="text-gray-700 dark:text-[#F8FAFC] hover:bg-gray-200 dark:hover:bg-[#1E293B] p-1 rounded transition-colors duration-200">
              <X size={24} />
            </Button>
          </div>

          <div className="flex items-center gap-3 mb-8 md:mb-0 md:mb-8">
            <Brain className="w-12 h-12 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#4356D6] dark:text-[#6478FF] transition-colors duration-200 flex-shrink-0" />
            <div className="text-2xl md:text-base lg:text-2xl font-semibold tracking-tight text-gray-800 dark:text-[#F8FAFC] transition-colors duration-200 truncate">
              Second Brain
            </div>
          </div>

          {/* Middle Section (Tags) */}
          <div className="flex flex-col gap-4 mt-2 md:mt-8">
            {tags.map((item) => (
              <Button
                variant="none"
                size="none"
                key={item}
                onClick={() => handleTagClick(item)}
                className={`w-full px-5 md:px-3 lg:px-5 py-3 md:py-2 lg:py-3 cursor-pointer rounded-xl text-left text-base md:text-sm lg:text-base transition-all duration-300 truncate ${selectedTag === item
                    ? "bg-[#4356D6] dark:bg-[#4F63FF] text-white dark:hover:bg-[#6478FF]"
                    : "bg-[#EEF2F7] dark:bg-[#111827] text-gray-700 dark:text-[#94A3B8] hover:bg-[#E2E8F0] dark:hover:bg-[#1E293B]"
                  }`}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        {/* Bottom Section (Dark Mode) */}
        <div className="mt-6 md:mt-0 shrink-0 flex items-center justify-between bg-[#EEF2F7] dark:bg-[#111827] rounded-xl px-4 md:px-3 lg:px-4 py-3 md:py-2 lg:py-3 transition-colors duration-200 mb-20 md:mb-0">
          <span className="text-gray-700 dark:text-[#F8FAFC] font-medium text-base md:text-sm lg:text-base transition-colors duration-200 truncate">
            Dark Mode
          </span>
          <Button
            variant="none"
            size="none"
            onClick={toggleTheme}
            className={`w-14 h-7 cursor-pointer rounded-full relative transition-all duration-300 bg-gray-300 dark:bg-[#4F63FF]`}>
            <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all duration-300 left-1 dark:left-8`}></div>
          </Button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation (Visible only on mobile) */}
      <nav className="md:hidden flex fixed bottom-0 left-0 right-0 bg-[#F8FAFC] dark:bg-[#0C111C] border-t border-[#E2E8F0] dark:border-[#1E293B] overflow-x-auto transition-colors duration-200 h-auto z-40">
        <div className="flex gap-2 px-2 py-2 w-full min-w-max">
          {tags.map((tag) => (
            <Button
              variant="none"
              size="none"
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-300 font-medium ${selectedTag === tag
                  ? "bg-[#4356D6] dark:bg-[#4F63FF] text-white"
                  : "bg-[#EEF2F7] dark:bg-[#111827] text-gray-700 dark:text-[#94A3B8] hover:bg-[#E2E8F0] dark:hover:bg-[#1E293B]"
                }`}
            >
              {tag}
            </Button>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Sidebar;