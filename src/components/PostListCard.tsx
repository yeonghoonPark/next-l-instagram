"use client";

import usePosts from "@/hooks/usePosts";
import { Comment, SimplePost } from "@/model/post";
import Image from "next/image";
import { useState } from "react";
import ActionBar from "./ActionBar";
import Avatar from "./Avatar";
import PostDetail from "./PostDetail";
import PostModal from "./PostModal";
import ModalPortal from "./ui/ModalPortal";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { userImage, username, image, comments, text } = post;
  const [openModal, setOpenModal] = useState(false);

  const { postComment } = usePosts();

  const handlePostComment = (comment: Comment) => {
    postComment(post, comment);
  };

  return (
    <article className='bg-slate-50 rounded-lg shadow-md border border-gray-200'>
      <div className='flex items-center p-2'>
        <Avatar image={userImage} highlight />
        <span className='text-gray-900 font-bold ml-2'>{username}</span>
      </div>
      <Image
        className='w-full object-cover aspect-square'
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar post={post} onComment={handlePostComment}>
        <p>
          <span className='font-bold mr-1'>{username}</span>
          {text}
        </p>
        {comments > 1 && (
          <button
            className='font-bold my-2 text-sky-500'
            onClick={() => setOpenModal(true)}
          >{`View all ${comments} comments`}</button>
        )}
      </ActionBar>

      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
