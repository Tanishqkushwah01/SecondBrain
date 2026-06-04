import type { User } from "./dashboardPage";
import Button from "./ui/button";
import Card from "./ui/card";

interface ProfileCardProps {
  userInfo: User | null;
  handleLogout: () => void;
  setShowProfile: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

function ProfileCard({
  userInfo,
  handleLogout,
  setShowProfile,
}: ProfileCardProps) {
  return (
    <Card variant="none" size="none" className="w-[92vw] max-w-[430px] max-h-[85vh] overflow-y-auto bg-[#F8FAFC] dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] rounded-3xl shadow-xl p-6 md:p-7 text-gray-800 dark:text-[#F8FAFC] transition-colors duration-200">

      {/* Cross Button */}
      <div className="flex justify-end">
        <Button
          variant="none"
          size="none"
          onClick={() => setShowProfile(false)}
          className="text-gray-400 cursor-pointer hover:text-gray-800 dark:hover:text-[#F8FAFC] text-2xl leading-none transition-all duration-200"
        >
          ×
        </Button>
      </div>

      {/* Email */}
      <p className="text-center text-xs md:text-sm text-gray-500 dark:text-[#94A3B8] mb-4 md:mb-6 break-all transition-colors duration-200">
        {userInfo?.email}
      </p>

      {/* Profile */}
      <div className="flex flex-col items-center mb-6 md:mb-8">

        <img
          src={userInfo?.image}
          alt={userInfo?.name}
          className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover ring-4 ring-[#CBD5E1] dark:ring-[#1E293B] mb-3 md:mb-4 transition-colors duration-200"
        />

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold dark:text-[#F8FAFC] transition-colors duration-200 break-words text-center">
          {userInfo?.name}
        </h1>

        <p className="text-gray-500 dark:text-[#94A3B8] mt-1 transition-colors duration-200">
          Welcome Back 👋
        </p>

      </div>

      {/* Extra Section */}
      <div className="bg-[#EEF2F7] dark:bg-[#0C111C] rounded-2xl px-5 py-4 mb-5 transition-colors duration-200">

        <h3 className="font-semibold text-gray-700 dark:text-[#F8FAFC] mb-1 transition-colors duration-200">
          Dashboard Access
        </h3>

        <p className="text-sm text-gray-500 dark:text-[#94A3B8] transition-colors duration-200">
          You are successfully logged in.
        </p>

      </div>

      {/* Logout Button */}
      <Button
        variant="none"
        size="none"
        text="Logout"
        onClick={handleLogout}
         className="w-full py-3 cursor-pointer rounded-2xl bg-[#4F46E5] dark:bg-[#1E293B] text-white dark:text-[#F8FAFC] font-medium hover:bg-[#4338CA] dark:hover:bg-[#334155] transition-all duration-300"
    
      />

    </Card>
  );
}

export default ProfileCard;