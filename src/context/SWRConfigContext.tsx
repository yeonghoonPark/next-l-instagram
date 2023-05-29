"use client";

import { SWRConfig } from "swr";

export default function SWRConfigContext({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
}
