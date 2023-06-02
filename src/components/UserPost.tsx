"use client";

import { SimplePost } from "@/model/post";
import { ProfileUser } from "@/model/user";
import { useState } from "react";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import PostIcon from "./ui/icons/PostIcons";

import useSWR from "swr";
import { PacmanLoader } from "react-spinners";
import PostGrid from "./PostGrid";

type Props = {
  user: ProfileUser;
};

const tabs = [
  { type: "posts", icon: <PostIcon className='w-4 h-4' /> },
  { type: "saved", icon: <BookmarkIcon className='w-4 h-4' /> },
  { type: "liked", icon: <HeartIcon className='w-4 h-4' /> },
];

export default function UserPost({ user: { username } }: Props) {
  const [tab, setTab] = useState("posts");
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR<SimplePost[]>(`/api/users/${username}/${tab}`);

  return (
    <section className='max-w-[70%] mx-auto'>
      <ul className='flex justify-center items-center gap-6 md:gap-12 my-8'>
        {tabs.map(({ type, icon }, i) => (
          <li
            className={`flex items-center gap-1 cursor-pointer border-t-2 py-2 ${
              tab === type && "border-t-2 border-black"
            }`}
            key={i}
            onClick={() => setTab(type)}
          >
            <button type='button'>{icon}</button>
            <span className='uppercase'>{type}</span>
          </li>
        ))}
      </ul>
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
      {posts && posts.length > 0 && <PostGrid posts={posts} />}
    </section>
  );
}
