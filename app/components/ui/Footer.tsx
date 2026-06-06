//TODO: finish footer
import Link from "next/link";

export default function Footer(){
    return (
        <footer className="bg-emerald-800 px-5 py-5 w-full flex flex-nowrap sm:flex-wrap gap-x-3 flex-row items-start">
            <Link className="inline hover:bg-emerald-950 p-1 mx-5 text-center" href="/about">About</Link>
            <Link className="inline hover:bg-emerald-950 p-1 mx-5 text-center" href="/contact-us">Contact</Link>
            <a className="inline hover:bg-emerald-950 p-1  mx-5 text-center" href="https://portfolio-leon.appwrite.network/" target="_blank" rel="noopener noreferrer">Portfolio</a>
            <a className="inline hover:bg-emerald-950 p-1  mx-5 text-center" href="https://github.com/ldaws003/exercise-tracker-v2" target="_blank" rel="noopener noreferrer">GitHub</a>
        </footer>
    );
}