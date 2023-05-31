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
      <Avatar image={image} />
      <div>
        <p className='font-bold'>{username}</p>
        <p className='text-sm'>{name}</p>
        <p className='text-sm text-gray-500'>
          {followers ?? 0} followers {following ?? 0} following
        </p>
      </div>
    </Link>
  );
}
