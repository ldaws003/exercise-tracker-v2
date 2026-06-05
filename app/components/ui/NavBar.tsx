// TODO create nav bar, add pages that only show when session is active

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
        <nav>
            <ul>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/contact-us">Contact Us</Link>
                {
                    session?.user ? (
                        <div>
                          <SignOut />
                        </div>
                    ) : (
                    <Link href="/api/auth/signin">
                        <button>Sign in</button>
                    </Link>
                    )
                }

            </ul>
        </nav>
    );
}