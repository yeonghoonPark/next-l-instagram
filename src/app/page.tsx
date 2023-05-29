import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";
import { GET } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(GET);
  const user = session?.user;

  if (!user) redirect("/auth/signin");

  return (
    <section className='w-full max-w-[850px] flex flex-col md:flex-row p-4 mx-auto'>
      <div className='w-full basis-3/4 min-w-0'>
        <FollowingBar />
        <PostList />
      </div>

      <div className='basis-1/4 ml-8'>
        <SideBar user={user} />
      </div>
    </section>
  );
}
