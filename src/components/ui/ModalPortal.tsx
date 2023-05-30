import reactDom from "react-dom";

type Props = {
  children: React.ReactNode;
};

export default function ModalPortal({ children }: Props) {
  // ssr에서 작동 방지
  if (typeof window === "undefined") return null;

  const el = document.getElementById("portal") as Element;
  return reactDom.createPortal(children, el);
}
