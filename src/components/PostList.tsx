"use client";

import { SimplePost } from "@/model/post";

import useSWR from "swr";
import PostListCard from "./PostListCard";
import GridSpinner from "./ui/GridSpinner";

export default function PostList() {
  const { data, isLoading, error } = useSWR<SimplePost[]>("/api/posts");

  console.log(data, "@데이터");
  return (
    <section>
      {isLoading && (
        <div className='text-center mt-32'>
          <GridSpinner color='#70a5f4' />
        </div>
      )}

      {data && (
        <ul>
          {data.map((cV, i) => (
            <li className='mb-4' key={i}>
              <PostListCard post={cV} priority={i < 2 && true} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
