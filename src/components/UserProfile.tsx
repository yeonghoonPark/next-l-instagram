import { ProfileUser } from "@/model/user";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
  const { username, name, image, following, followers, posts } = user;
  const info = [
    { title: "posts", count: posts },
    { title: "followers", count: followers },
    { title: "following", count: following },
  ];
  return (
    <section className='w-full max-w-[70%] flex flex-col justify-center items-center my-4 mx-auto bg-slate-50 rounded-sm shadow-sm border p-8 md:flex-row'>
      <Avatar image={image} highlight size='large' />
      <div className='ml-0 mt-8 md:mt-0 md:ml-8'>
        <div className='flex justify-center items-center gap-4 md:justify-start'>
          <h1>{username}</h1>
          <FollowButton user={user} />
        </div>
        <ul className='flex gap-4 my-4 justify-center items-center'>
          {info.map(({ title, count }, i) => (
            <li key={i}>
              <span className='font-bold mr-1'>{count}</span>
              {title}
            </li>
          ))}
        </ul>
        <p className='font-bold text-center md:text-start'>{name}</p>
      </div>
    </section>
  );
}
