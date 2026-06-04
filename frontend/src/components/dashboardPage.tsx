import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ProfileCard from "./ProfileCard";
import CreateCard from "./createCard";
import LinkCard from "./linkCard";
import { getContentByTag } from "../api/tags";
import { shareContent } from "../api/share";
import { deleteContent } from "../api/content";
import ShareCard from "./shareCard";
import Card from "./ui/card";

export interface User {
  name: string;
  email: string;
  image: string;
  token: string;
}
interface Link {
  _id: string;
  title: string;
  url: string;
  description: string;
  tag: string;
}

const CardSkeleton = () => (
  <Card variant="none" size="none" className="bg-white dark:bg-[#1E293B] rounded-xl p-4 shadow-sm animate-pulse border border-gray-100 dark:border-gray-800">
    <div className="flex justify-between items-start mb-4">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-10"></div>
    </div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
    <div className="flex gap-2">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
    </div>
  </Card>
);

function Dashboard() {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [isCard, setIsCard] = useState(false);
  const [selectedTag, setSelectedTag] = useState("YouTube");
  const [links, setLinks] = useState<Link[]>([]);
  const [showShareCard, setShowShareCard] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isCardsLoading, setIsCardsLoading] = useState(false);

  const profileCardRef = useRef<HTMLDivElement | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLinks();
  }, [selectedTag]);

  const handleLogout = () => {
    localStorage.removeItem("user-info");
    navigate("/");
  };

  const fetchLinks = async () => {
    try {
      if (!isInitialLoad) setIsCardsLoading(true);

      const response = await getContentByTag(selectedTag);

      setLinks(response.data.links);
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setIsInitialLoad(false);
      setIsCardsLoading(false);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("user-info");

    if (data) {
      const userData = JSON.parse(data);
      setUserInfo(userData);
    }
  }, []);

  const handleShare = async () => {
    const response = await shareContent();

    setShareUrl(response.data.shareUrl);
    setShowShareCard(true);
  };

  const handleDelete = async (_id: string) => {
    try {
      await deleteContent(_id);

      setLinks((prev) =>
        prev.filter((link) => link._id !== _id)
      );
    } catch (error) {
      console.log(error);
      // toast(error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;

      const isOutside = profileCardRef.current ? !profileCardRef.current.contains(target) : true;
      const isAvatar = target.closest('[data-avatar="true"]');

      if (
        isOutside &&
        !isAvatar
      ) {
        setShowProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isInitialLoad) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-[#F5F7FA] dark:bg-[#0F172A]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-[#F5F7FA] dark:bg-[#0F172A] flex overflow-hidden transition-colors duration-200">

      <Sidebar
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Header
          userInfo={userInfo}
          setShowProfile={setShowProfile}
          avatarRef={avatarRef}
          setIsCard={setIsCard}
          onShare={handleShare}
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />

        <main className="flex-1 min-w-0 overflow-y-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 pb-24 md:pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
            {isCardsLoading ? (
              [...Array(6)].map((_, i) => <CardSkeleton key={i} />)
            ) : (
              links.map((link) => (
                <LinkCard
                  key={link._id}
                  _id={link._id}
                  title={link.title}
                  url={link.url}
                  description={link.description}
                  tag={link.tag}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </main>

        {showProfile && (
          <div ref={profileCardRef} className="absolute top-20 md:top-24 right-4 md:right-6 z-50">
            <ProfileCard
              userInfo={userInfo}
              handleLogout={handleLogout}
              setShowProfile={setShowProfile}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      {isCard && (
        <CreateCard
          setSelectedTag={setSelectedTag}
          selectedTag={selectedTag}
          setIsCard={setIsCard}
          fetchLinks={fetchLinks}
        />
      )}

      {showShareCard && (
        <ShareCard
          shareUrl={shareUrl}
          shareType="dashboard"
          onClose={() => setShowShareCard(false)}
        />
      )}

    </div>
  );
}

export default Dashboard;