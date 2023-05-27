"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import ColorBtn from "./ui/ColorBtn";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export default function SignIn({ providers, callbackUrl }: Props) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <ColorBtn
          key={name}
          text={`Sign in with ${name}`}
          onClick={() => signIn(id, { callbackUrl })}
          size='big'
        />
      ))}
    </>
  );
}
