import { Menu, Brain } from "lucide-react";
import Button from "./ui/button";

interface PublicHeaderProps {
  adminName: string;
  onMenuClick?: () => void;
}

function PublicHeader({ adminName, onMenuClick }: PublicHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row w-full bg-[#F8FAFC] dark:bg-[#0C111C] border-b border-[#E2E8F0] dark:border-[#1E293B] justify-between px-4 md:px-8 py-3 md:py-0 md:h-20 transition-colors duration-200 z-40">
      
      {/* Mobile Top Row: Hamburger, Logo */}
      <div className="flex md:hidden items-center justify-between w-full mb-4">
        <Button
          variant="none"
          size="none"
          onClick={onMenuClick}
          className="text-gray-700 dark:text-[#F8FAFC] p-1 transition-colors duration-200"
        >
          <Menu size={24} />
        </Button>
        <div className="flex items-center gap-2">
          <Brain size={28} className="text-[#4356D6] dark:text-[#6478FF]" />
          <div className="text-xl font-semibold text-gray-800 dark:text-[#F8FAFC]">Second Brain</div>
        </div>
        <div className="w-8"></div>
      </div>

      {/* Left Side */}
      <div className="mb-2 md:mb-0 md:flex md:flex-col md:justify-center">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-[#F8FAFC] transition-colors duration-200">
          {adminName}'s
        </h1>
        <p className="text-sm text-gray-500 dark:text-[#94A3B8] transition-colors duration-200">
          Dashboard
        </p>
      </div>

    </header>
  );
}

export default PublicHeader;