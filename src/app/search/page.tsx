import UserSearch from "@/components/UserSearch";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "User Search",
  description: "Serach users to follow",
};

export default function SearchPage() {
  return <UserSearch />;
}
