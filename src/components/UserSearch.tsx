"use client";

import useDebounce from "@/hooks/useDebounce";
import { SearchUser } from "@/model/user";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import GridSpinner from "./ui/GridSpinner";
import UserCard from "./UserCard";

export default function UserSearch() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 500);
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`);

  console.log(users, "@데이터");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className='w-full max-w-screen-md flex flex-col items-center mx-auto'>
      <form className='w-[70%] my-6' onSubmit={onSubmit}>
        <input
          className='w-full border outline-none p-2 rounded-md'
          type='text'
          value={keyword}
          placeholder='Search for a name or username'
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>

      {isLoading && <GridSpinner color='#70a5f4' />}
      {error && <p>error, something wrong..</p>}
      {!isLoading && !error && users?.length === 0 && (
        <p className='w-[70%] bg-slate-50 mb-4 p-4 rounded-md shadow-sm border text-center py-5'>
          No search results found.
        </p>
      )}

      <ul className='w-[70%]'>
        {users &&
          users.map((user) => (
            <li
              className='bg-slate-50 mb-4 p-4 rounded-md shadow-sm border hover:bg-slate-200'
              key={user.username}
            >
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}
