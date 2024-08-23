import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const CheckBox = ({ className, ...props }) => {
  return (
    <input
      type="checkbox"
      className={twMerge(
        clsx(
          "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500",
          className
        )
      )}
      {...props}
    />
  );
};

export default CheckBox;
