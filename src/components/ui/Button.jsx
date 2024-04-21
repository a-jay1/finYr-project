import Image from "next/image";
import { twMerge } from "tailwind-merge";

const Button = ({
  btnText = "Next",
  noFill = false,
  classNames = "py-3 px-12",
  variant = "white",
  isLoading = false,
  isDisabled = false,
  onClick,
  imageSrc = "",
  hideButton,
  type = "button",
}) => {
  const styles = {
    base: "flex justify-center items-center gap-2 py-3 rounded-lg transition-all duration-150 disabled:cursor-not-allowed",
    filled: {
      yellow: "bg-yellow-400 text-[#231f20]",
      orange: "bg-orange-50",
      white: "bg-white-50 text-[#231f20]",
    },
    nofill: "",
  };

  return (
    <>
      <button
        className={twMerge(
          `${styles.base} ${
            !noFill ? styles.filled[variant] : styles.nofill
          } ${classNames}`
        )}
        onClick={() => onClick?.()}
        disabled={isDisabled}
        type={type}
      >
        <p className="flex gap-2">
          {imageSrc && <Image src={imageSrc} alt="Next Icon" width={22} height={22} /> }
          {btnText}
        </p>
      </button>
    </>
  );
};

export default Button;
