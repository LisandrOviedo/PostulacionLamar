import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const Radio = ({ className, ...props }) => {
  return (
    <input
      className={twMerge(
        clsx(
          "h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-700",
          className
        )
      )}
      type="radio"
      {...props}
    />
  );
};

export default Radio;
