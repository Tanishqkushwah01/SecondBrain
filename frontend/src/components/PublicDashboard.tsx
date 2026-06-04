import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSharedDashboard } from "../api/share";
import Sidebar from "../components/Sidebar";
import LinkCard from "../components/linkCard";
import PublicHeader from "../components/PublicHeader";

interface CardType {
    _id: string;
    title: string;
    url: string;
    tag: string;
    description: string;
}

function PublicDashboard() {
    const { hash } = useParams();
    const [cards, setCards] = useState<CardType[]>([]);
    const [adminName, setAdminName] = useState("Admin");
    const [selectedTag, setSelectedTag] = useState("YouTube");
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const fetchSharedDashboard = async () => {
            try {
                if (hash) {
                    const res = await getSharedDashboard(hash);
                    setAdminName(res.data.adminName || "Admin");
                    setCards(res.data.cards || []);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsInitialLoad(false);
            }
        };

        fetchSharedDashboard();
    }, [hash]);

    const filteredCards = cards.filter(
        (card) => card.tag === selectedTag
    );

    if (isInitialLoad) {
        return (
            <div className="flex justify-center items-center h-screen w-screen transition-colors duration-200 bg-[#F8F9FA] dark:bg-[#0F172A]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-screen overflow-hidden transition-colors duration-200 bg-[#F8F9FA] dark:bg-[#0F172A]">
            <Sidebar
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            <div className="flex-1 flex flex-col overflow-hidden relative">
                <PublicHeader
                    adminName={adminName}
                    onMenuClick={() => setIsMobileMenuOpen(true)}
                />

                <main className="flex-1 min-w-0 overflow-y-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 pb-24 md:pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
                        {filteredCards.map((card) => (
                            <LinkCard
                                key={card._id}
                                _id={card._id}
                                title={card.title}
                                url={card.url}
                                description={card.description}
                                tag={card.tag}
                                isPublic={true}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default PublicDashboard;