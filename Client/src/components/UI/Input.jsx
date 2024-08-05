import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Función para obtener la fecha actual formateada en YYYY-MM-DD
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

export const Input = ({ className, defaultToNow, type, ...props }) => {
  const isDateType = type === "date";
  const defaultValue =
    isDateType && defaultToNow ? getCurrentDate() : undefined;

  const handleFocus = (e) => {
    if (isDateType) {
      e.target.type = "date";
      e.target.style.color = "";
    }
  };

  const handleBlur = (e) => {
    if (isDateType && !e.target.value) {
      e.target.type = "text";
      e.target.style.color = "transparent";
    }
  };

  return (
    <input
      type={isDateType ? "text" : type}
      className={twMerge(
        clsx(
          "bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-[#002846] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          className
        )
      )}
      autoComplete="off"
      defaultValue={defaultValue}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={isDateType && !defaultToNow ? { color: "transparent" } : {}}
      {...props}
    />
  );
};

export default Input;
