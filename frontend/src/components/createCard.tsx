import { useState } from "react";
import Button from "./ui/button";
import Card from "./ui/card";
import Input from "./ui/input";
import { createContent } from "../api/content";
import toast from "react-hot-toast";

interface CreateCardTypes {
    setIsCard: React.Dispatch<React.SetStateAction<boolean>>;
    fetchLinks: () => Promise<void>;
    selectedTag:string;
    setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
}

const CreateCard = ({ setIsCard, fetchLinks ,setSelectedTag,selectedTag}: CreateCardTypes) => {
    // const [selectedTag, setSelectedTag] = useState("");

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [desc, setDesc] = useState("");

    const [error, setError] = useState("");
    const [urlError, setUrlError] = useState("");

    // --- URL Validation ---
    const platformDomains: Record<string, string[]> = {
        YouTube: ["youtube.com", "youtu.be"],
        LinkedIn: ["linkedin.com"],
        GitHub: ["github.com"],
        Twitter: ["twitter.com", "x.com"],
        Facebook: ["facebook.com"],
    };

    const validateUrl = (rawUrl: string, tag: string): string => {
        const trimmed = rawUrl.trim();

        if (!trimmed) return "";

        if (!trimmed.startsWith("https://") && !trimmed.startsWith("http://")) {
            return "URL must start with https:// or http://";
        }

        let parsed: URL;
        try {
            parsed = new URL(trimmed);
        } catch {
            return "Please enter a valid URL.";
        }

        // Reject bare protocol with no host (e.g. "https://")
        if (!parsed.hostname || parsed.hostname.length < 3) {
            return "Please enter a valid URL.";
        }

        // Platform-specific validation
        const allowedDomains = platformDomains[tag];
        if (allowedDomains) {
            const hostname = parsed.hostname.replace(/^www\./, "");
            const isAllowed = allowedDomains.some(
                (domain) => hostname === domain || hostname.endsWith("." + domain)
            );
            if (!isAllowed) {
                return `Please enter a valid ${tag} URL.`;
            }
        }

        return "";
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setUrl(val);
        setUrlError(validateUrl(val, selectedTag));
    };

    // Re-validate URL when the tag changes (platform check might change)
    const handleTagSelect = (tag: string) => {
        setSelectedTag(tag);
        if (url.trim()) {
            setUrlError(validateUrl(url, tag));
        }
    };

    // const isUrlValid = url.trim() !== "" && urlError === "";
    const isCreateDisabled = urlError !== "";

    const tags = [
        "YouTube",
        "LinkedIn",
        "Facebook",
        "GitHub",
        "Twitter",
        "Other",
    ];

    const handleCreate = async () => {
        if (!title.trim()) {
            setError("Title is required");
            return;
        }

        if (!url.trim()) {
            setError("URL is required");
            return;
        }

        const urlValidationError = validateUrl(url, selectedTag);
        if (urlValidationError) {
            setUrlError(urlValidationError);
            return;
        }

        if (desc.length > 80) {
            setError(`${desc.length}/80 - Description max 80 characters`);
            return;
        }

        if (!desc.trim()) {
            setError("Description is required");
            return;
        }

        if (!selectedTag) {
            setError("Please select one tag");
            return;
        }

        setError("");

        const data = {
            title,
            url,
            description: desc,
            tag: selectedTag,
        };

        // console.log(data);

        try {
            const response = await createContent(data);

            console.log(response.data);
            console.log(response.status);

            if (response.status === 200 || response.status === 201) {
                await fetchLinks();
                setIsCard?.(false);
            }
        } catch (error: any) {
            console.error(error);

            toast(
                error.response?.data?.msg ||
                "Something went wrong"
            );
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <Card variant="none" size="none" className="w-100 bg-white dark:bg-[#111827] rounded-2xl shadow-xl p-6 transition-colors duration-200">
                <div className="flex justify-end">
                    <Button
                        variant="none"
                        size="none"
                        onClick={() => setIsCard(false)}
                        className="text-gray-400 cursor-pointer hover:text-gray-800 dark:hover:text-[#F8FAFC] text-2xl leading-none transition-all duration-200"
                    >
                        ×
                    </Button>
                </div>

                <h2 className="text-xl font-semibold mb-4 dark:text-[#F8FAFC] transition-colors duration-200">Create New Link</h2>

                <Input
                    variant="none"
                    size="none"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border p-3 rounded-xl mb-3 bg-transparent dark:bg-[#0C111C] dark:border-[#1E293B] dark:text-[#F8FAFC] transition-colors duration-200"
                />

                <Input
                    variant="none"
                    size="none"
                    placeholder="Enter URL"
                    value={url}
                    onChange={handleUrlChange}
                    className={`w-full border p-3 rounded-xl bg-transparent dark:bg-[#0C111C] dark:text-[#F8FAFC] transition-colors duration-200 ${
                        urlError
                            ? "border-red-500 dark:border-red-500"
                            : "dark:border-[#1E293B]"
                    }`}
                />
                <p className="min-h-[20px] text-sm text-red-500 mt-1 mb-2">
                    {urlError || ""}
                </p>

                <textarea
                    placeholder="Enter description..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full border rounded-md p-3 resize-none bg-transparent dark:bg-[#0C111C] dark:border-[#1E293B] dark:text-[#F8FAFC] transition-colors duration-200"
                    rows={4}
                />

                <div className="grid grid-cols-3 gap-3 mb-4 mt-4">
                    {tags.map((tag) => (
                        <Button
                            key={tag}
                            variant="none"
                            size="none"
                            text={tag}
                            onClick={() => handleTagSelect(tag)}
                                className={`rounded-md cursor-pointer text-sm transition-all duration-300 px-3 py-2 ${selectedTag === tag
                                ? "bg-[#4356D6] dark:bg-[#4F63FF] text-white"
                                : "bg-[#EEF2F7] dark:bg-[#1E293B] text-[#475569] dark:text-[#94A3B8] hover:bg-[#E2E8F0] dark:hover:bg-[#334155]"
                                }`}
                        />
                    ))}
                </div>

                <p className="min-h-[20px] text-sm text-red-500 mb-3 mt-1">
                    {error || ""}
                </p>

                <div className="flex justify-end gap-3">
                    <Button
                        variant="none"
                        size="none"
                        onClick={() => setIsCard(false)}
                        className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-[#1E293B] text-gray-800 dark:text-[#F8FAFC] hover:bg-gray-300 dark:hover:bg-[#334155] cursor-pointer transition-all duration-300"
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="none"
                        size="none"
                        onClick={handleCreate}
                        disabled={isCreateDisabled}
                        className={`px-4 py-2 rounded-xl text-white transition-all duration-300 ${
                            isCreateDisabled
                                ? "bg-blue-400 dark:bg-[#4F63FF]/50 cursor-not-allowed opacity-60"
                                : "bg-blue-600 dark:bg-[#4F63FF] hover:bg-blue-700 dark:hover:bg-[#6478FF] cursor-pointer"
                        }`}
                    >
                        Create
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default CreateCard;