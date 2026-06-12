import Image from "next/image"

export default function Welcome(){
    return (
        <div className="w-full h-full self-center flex sm:flex-nowrap sm:flex-row flex-wrap flex-col items-start justify-around m-3">
            <div className="sm:w-lg w-full">
                <h1 className="text-5xl my-4">Exercise Tracker V2</h1>
                <p className="my-4">This is a personal project showcasing Chart.js, a SQL database, and OAuth. 
                    Sign in with your google account and be taken to a dashboard where you can keep track of your
                    exercises and the amount of calories you burned.</p>
                <p>Sign in using the link on the top right corner</p>                
            </div>
            <Image 
            src="/anastase-maragos-fG0p4Qh_aWI-unsplash.jpg"
            alt="Man working out"
            width={500}
            height={500}
            loading="lazy"
            className="inline-block sm:mx-1 mx-0 align-center align-middle"
            />
        </div>
    )
}