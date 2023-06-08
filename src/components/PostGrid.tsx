import PostGridCard from "./PostGridCard";
import { PacmanLoader } from "react-spinners";
import usePosts from "@/hooks/usePosts";

export default function PostGrid() {
  const { posts, isLoading } = usePosts();
  return (
    <>
      {isLoading && (
        <div className='flex justify-center items-center mt-20'>
          <PacmanLoader color='#70a5f4' />
        </div>
      )}

      {posts && posts.length === 0 && (
        <div className='flex justify-center items-center mt-20'>
          <p>You don't have something..</p>
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
