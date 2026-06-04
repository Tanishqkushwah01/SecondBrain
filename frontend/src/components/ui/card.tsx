export type CardSize = "sm" | "md" | "lg" | "none";
export type CardVariant = "Dark" | "Light" | "none";

export interface CardTypes extends React.HTMLAttributes<HTMLDivElement> {
    text?: React.ReactNode;
    size?: CardSize;
    variant?: CardVariant;
}

const defaultStyle = "rounded-3xl border-2 flex flex-col gap-6";

const cardSizeClasses = {
    sm: "w-[300px] p-4",
    md: "w-[500px] p-6",
    lg: "w-[700px] p-8",
};

const cardVariantClasses = {
    Dark: "bg-black dark:bg-[#111827] text-white dark:text-[#F8FAFC] border-gray-700 dark:border-[#1E293B] transition-colors duration-200",
    Light: "bg-[#F8F9FA] dark:bg-[#111827] text-black dark:text-[#F8FAFC] border-gray-300 dark:border-[#1E293B] shadow-sm transition-colors duration-200",
};

function Card({
    children,
    size = "md",
    variant = "Light",
    className = "",
    text,
    ...props
}: CardTypes) {
    const isNone = size === "none" && variant === "none";
    const baseClass = isNone ? "" : defaultStyle;
    const appliedSizeClass = size === "none" ? "" : cardSizeClasses[size] || "";
    const appliedVariantClass = variant === "none" ? "" : cardVariantClasses[variant] || "";

    return (
        <div
            {...props}
            className={`${baseClass} ${appliedSizeClass} ${appliedVariantClass} ${className}`.trim()}
        >
            {text}
            {children}
        </div>
    );
}

export default Card;