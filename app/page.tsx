import Image from "next/image";
import { SessionProvider } from "next-auth/react"

export default function Home() {
  return (
    <SessionProvider>
      <div>{/* rest of your application*/}</div>
    </SessionProvider>
  );
}
