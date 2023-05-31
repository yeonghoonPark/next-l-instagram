import { SearchUser } from "@/model/user";
import Link from "next/link";
import Avatar from "./Avatar";

type Props = {
  user: SearchUser;
};

export default function UserCard({
  user: { name, username, image, following, followers },
}: Props) {
  return (
    <Link className='flex items-center gap-4' href={`/user/${username}`}>
      <Avatar image={image} highlight />
      <div>
        <p className='font-bold'>{username}</p>
        <p className='text-sm'>{name}</p>

        <p className='flex flex-col md:flex-row md:gap-4 text-sm text-gray-500'>
          <span>{followers ?? 0} followers</span>
          <span>{following ?? 0} following</span>
        </p>
      </div>
    </Link>
  );
}
