import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const InputFile = ({ className, ...props }) => {
  return (
    <input
      className={twMerge(
        clsx(
          "w-auto text-xs border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50",
          className
        )
      )}
      type="file"
      {...props}
    />
  );
};

export default InputFile;
