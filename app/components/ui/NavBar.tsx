import { auth, signIn, signOut } from '../../../src/auth';
import Image from 'next/image';
import Link from 'next/link';

function SignOut() {
  return (
    <form
      action="/api/auth/signout"
    >
      <button type="submit">Sign out</button>
    </form>
  );
}

type Props = {};

//TODO finish

export default async function NavBar(){
    const session = await auth();
    console.log(session);
    return (
        <nav className=" flex sm:flex-row sm:flex-nowrap flex-col gap-x-3 items-center">
              <Link className="inline flex-auto hover:bg-emerald-950 p-1" href="/">Home</Link>
              <Link className="inline flex-auto hover:bg-emerald-950 p-1" href="/about">About</Link>
              <Link className="inline flex-auto hover:bg-emerald-950 p-1" href="/contact-us">Contact Us</Link>
              {
                  session?.user ? (
                    <>
                      <Link className="inline flex-auto hover:bg-emerald-950 p-1" href="/history">History</Link>
                      <div className="inline flex-auto hover:bg-emerald-950 p-1">
                        <SignOut />
                      </div>
                    </>
                  ) : (
                  <Link className="inline flex-auto hover:bg-emerald-950 p-1" href="/api/auth/signin">
                      <button>Sign in</button>
                  </Link>
                  )
              }
        </nav>
    );
}