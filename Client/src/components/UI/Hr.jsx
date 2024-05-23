import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const Hr = ({ className, ...props }) => {
  return (
    <hr
      className={twMerge(
        clsx("w-[80%] h-0.5 my-5 bg-gray-300 border-0 m-auto", className)
      )}
      {...props}
    />
  );
};

export default Hr;
