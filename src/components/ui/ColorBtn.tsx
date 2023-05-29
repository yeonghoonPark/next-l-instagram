type Props = {
  text: string;
  onClick: () => void;
  size?: "small" | "big";
};

export default function ColorBtn({ text, onClick, size = "small" }: Props) {
  return (
    <div
      className={`bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md
    ${size === "big" ? "p-[3px]" : "p-[2px]"}
    `}
    >
      <button
        className={`bg-white hover:opacity-90 transition-opacity
        ${size === "big" ? "text-2xl py-[6px] px-[18px]" : "py-[2px] px-[6px]"}
        `}
        type='button'
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
