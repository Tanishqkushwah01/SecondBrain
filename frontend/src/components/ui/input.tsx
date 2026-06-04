export type InputSize = "sm" | "md" | "lg" | "none";
export type InputVariant = "Dark" | "Light" | "none";

export interface InputTypes extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  variant?: InputVariant;
}

const defaultStyle = `
  w-full
  rounded-2xl
  border-2
  outline-none
  transition-all
`;

const inputSizeClasses = {
  sm: "p-2 text-sm",
  md: "p-4 text-base",
  lg: "p-6 text-lg",
};

const inputVariantClasses = {
  Dark: `
    bg-black
    text-white
    border-gray-700
    placeholder:text-gray-400
  `,

  Light: `
    bg-[#F8F9FA]
    text-black
    border-gray-300
    placeholder:text-gray-500
  `,
};

function Input({
  type = "text",
  placeholder = "Enter text",
  size = "md",
  variant = "Light",
  className = "",
  ...props
}: InputTypes) {
  const isNone = size === "none" && variant === "none";
  const baseClass = isNone ? "" : defaultStyle;
  const appliedSizeClass = size === "none" ? "" : inputSizeClasses[size] || "";
  const appliedVariantClass = variant === "none" ? "" : inputVariantClasses[variant] || "";

  return (
    <input
      type={type}
      placeholder={placeholder}
      {...props}
      className={`
        ${baseClass}
        ${appliedSizeClass}
        ${appliedVariantClass}
        ${className}
      `.trim()}
    />
  );
}

export default Input;