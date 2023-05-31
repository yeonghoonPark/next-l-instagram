import UserProfile from "@/components/UserProfile";
import { getUserForProfile } from "@/service/user";
import notFound from "./not-fonund";

type Props = {
  params: { username: string };
};
export default async function page({ params: { username } }: Props) {
  const user = await getUserForProfile(username);
  console.log(user, "@유저");

  if (!user) {
    notFound();
  }

  return (
    <>
      <UserProfile user={user} />
    </>
  );
}
