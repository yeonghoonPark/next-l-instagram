"use client";

import { HomeUser } from "@/model/user";
import Link from "next/link";
import { PacmanLoader } from "react-spinners";
import useSWR from "swr";
import Avatar from "./Avatar";
import MultiCarousel from "./ui/MultiCarousel";

export default function FollowingBar() {
  const { data, isLoading, error } = useSWR<HomeUser>("/api/me");
  const users = data?.following;

  // const users = data?.following && [
  //   ...data?.following,
  //   ...data?.following,
  //   ...data?.following,
  //   ...data?.following,
  //   ...data?.following,
  //   ...data?.following,
  // ];

  // let test: string[] = [];

  return (
    <section className='w-full flex justify-center items-center bg-slate-50 p-4 rounded-md shadow-md min-h-[128px] mb-4'>
      {isLoading ? (
        <PacmanLoader color='#70a5f4' />
      ) : !users || users?.length === 0 ? (
        <p>You don't have following</p>
      ) : (
        <MultiCarousel>
          {users.map(({ username, image }) => (
            <Link
              className='flex flex-col items-center w-20'
              key={username}
              href={`/user/${username}`}
            >
              <Avatar image={image} size='normal' highlight />
              <p className='w-full text-sm text-center truncate mt-2'>
                {username}
              </p>
            </Link>
          ))}
        </MultiCarousel>
      )}
    </section>
  );
}
