import { MdGridOn } from "react-icons/md";

type Props = {
  className?: string;
};

export default function PostIcon({ className }: Props) {
  return <MdGridOn className={className || "w-6 h-6"} />;
}
