

type ButtonSize = "sm" | "md" | "lg" | "none";
type ButtonVariant = "Dark" | "Light" | "none";
// type BtnType = "submit" | "reset" | "button";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  StartingIcon?: React.ReactNode;
  EndingIcon?: React.ReactNode;
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};
const variantClasses = {
  Dark: "bg-purple-300 dark:bg-[#1E293B] dark:text-[#F8FAFC] dark:hover:bg-[#334155] transition-colors duration-200",
  Light: "bg-[#4356D6] dark:bg-[#4F63FF] text-white dark:hover:bg-[#6478FF] transition-colors duration-200",
};

function Button({
  text,
  variant = "Light",
  size = "md",
  className = "",
  StartingIcon,
  EndingIcon,
  children,
  ...props
}: ButtonProps) {
  const appliedVariantClass = variant === "none" ? "" : variantClasses[variant] || "";
  const appliedSizeClass = size === "none" ? "" : sizeClasses[size] || "";
  const content = children || text;

  return (
    <button
      {...props}
      className={`${appliedVariantClass} ${appliedSizeClass} ${className}`.trim()}
    >
      {StartingIcon} {content} {EndingIcon}
    </button>
  );
}

export default Button;
