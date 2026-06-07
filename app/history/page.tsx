"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HistoryLoading from "../components/ui/HistoryLoading";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";

//TODO: add deletion
//TODO: add pagination
export default function History(){
    const router = useRouter();
    const [data, setData] = useState<any[]>([]);
    const [loaded, isLoaded] = useState(false);
    const [showData, setShowData] = useState([]);
    const { data: session, status } = useSession();

    
    useEffect( () => {
        if(status === "unauthenticated"){
            router.push('/');
        }
    }, [status]);

     let dummy_activity_data: any = {
        data: [
            {id: "1", activity: "running", duration: "300", date: "2026-05-23", calories: "300"},
            {id: "2", activity: "running", duration: "300", date: "2026-05-26", calories: "200"},
            {id: "3", activity: "running", duration: "300", date: "2026-05-28", calories: "10"},
            {id: "4", activity: "running", duration: "300", date: "2026-05-30", calories: "327"},
            {id: "5", activity: "weights", duration: "200", date: "2026-05-24", calories: "500"},
            {id: "6", activity: "biking", duration: "700", date: "2026-05-27", calories: "500"},
            {id: "7", activity: "biking", duration: "300", date: "2026-05-29", calories: "56"},
        ]
    };

    function SortByDate(history_data: any[]){
        return history_data.toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    function DeleteActivity(event: any){
        // TODO: delete the selected entry
        event.preventDefault();
    }

    function Filter(history_data: any[], property: any, condition: any){
        return history_data.filter( (obj) => obj[property] == condition);      
    }

    // Add error handling
    function DateRange(history_data: any[], start_date: any, end_date: any){
        return history_data.filter( (obj) => {
            let time = new Date(obj.date).getTime();
            return (new Date(start_date).getTime() <= time) && (time <= new Date(end_date).getTime())
        });
    }

    useEffect( () => {
        if(status === "authenticated"){
            const fetchData = async () => {
                function sleep(ms: number){
                    return new Promise(resolve => setTimeout(resolve, ms));
                }

                // waits for 1000ms
                await sleep(1000);

                setData(dummy_activity_data.data);
                isLoaded(true);
            };

            fetchData();
        }
    }, [status]);


    return (
        <div className="flex items-center flex-col w-full">
            <h1 className="text-center">Workout History</h1>
            {
                loaded ? 
                data.map((ele: any, i: number) => {
                    return (
                        <Card className="w-1/3 my-1">
                            <CardHeader>
                                <CardAction>
                                    <Button variant="destructive" type="button" onClick={DeleteActivity}>Delete</Button>
                                </CardAction>
                            </CardHeader>
                            <CardContent>
                                <div key={`${ele.id}`} id={`${ele.id}`}>
                                    <p>{ele.activity}</p>
                                    <p>{ele.date}</p>
                                    <p>{Math.round(Number(ele.duration) / 60)} minutes</p>
                                    <p>{ele.calories} calories burned</p>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })
                :
                <HistoryLoading />
            }
        </div>
    )
}
