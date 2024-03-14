import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const Title = ({ className, children, ...props }) => {
  return (
    <h1
      className={twMerge(
        clsx("text-lg sm:text-xl font-bold text-center", className)
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

export default Title;
