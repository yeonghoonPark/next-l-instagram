"use client";

import { AuthUser } from "@/model/user";
import Avatar from "./Avatar";
import Button from "./ui/Button";
import FilesIcon from "./ui/icons/FilesIcon";
import { useState } from "react";
import Image from "next/image";

type Props = {
  user: AuthUser;
};

export default function NewPost({ user }: Props) {
  const { username, image } = user;

  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0], "@체인지파일스");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    if (e.type === "dragenter") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0], "@드롭파일즈");
    }
  };

  return (
    <section className='w-full max-w-[70%] mx-auto mt-6 flex flex-col justify-center items-center'>
      <div className='w-full flex justify-center items-center gap-4'>
        <Avatar image={image} highlight />
        <p>{username}</p>
      </div>

      <form className='w-full flex flex-col mt-4'>
        <input
          className='hidden'
          name='input'
          id='input-upload'
          type='file'
          accept='image/*'
          onChange={handleChange}
        />
        <label
          className='w-full h-72 flex flex-col gap-2 items-center justify-center border border-sky-200 border-dashed'
          htmlFor='input-upload'
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {isDragging && (
            <div className='absolute inset-0 z-10 bg-sky-500/20 pointer-events-none'></div>
          )}
          {!file && (
            <div className='flex flex-col items-center'>
              <FilesIcon />
              <p>Drag and Drop your image here or click</p>
            </div>
          )}
          {file && (
            <div className='relative w-full aspect-square'>
              <Image
                className='object-cover'
                src={URL.createObjectURL(file)}
                alt='local files'
                fill
                sizes='350px'
              />
            </div>
          )}
        </label>

        <textarea
          className='outline-none border rounded-md'
          name='text'
          id='input-text'
          required
          rows={10}
          placeholder={"Write a caption.."}
        />

        <Button text='publish' onClick={() => {}} />
      </form>
    </section>
  );
}
