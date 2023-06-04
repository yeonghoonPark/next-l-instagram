import usePosts from "@/hooks/usePosts";
import { SimplePost } from "@/model/post";
import { parseDate } from "@/util/date";
import { useSession } from "next-auth/react";
import { useState } from "react";
import BookmarkFillIcon from "./ui/icons/BookmarkFillIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartFillIcon from "./ui/icons/HeartFillIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import ToggleButton from "./ui/ToggleButton";

type Props = {
  post: SimplePost;
};

export default function ActionBar({ post }: Props) {
  const { id, likes, username, text, createdAt } = post;
  const { data: session } = useSession();
  const user = session?.user;
  const liked = user ? likes.includes(user.username) : false;
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { setLike } = usePosts();

  const handleLike = (like: boolean) => {
    if (user) {
      setLike(post, user.username, like);
    }
  };

  return (
    <>
      <div className='flex justify-between my-2 px-4'>
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon className='w-6 h-6 text-red-500' />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={isBookmarked}
          onToggle={setIsBookmarked}
          onIcon={<BookmarkFillIcon className='w-6 h-6 text-gray-900' />}
          offIcon={<BookmarkIcon />}
        />
      </div>

      <div className='px-4 py-1'>
        <p className='text-sm font-bold mb-2'>{`${likes?.length ?? 0} ${
          likes?.length > 1 ? "likes" : "like"
        }`}</p>
        {text && (
          <p>
            <span className='font-bold mr-1'>{username}</span>
            {text}
          </p>
        )}
        <p className='text-xs text-neutral-500 uppercase my-2'>
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}
