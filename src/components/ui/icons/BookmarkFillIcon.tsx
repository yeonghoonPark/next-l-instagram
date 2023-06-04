import { RiBookMarkFill } from "react-icons/ri";

type Props = {
  className?: string;
};

export default function BookmarkFillIcon({ className }: Props) {
  return <RiBookMarkFill className={className || "w-6 h-6"} />;
}
