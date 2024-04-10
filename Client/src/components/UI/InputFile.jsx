import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const InputFile = ({ className, ...props }) => {
  return (
    <input
      className={twMerge(
        clsx(
          "w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400",
          className
        )
      )}
      type="file"
      {...props}
    />
  );
};

export default InputFile;
