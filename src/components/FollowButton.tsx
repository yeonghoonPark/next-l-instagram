"use client";

import { ProfileUser } from "@/model/user";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";
import useMe from "@/hooks/useMe";
import { useState, useTransition } from "react";
import { PulseLoader } from "react-spinners";

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { id: targetUserId, username: targetUsername } = user;
  const { user: loggedInUser, toggleFollow } = useMe();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const showButton = loggedInUser && loggedInUser.username !== targetUsername;
  const following =
    loggedInUser &&
    loggedInUser.following.find((cV) => cV.username === targetUsername);

  const text = following ? "Unfollow" : "Follow";
  const isFollow = following ? true : false;

  const handleFollow = async () => {
    try {
      setIsFetching(true);
      await toggleFollow(targetUserId, isFollow);
      setIsFetching(false);
      startTransition(() => router.refresh());
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {showButton && (
        <div className='relative'>
          {isUpdating && (
            <div className='absolute z-20 inset-0 flex justify-center items-center'>
              <PulseLoader size={6} />
            </div>
          )}
          <Button
            isDisabled={isUpdating}
            text={text}
            onClick={handleFollow}
            isRed={text === "Unfollow"}
          />
        </div>
      )}
    </>
  );
}
