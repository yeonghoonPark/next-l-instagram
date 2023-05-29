"use client";

import Link from "next/link";
import HomeFillIcon from "./ui/icons/HomeFillIcon";
import HomeIcon from "./ui/icons/HomeIcon";
import NewFillIcon from "./ui/icons/NewFillIcon";
import NewIcon from "./ui/icons/NewIcon";
import SearchFillIcon from "./ui/icons/SearchFillIcon";
import SearchIcon from "./ui/icons/SearchIcon";
import ColorBtn from "./ui/ColorBtn";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from "./Avatar";

const LINKS = [
  {
    href: "/",
    icon: <HomeIcon />,
    checkedIcon: <HomeFillIcon />,
  },
  {
    href: "/search",
    icon: <SearchIcon />,
    checkedIcon: <SearchFillIcon />,
  },
  {
    href: "/new",
    icon: <NewIcon />,
    checkedIcon: <NewFillIcon />,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className='flex justify-between items-center p-4'>
      <Link href={"/"}>
        <h1 className='font-bold text-3xl'>Listargram</h1>
      </Link>
      <nav>
        <ul className='flex gap-5 items-center'>
          {LINKS.map(({ href, icon, checkedIcon }) => (
            <li key={href}>
              <Link href={href}>{href === pathname ? checkedIcon : icon}</Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} size='small' highlight />
              </Link>
            </li>
          )}
          <li>
            {session ? (
              <ColorBtn text='Sign out' onClick={() => signOut()} />
            ) : (
              <ColorBtn text='Sign in' onClick={() => signIn()} />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
