import { SimplePost } from "@/model/post";
import PostGridCard from "./PostGridCard";

type Props = {
  posts: SimplePost[];
};

export default function PostGrid({ posts }: Props) {
  return (
    <>
      <ul className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        {posts.map((post: SimplePost, i: number) => (
          <li className='relative w-full aspect-square' key={post.id}>
            <PostGridCard post={post} priority={i < 6} />
          </li>
        ))}
      </ul>
    </>
  );
}
