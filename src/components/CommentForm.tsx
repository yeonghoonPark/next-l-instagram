import { FormEvent, useState } from "react";
import SmileIcon from "./ui/icons/SmileIcon";

type Props = {
  onPostComment: (comment: string) => void;
};

export default function CommentForm({ onPostComment }: Props) {
  const [commentVal, setCommentVal] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(commentVal);
    setCommentVal("");
  };

  return (
    <form
      className='flex items-center px-3 border-t border-neutral-300'
      onSubmit={handleSubmit}
    >
      <SmileIcon />
      <input
        className='w-full ml-2 border-none outline-none p-3'
        type='text'
        placeholder='Add a comment...'
        required
        value={commentVal}
        onChange={(e) => setCommentVal(e.target.value)}
      />
      <button
        className='font-bold ml-2 text-sky-500 disabled:text-sky-300'
        disabled={commentVal.length === 0 ? true : false}
      >
        Post
      </button>
    </form>
  );
}
