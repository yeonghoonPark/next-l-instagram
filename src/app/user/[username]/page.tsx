import UserPost from "@/components/UserPost";
import UserProfile from "@/components/UserProfile";
import { getUserForProfile } from "@/service/user";
import { Metadata } from "next";
import notFound from "./not-fonund";

type Props = {
  params: { username: string };
};

export default async function page({ params: { username } }: Props) {
  const user = await getUserForProfile(username);

  if (!user) {
    notFound();
  }

  return (
    <section>
      <UserProfile user={user} />
      <UserPost user={user} />
    </section>
  );
}

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const user = await getUserForProfile(username);
  return {
    title: `${user?.username} Listargram Photos`,
    description: `${user?.username}'s all Instantgram posts`,
  };
}
