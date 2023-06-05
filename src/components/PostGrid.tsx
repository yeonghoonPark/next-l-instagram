import { SimplePost } from "@/model/post";
import PostGridCard from "./PostGridCard";
import useSWR from "swr";
import { PacmanLoader } from "react-spinners";

type Props = {
  username: string;
  tab: string;
};

export default function PostGrid({ username, tab }: Props) {
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR<SimplePost[]>(`/api/users/${username}/${tab}`);
  return (
    <>
      {isLoading && (
        <div className='flex justify-center items-center mt-20'>
          <PacmanLoader color='#70a5f4' />
        </div>
      )}

      {posts && posts.length === 0 && (
        <div className='flex justify-center items-center mt-20'>
          <p>You don't have {tab}</p>
        </div>
      )}
      <ul className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        {posts &&
          posts.map((post, i) => (
            <li className='relative w-full aspect-square' key={post.id}>
              <PostGridCard post={post} priority={i < 6} />
            </li>
          ))}
      </ul>
    </>
  );
}
