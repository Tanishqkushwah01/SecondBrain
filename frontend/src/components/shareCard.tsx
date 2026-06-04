import toast from "react-hot-toast";
import Button from "./ui/button";
import Card from "./ui/card";

interface ShareCardProps {
  shareUrl: string;
  shareType?: "dashboard" | "link";
  onClose: () => void;
}

function ShareCard({ shareUrl, shareType = "dashboard", onClose }: ShareCardProps) {
  const isDashboard = shareType === "dashboard";
  const text = isDashboard 
    ? `Check my Second Brain dashboard: ${shareUrl}` 
    : `Check out this link: ${shareUrl}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    toast("Link copied");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <Card variant="none" size="none" className="bg-white dark:bg-[#111827] dark:border dark:border-[#1E293B] rounded-2xl shadow-xl p-6 w-[420px] transition-colors duration-200">
        <div className="flex justify-end">
          <Button
            variant="none"
            size="none"
            onClick={onClose}
            className="text-gray-400 cursor-pointer hover:text-gray-800 dark:hover:text-[#F8FAFC] text-2xl leading-none transition-all duration-200"
          >
            ×
          </Button>
        </div>
        <h2 className="text-xl font-bold mb-2 dark:text-[#F8FAFC] transition-colors duration-200">
          {isDashboard ? "Share Dashboard" : "Share Link"}
        </h2>


        <p className="text-gray-500 dark:text-[#94A3B8] text-sm mb-4 transition-colors duration-200">
          {isDashboard 
            ? "Anyone with this link can view your dashboard." 
            : "Anyone with this link can view this shared content."}
        </p>

        <div className="bg-gray-100 dark:bg-[#0C111C] dark:text-[#F8FAFC] p-3 rounded-lg text-sm break-all mb-4 transition-colors duration-200">
          {shareUrl}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="none" size="none" onClick={copyLink} className="bg-gray-100 cursor-pointer dark:bg-[#1E293B] dark:text-[#F8FAFC] dark:hover:bg-[#334155] p-3 rounded-lg transition-colors duration-200">
            Copy Link
          </Button>

          <Button
            variant="none"
            size="none"
            onClick={() =>
              window.open(
                `https://wa.me/?text=${encodeURIComponent(text)}`,
                "_blank"
              )
            }
            className="bg-green-100 dark:bg-[#1E293B] cursor-pointer dark:text-[#F8FAFC] dark:hover:bg-[#334155] p-3 rounded-lg transition-colors duration-200"
          >
            WhatsApp
          </Button>

          <Button
            variant="none"
            size="none"
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl
                )}`,
                "_blank"
              )
            }
            className="bg-blue-100 dark:bg-[#1E293B] cursor-pointer dark:text-[#F8FAFC] dark:hover:bg-[#334155] p-3 rounded-lg transition-colors duration-200"
          >
            Facebook
          </Button>

          <Button
            variant="none"
            size="none"
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  text
                )}`,
                "_blank"
              )
            }
            className="bg-gray-100 dark:bg-[#1E293B] cursor-pointer dark:text-[#F8FAFC] dark:hover:bg-[#334155] p-3 rounded-lg transition-colors duration-200"
          >
            Twitter / X
          </Button>

          <Button
            variant="none"
            size="none"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: isDashboard ? "Second Brain Dashboard" : "Shared Link",
                  text: isDashboard ? "Check my dashboard" : "Check out this link",
                  url: shareUrl,
                });
              }
            }}
            className="bg-purple-100 dark:bg-[#1E293B] cursor-pointer dark:text-[#F8FAFC] dark:hover:bg-[#334155] p-3 rounded-lg col-span-2 transition-colors duration-200"
          >
            More Options
          </Button>
        </div>

        <Button
          variant="none"
          size="none"
          onClick={onClose}
          className="mt-5 w-full bg-black cursor-pointer dark:bg-[#4F63FF] dark:hover:bg-[#6478FF] text-white py-2 rounded-lg transition-colors duration-200"
        >
          Close
        </Button>
      </Card>
    </div>
  );
}

export default ShareCard;