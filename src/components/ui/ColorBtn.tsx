type Props = {
  text: string;
  onClick: () => void;
  size?: "small" | "big";
};

export default function ColorBtn({ text, onClick, size = "small" }: Props) {
  return (
    <div
      className={`bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md
    ${size === "big" ? "p-[5px]" : "p-[3px]"}
    `}
    >
      <button
        className={`bg-white hover:opacity-90 transition-opacity
        ${size === "big" ? "py-[4px] px-[12px] text-2xl" : "py-[2px] px-[6px]"}
        `}
        type='button'
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
