import Image from "next/image";
import { SessionProvider } from "next-auth/react"
import HomePage from "./home/page";

// TODO? make sign in form
// TODO: make db to save exercise data
// TODO: decide which sql to use to fetch and load data

export default function Home() {
  return (
    <SessionProvider>
      <HomePage/>
    </SessionProvider>
  );
}