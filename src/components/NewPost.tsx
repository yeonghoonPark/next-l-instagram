"use client";

import { AuthUser } from "@/model/user";
import Avatar from "./Avatar";
import Button from "./ui/Button";
import FilesIcon from "./ui/icons/FilesIcon";
import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GridSpinner from "./ui/GridSpinner";

type Props = {
  user: AuthUser;
};

export default function NewPost({ user }: Props) {
  const { username, image } = user;

  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
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
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", textRef.current?.value ?? "");

    fetch("/api/posts", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push("/");
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <section className='w-full max-w-[70%] mx-auto mt-6 flex flex-col justify-center items-center'>
      {loading && (
        <div className='absolute inset-0 z-20 text-center pt-[30%] bg-sky-500/20'>
          <GridSpinner color='#70a5f4' />
        </div>
      )}
      {error && (
        <p className='w-full bg-red-200 text-red-600 text-center p-4 mb-4 font-bold'>
          {error}
        </p>
      )}
      <div className='w-full flex justify-center items-center gap-4'>
        <Avatar image={image} highlight />
        <p>{username}</p>
      </div>

      <form className='w-full flex flex-col mt-4' onSubmit={handleSubmit}>
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
          ref={textRef}
        />

        <Button text='publish' onClick={() => {}} />
      </form>
    </section>
  );
}
