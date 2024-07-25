import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const Date = ({ className, ...props }) => {
  return (
    <input
      className={twMerge(
        clsx(
          "bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-[#002846] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          className
        )
      )}
      autoComplete="off"
      {...props}
    />
  );
};

export default Date;
