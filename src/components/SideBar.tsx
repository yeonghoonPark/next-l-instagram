import { User } from "@/model/user";
import Avatar from "./Avatar";

type Props = {
  user: User;
};

export default function SideBar({
  user: { image, username, name, email },
}: Props) {
  return (
    <>
      <div className='flex items-center gap-4'>
        {image && <Avatar image={image} size='normal' highlight={false} />}
        <div className='ml-1'>
          <p className='font-bold'>{username ?? email.split("@")[0]}</p>
          <p className='text-lg text-neutral-500'>{name}</p>
        </div>
      </div>
      <p className='text-sm text-neutral-500 mt-8'>
        About, Help, Press, API, Jobs, Privacy, Terms, Location, Language
      </p>
      <p className='font-bold text-neutral-500 text-sm mt-8'>
        @Copyright Listargram from GOLD
      </p>
    </>
  );
}
