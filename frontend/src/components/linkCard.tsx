import { useState, useEffect } from "react";
import ShareCard from "./shareCard";
import DeleteCard from "./deleteCard";
import Button from "./ui/button";
import Card from "./ui/card";

interface CardProps {
  _id: string;
  title: string;
  url: string;
  tag: string;
  description: string;
  isPublic?: boolean;
  onDelete?: (id: string) => void;
}

function LinkCard({ title, url, description, tag, _id, onDelete, isPublic }: CardProps) {

  const [showDeleteCard, setShowDeleteCard] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);
  const [isEmbeddable, setIsEmbeddable] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (tag === "YouTube") {
      fetch(`https://noembed.com/embed?url=${url}`)
        .then(res => res.json())
        .then(data => {
          if (isMounted) setIsEmbeddable(!data.error);
        })
        .catch(() => {
          if (isMounted) setIsEmbeddable(true);
        });
    }
    return () => { isMounted = false; };
  }, [url, tag]);

  const getYoutubeEmbed = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return "saved-link";
    }
  };

  const getFavicon = (url: string) => {
    return `https://www.google.com/s2/favicons?domain=${getDomain(url)}&sz=128`;
  };

  const getGithubRepoName = (url: string) => {
    const match = url.match(/github\.com\/([^/]+)\/([^/?#]+)/);
    return match ? `${match[1]}/${match[2]}` : "GitHub Repository";
  };

  const PreviewCard = ({
    icon,
    heading,
    subText,
    bg,
  }: {
    icon: string;
    heading: string;
    subText: string;
    bg: string;
  }) => (
    <Card variant="none" size="none"
      className={`w-full h-36 md:h-48 lg:h-56 rounded-xl border dark:border-[#1E293B] p-3 md:p-4 lg:p-5 flex flex-col justify-between dark:bg-[#0C111C] transition-colors duration-200 ${bg}`}
    >
      <div className="flex justify-between items-start gap-2 min-w-0">
        <div className="min-w-0 flex-1">
          <p className="text-xs md:text-sm text-gray-500 dark:text-[#94A3B8] transition-colors duration-200">{tag}</p>
          <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-[#F8FAFC] mt-1 md:mt-2 break-words transition-colors duration-200">
            {heading}
          </h3>
        </div>

        <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl bg-white dark:bg-[#111827] flex items-center justify-center text-xl md:text-2xl lg:text-3xl shadow-sm transition-colors duration-200 flex-shrink-0">
          {icon}
        </div>
      </div>

      <div className="min-w-0">
        <p className="text-xs md:text-sm text-gray-600 dark:text-[#94A3B8] line-clamp-2 transition-colors duration-200">{subText}</p>
        <p className="text-xs text-gray-500 dark:text-[#94A3B8] mt-2 break-all transition-colors duration-200 truncate">
          {getDomain(url)}
        </p>
      </div>
    </Card>
  );

  const renderPreview = () => {
    if (tag === "YouTube") {
      const embedUrl = getYoutubeEmbed(url);

      if (isEmbeddable === false) {
        return (
          <Card variant="none" size="none" className="w-full h-36 md:h-48 lg:h-56 rounded-xl border dark:border-[#1E293B] bg-linear-to-br from-purple-50 to-gray-100 dark:bg-none dark:bg-[#0C111C] p-3 md:p-4 lg:p-5 flex flex-col justify-between transition-colors duration-200">
            <div className="flex justify-between items-start gap-2 min-w-0">
              <div className="min-w-0 flex-1">
                <p className="text-xs md:text-sm text-gray-500 dark:text-[#94A3B8] transition-colors duration-200">Website Link</p>
                <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-[#F8FAFC] mt-1 md:mt-2 break-words transition-colors duration-200 line-clamp-2">
                  {title}
                </h3>
              </div>

              <img
                src={getFavicon(url)}
                alt="favicon"
                className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl bg-white dark:bg-[#111827] p-1 md:p-2 shadow-sm transition-colors duration-200 flex-shrink-0"
              />
            </div>

            <div className="min-w-0">
              <p className="text-xs md:text-sm text-gray-600 dark:text-[#94A3B8] line-clamp-2 transition-colors duration-200">{description}</p>
              <p className="text-xs text-gray-500 dark:text-[#94A3B8] mt-2 break-all transition-colors duration-200 truncate">
                {getDomain(url)}
              </p>
            </div>
          </Card>
        );
      }

      return (
        <div className="relative w-full h-36 md:h-48 lg:h-56 rounded-xl overflow-hidden border dark:border-[#1E293B]">
          {isEmbeddable === null && (
            <div className="absolute inset-0 bg-gray-100 dark:bg-[#0C111C] animate-pulse flex items-center justify-center transition-colors duration-200">
              <svg className="w-8 h-8 text-gray-300 dark:text-gray-700" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          )}
          {isEmbeddable && (
            <iframe
              src={embedUrl || url}
              className="w-full h-full transition-colors duration-200 bg-black"
              title="YouTube Video"
              allowFullScreen
            />
          )}
        </div>
      );
    }

    if (tag === "LinkedIn") {
      return (
        <PreviewCard
          icon="💼"
          heading="LinkedIn Post"
          subText={description || "Professional post saved in your second brain."}
          bg="bg-blue-50"
        />
      );
    }

    if (tag === "Facebook") {
      return (
        <PreviewCard
          icon="📘"
          heading="Facebook Post"
          subText={description || "Social post saved for later reference."}
          bg="bg-sky-50"
        />
      );
    }

    if (tag === "Twitter") {
      return (
        <PreviewCard
          icon="𝕏"
          heading="Twitter / X Post"
          subText={description || "Tweet saved in your second brain."}
          bg="bg-gray-100"
        />
      );
    }

    if (tag === "GitHub") {
      return (

        <Card variant="none" size="none" className="w-full h-36 md:h-48 lg:h-56 rounded-xl border dark:border-[#1E293B] bg-gray-950 dark:bg-[#0C111C] text-white p-3 md:p-4 lg:p-5 flex flex-col justify-between transition-colors duration-200">
          <div className="flex justify-between items-start gap-2 min-w-0">
            <div className="min-w-0 flex-1">
              <p className="text-xs md:text-sm text-gray-400 dark:text-[#94A3B8] transition-colors duration-200">GitHub Repository</p>
              <h3 className="text-base md:text-lg lg:text-xl font-bold mt-1 md:mt-2 break-words dark:text-[#F8FAFC] transition-colors duration-200 line-clamp-2">
                {getGithubRepoName(url)}
              </h3>
            </div>
            <div className="text-2xl md:text-3xl lg:text-4xl dark:text-[#F8FAFC] flex-shrink-0">{"</>"}</div>
          </div>

          <div className="min-w-0">
            <p className="text-xs md:text-sm text-gray-300 dark:text-[#94A3B8] break-all transition-colors duration-200 truncate">{getDomain(url)}</p>
            <div className="flex gap-2 md:gap-4 mt-2 md:mt-3 text-xs md:text-sm text-gray-300 dark:text-[#94A3B8] transition-colors duration-200">
              <span>⭐ Repo</span>
              <span>🌿 Code</span>
              <span className="hidden md:block">📦 Project</span>
            </div>
          </div>
        </Card>
      );
    }


    return (
      <Card variant="none" size="none" className="w-full h-36 md:h-48 lg:h-56 rounded-xl border dark:border-[#1E293B] bg-linear-to-br from-purple-50 to-gray-100 dark:bg-none dark:bg-[#0C111C] p-3 md:p-4 lg:p-5 flex flex-col justify-between transition-colors duration-200">
        <div className="flex justify-between items-start gap-2 min-w-0">
          <div className="min-w-0 flex-1">
            <p className="text-xs md:text-sm text-gray-500 dark:text-[#94A3B8] transition-colors duration-200">Website Link</p>
            <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-[#F8FAFC] mt-1 md:mt-2 break-words transition-colors duration-200 line-clamp-2">
              {title}
            </h3>
          </div>

          <img
            src={getFavicon(url)}
            alt="favicon"
            className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl bg-white dark:bg-[#111827] p-1 md:p-2 shadow-sm transition-colors duration-200 flex-shrink-0"
          />
        </div>

        <div className="min-w-0">
          <p className="text-xs md:text-sm text-gray-600 dark:text-[#94A3B8] line-clamp-2 transition-colors duration-200">{description}</p>
          <p className="text-xs text-gray-500 dark:text-[#94A3B8] mt-2 break-all transition-colors duration-200 truncate">
            {getDomain(url)}
          </p>
        </div>
      </Card>
    );
  };

  return (
    <Card variant="none" size="none" className="w-full bg-white dark:bg-[#111827] rounded-2xl shadow-md dark:border dark:border-[#1E293B] p-3 md:p-4 lg:p-5 flex flex-col h-full overflow-hidden transition-colors duration-200">
      <div className="mb-3 md:mb-4 min-w-0">{renderPreview()}</div>

      <div className="flex justify-between items-start gap-2 min-w-0">
        <h2 className="font-bold md:text-lg lg:text-xl break-words dark:text-[#F8FAFC] transition-colors duration-200 min-w-0">{title}</h2>

        <span 
          onClick={() => setShowShareCard(true)}
          className="bg-gray-100 dark:bg-[#1E293B] dark:text-[#94A3B8] px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm shrink-0 transition-colors duration-200 cursor-pointer hover:bg-[#3D4EC0] dark:hover:bg-[#6478FF] md:hover:bg-[#E2E8F0] md:dark:hover:bg-[#334155]"
        >
          Share
        </span>
      </div>

      <p className="mt-2 md:mt-3 text-xs md:text-sm text-gray-600 dark:text-[#94A3B8] break-words line-clamp-3 md:line-clamp-4 transition-colors duration-200">
        {description}
      </p>

      <div className="mt-auto flex justify-between items-center pt-4 md:pt-5">
        <Button
          variant="none"
          size="none"
          onClick={() => window.open(url, "_blank")}
          className="text-blue-600 dark:text-[#4F7BFF] cursor-pointer font-semibold transition-colors duration-200"
        >
          Open
        </Button>


        {!isPublic && (
          <Button
            variant="none"
            size="none"
            onClick={() => setShowDeleteCard(true)} text="Delete"
            className="text-red-500 dark:text-[#FF4D5A] cursor-pointer font-semibold transition-colors duration-200" />
        )}

      </div>

      {showDeleteCard && (
        <DeleteCard
          title={title}
          link={url}
          onClose={() => setShowDeleteCard(false)}
          onDelete={() => {
            onDelete?.(_id);
            setShowDeleteCard(false);
          }}
        />
      )}

      {showShareCard && (
        <ShareCard
          shareUrl={url}
          shareType="link"
          onClose={() => setShowShareCard(false)}
        />
      )}
    </Card>
  );
}

export default LinkCard;