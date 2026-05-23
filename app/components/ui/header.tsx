import { auth, signIn, signOut } from '../../../src/auth';
import Image from 'next/image';
import Link from 'next/link';

function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
}

type Props = {};

export const Header = async (props: Props) => {
  const session = await auth();
  console.log(session);
  return (
    <header>
      <nav>
        <div>
          <Link href="/"><h1>Your Logo</h1></Link>
          <div>
            {
              session?.user ? (
                <div>
                  {
                    session.user.name && session.user.image &&
                    <Image
                      src={session.user.image}
                      alt={session.user.name}
                      width={32}
                      height={32}
                    />
                  }
                  <SignOut />
                </div>
              ) : (
                <Link href="/api/auth/signin">
                  <button variant="link">Sign in</button>
                </Link>
              )
            }
          </div>
        </div>
      </nav>
    </header>
  )
}