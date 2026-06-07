"use client"

import { useSession } from "next-auth/react"
import Dashboard from "./components/dashboard";
import Welcome from "./components/welcome";

// TODO: make db to save exercise data
// TODO: decide which sql to use to fetch and load data
// TODO: update readme
// TODO: replace default nextjs login and signout pages
// TODO: move src/auth.tsx into app folder
// TODO: beautify dashboard and add functionality

export default function HomePage(){
    const { data: session } = useSession();
    if( session ){
        return(
            <Dashboard />
        )
    }
    else {
        return (
            <Welcome />
        )
    }

}