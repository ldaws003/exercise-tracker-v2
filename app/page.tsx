"use client"

import { useSession } from "next-auth/react"
import Dashboard from "./components/dashboard";
import Welcome from "./components/welcome";

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