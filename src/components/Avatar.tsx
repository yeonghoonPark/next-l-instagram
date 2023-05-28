type Props = {
  image?: string | null;
  size?: "small" | "normal";
  highlight?: boolean;
};

export default function Avatar({
  image,
  size = "small",
  highlight = true,
}: Props) {
  return (
    <div className={containerStyle(size, highlight)}>
      <img
        className='rounded-full'
        src={image ?? undefined}
        alt='user profile'
        referrerPolicy='no-referrer'
      />
    </div>
  );
}

const containerStyle = (size: string, highlight: boolean): string => {
  const baseStyle = "rounded-full p-[3px]";
  const sizeStyle = size === "small" ? "w-9 h-9 " : "w-[68px] h-[68px]";
  const highlightStyle = highlight
    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 "
    : "";
  return `${baseStyle} ${sizeStyle} ${highlightStyle}`;
};
