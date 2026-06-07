import { auth, signIn, signOut } from '../../../src/auth';
import Image from 'next/image';
import NavBar from './NavBar';
import { CiDumbbell } from "react-icons/ci";
import Link from 'next/link';

//TODO: fix the header not being sticky

export default function Header(){
  return (
    <header className="bg-emerald-800 px-5 py-5 sticky w-full start-0 border-b border-default flex flex-nowrap sm:flex-wrap justify-between items-center">
      <CiDumbbell size={32}/>
      <NavBar />
    </header>
  )
}