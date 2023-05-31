"use client";

import { HomeUser, ProfileUser } from "@/model/user";
import useSWR from "swr";
import Button from "./ui/Button";

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { data: loggedInUser } = useSWR<HomeUser>("/api/me");
  console.log(loggedInUser, "@로그인드유저");

  const showButton = loggedInUser && loggedInUser.username !== user.username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((cV) => cV.username === user.username);

  const text = following ? "Unfollow" : "Follow";
  return (
    <>
      {showButton && (
        <Button text={text} onClick={() => {}} isRed={text === "Unfollow"} />
      )}
    </>
  );
}
