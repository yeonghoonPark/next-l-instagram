"use client";

import usePosts from "@/hooks/usePosts";
import PostListCard from "./PostListCard";
import GridSpinner from "./ui/GridSpinner";

export default function PostList() {
  const { posts, isLoading, error } = usePosts();

  return (
    <section>
      {isLoading && (
        <div className='text-center mt-32'>
          <GridSpinner color='#70a5f4' />
        </div>
      )}

      {posts && (
        <ul>
          {posts.map((cV, i) => (
            <li className='mb-4' key={i}>
              <PostListCard post={cV} priority={i < 2 && true} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
