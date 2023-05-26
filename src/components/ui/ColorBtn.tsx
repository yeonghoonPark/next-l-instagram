type Props = {
  text: string;
  onClick: () => void;
};

export default function ColorBtn({ text, onClick }: Props) {
  return (
    <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[3px] rounded-md'>
      <button
        className='bg-white py-[2px] px-[5px] hover:opacity-90 transition-opacity'
        type='button'
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
