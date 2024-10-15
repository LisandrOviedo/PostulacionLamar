import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const TextArea = ({ className, errors, ...props }) => {
  return (
    <textarea
      className={twMerge(
        clsx(
          `text-sm resize-none block w-full rounded-lg bg-gray-50 border ${
            errors ? "border-[#ff1a1a]" : "border-gray-400"
          } py-1.5 text-gray-900`,
          className
        )
      )}
      autoComplete="off"
      maxLength="255"
      {...props}
    />
  );
};

export default TextArea;
