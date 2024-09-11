import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const Span = ({ className, children, ...props }) => {
  return (
    <span
      className={twMerge(
        clsx("block mb-2 text-sm font-medium text-gray-900", className)
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Span;
