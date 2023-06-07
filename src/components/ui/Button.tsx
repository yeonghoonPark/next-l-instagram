type Props = {
  text: string;
  onClick: () => void;
  isRed?: boolean;
  isDisabled?: boolean;
};

export default function Button({
  text,
  onClick,
  isRed,
  isDisabled = false,
}: Props) {
  return (
    <button
      onClick={() => onClick()}
      className={`border-none rounded-md py-2 px-8 text-white font-bold leading-4 ${
        isRed ? "bg-red-500" : "bg-sky-500"
      } ${isDisabled && "opacity-50"}`}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}
