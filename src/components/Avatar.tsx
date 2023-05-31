type Props = {
  image?: string | null;
  size?: "small" | "normal" | "large" | "xlarge";
  highlight?: boolean;
};

export default function Avatar({
  image,
  size = "normal",
  highlight = false,
}: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      <img
        className={`object-cover rounded-full ${getImageSizeStyle(size)}`}
        src={image ?? undefined}
        alt='user profile'
        referrerPolicy='no-referrer'
      />
    </div>
  );
}

const getContainerStyle = (size: string, highlight: boolean): string => {
  const baseStyle = "rounded-full flex justify-center items-center";
  const highlightStyle = highlight
    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
    : "";
  const sizeStyle = getContainerSize(size);
  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
};

const getContainerSize = (size: string): string | undefined => {
  switch (size) {
    case "small":
      return "w-9 h-9";
    case "normal":
      return "w-[62px] h-[62px]";
    case "large":
      return "w-[124px] h-[124px]";
  }
};

const getImageSizeStyle = (size: string): string | undefined => {
  switch (size) {
    case "small":
      return "w-[34px] h-[34px] p-[1px]";
    case "normal":
      return "w-[60px] h-[60px] p-[2px]";
    case "large":
      return "w-[120px] h-[120px] p-[2px]";
  }
};
