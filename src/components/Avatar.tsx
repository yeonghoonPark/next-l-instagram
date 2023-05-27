type Props = {
  image?: string | null;
};

export default function Avatar({ image }: Props) {
  return (
    <div className='w-9 h-9 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full p-[3px]'>
      <img
        className='rounded-full'
        src={image ?? undefined}
        alt='user profile'
        referrerPolicy='no-referrer'
      />
    </div>
  );
}
