import { Menu, Brain } from "lucide-react";
import type { User } from "./dashboardPage";
import Button from "./ui/button";

export interface HeaderProps {
  userInfo: User | null;
  setIsCard?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowProfile?: React.Dispatch<React.SetStateAction<boolean>>;
  avatarRef?: React.RefObject<HTMLDivElement | null>;
  onShare?: () => void;
  onMenuClick?: () => void;
}

function Header({
  userInfo,
  setShowProfile,
  setIsCard,
  onShare,
  onMenuClick,
}: HeaderProps) {
  return (
    <header className="flex flex-col md:flex-row w-full bg-[#F8FAFC] dark:bg-[#0C111C] border-b border-[#E2E8F0] dark:border-[#1E293B] justify-between px-4 md:px-8 py-3 md:py-0 md:h-20 transition-colors duration-200 z-40">
      
      {/* Mobile Top Row: Hamburger, Logo, Avatar */}
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
        <div
          data-avatar="true"
          onClick={() => setShowProfile?.((prev) => !prev)}
          className="w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-[#CBD5E1] dark:hover:ring-[#334155]"
        >
          <img
            src={userInfo?.image || "../../public/userImage.jpg"}
            alt={userInfo?.name || "User"}
            referrerPolicy="no-referrer"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>

      {/* Left Side: Greeting */}
      <div className="mb-4 md:mb-0 md:flex md:flex-col md:justify-center">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-[#F8FAFC] transition-colors duration-200">
          Hi {userInfo?.name},
        </h1>
        <p className="text-sm text-gray-500 dark:text-[#94A3B8] transition-colors duration-200">
          Welcome to the Dashboard
        </p>
      </div>

      {/* Right Side: Actions & Desktop Avatar */}
      <div className="flex items-center gap-3 md:gap-5 w-full md:w-auto">
        <Button
          variant="none"
          size="none"
          onClick={() => setIsCard?.((p) => !p)}
          className="flex-1 cursor-pointer md:flex-none px-4 md:px-5 py-2.5 md:py-2 rounded-xl bg-[#4356D6] dark:bg-[#4F63FF] md:bg-[#EEF2F7] md:dark:bg-[#1E293B] text-white md:text-gray-700 md:dark:text-[#F8FAFC] hover:bg-[#3D4EC0] dark:hover:bg-[#6478FF] md:hover:bg-[#E2E8F0] md:dark:hover:bg-[#334155] font-medium transition-all duration-300 text-center"
        >
          Create
        </Button>
        <Button
          variant="none"
          size="none"
          onClick={onShare}
          className="flex-1 cursor-pointer md:flex-none px-4 md:px-5 py-2.5 md:py-2 rounded-xl bg-[#EEF2F7] dark:bg-[#1E293B] text-gray-700 dark:text-[#F8FAFC] hover:bg-[#E2E8F0] dark:hover:bg-[#334155] font-medium transition-all duration-300 text-center"
        >
          Share
        </Button>

        {/* Desktop Profile Avatar */}
        <div
          data-avatar="true"
          onClick={() => setShowProfile?.((prev) => !prev)}
          className="hidden md:block w-10 h-10 rounded-full cursor-pointer hover:ring-4 hover:ring-[#CBD5E1] dark:hover:ring-[#334155] transition-all duration-300"
        >
          <img
            src={userInfo?.image || "../../public/userImage.jpg"}
            alt={userInfo?.name || "User"}
            referrerPolicy="no-referrer"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>

    </header>
  );
}

export default Header;