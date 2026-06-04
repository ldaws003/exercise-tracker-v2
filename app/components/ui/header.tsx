import { auth, signIn, signOut } from '../../../src/auth';
import Image from 'next/image';
import NavBar from './NavBar';
import Link from 'next/link';


export default function Header(){
  return (
    <header>
      <NavBar />
    </header>
  )
}